import { derived, writable } from 'svelte/store';

const owners = writable<readonly symbol[]>([]);
export const isOverlayOpen = derived(owners, (entries) => entries.length > 0);

// Only mounted dialogs acquire ownership. SSR never mutates this browser state.
const dialogs = new Map<symbol, HTMLDialogElement>();
let restoreScroll: (() => void) | undefined;

function lockBody() {
	const body = document.body;
	const html = document.documentElement;
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;
	const properties = ['position', 'top', 'left', 'right', 'width', 'overflow', 'padding-right'] as const;
	const previous = properties.map((key) => [key, body.style.getPropertyValue(key), body.style.getPropertyPriority(key)]);
	const htmlOverflow = html.style.overflow;
	const scrollbar = window.innerWidth - html.clientWidth;
	body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;
	body.style.position = 'fixed';
	body.style.top = `-${scrollY}px`;
	body.style.left = `-${scrollX}px`;
	body.style.right = '0';
	body.style.width = '100%';
	body.style.overflow = 'hidden';
	html.style.overflow = 'hidden';
	return () => {
		for (const [key, value, priority] of previous) {
			if (value) body.style.setProperty(key, value, priority);
			else body.style.removeProperty(key);
		}
		html.style.overflow = htmlOverflow;
		window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
	};
}

function topDialog() {
	return Array.from(dialogs.values()).at(-1);
}

function focusable(node: HTMLElement) {
	return Array.from(node.querySelectorAll<HTMLElement>(
		'a[href],button,input,select,textarea,[tabindex],iframe,summary'
	)).filter((element) => element.tabIndex >= 0 && !element.matches(':disabled,[hidden]') && element.getClientRects().length > 0);
}

/** Native modal top layer makes background content inert; this action owns scroll/focus cleanup. */
export function modal(node: HTMLDialogElement) {
	const owner = Symbol('dialog');
	const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
	if (!dialogs.size) restoreScroll = lockBody();
	dialogs.set(owner, node);
	owners.set([...dialogs.keys()]);
	node.showModal();
	// The close control is first: opening a sheet never forces the mobile keyboard open.
	focusable(node)[0]?.focus({ preventScroll: true });

	const onKeydown = (event: KeyboardEvent) => {
		if (topDialog() !== node || event.key !== 'Tab') return;
		const items = focusable(node);
		const first = items[0];
		const last = items.at(-1);
		if (!first) { event.preventDefault(); node.focus(); return; }
		if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) {
			event.preventDefault(); last?.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault(); first.focus();
		}
	};
	const onFocus = (event: FocusEvent) => {
		if (topDialog() === node && event.target instanceof Node && !node.contains(event.target)) {
			(focusable(node)[0] || node).focus({ preventScroll: true });
		}
	};
	document.addEventListener('keydown', onKeydown, true);
	document.addEventListener('focusin', onFocus);
	return {
		destroy() {
			document.removeEventListener('keydown', onKeydown, true);
			document.removeEventListener('focusin', onFocus);
			dialogs.delete(owner);
			node.close();
			owners.set([...dialogs.keys()]);
			if (!dialogs.size) { restoreScroll?.(); restoreScroll = undefined; }
			queueMicrotask(() => {
				const top = topDialog();
				if (trigger?.isConnected && !trigger.closest('[inert]') && (!top || top.contains(trigger))) {
					trigger.focus({ preventScroll: true });
				} else if (top) (focusable(top)[0] || top).focus({ preventScroll: true });
			});
		}
	};
}
