import {defineField, defineType} from 'sanity'

const categories = ['PC & Laptop', 'Printer', 'Networking', 'Shop', 'Other']

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {list: [{title: 'Image', value: 'image'}, {title: 'Video', value: 'video'}], layout: 'radio'},
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (Rule) => Rule.custom((value, context) => context.parent?.mediaType === 'image' && !value ? 'An image is required for image gallery items.' : true),
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Use a YouTube or Vimeo URL. The video loads only after the visitor chooses to play it.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: (Rule) => Rule.custom((value, context) => context.parent?.mediaType === 'video' && !value ? 'A video URL is required for video gallery items.' : true),
    }),
    defineField({name: 'videoThumbnail', title: 'Video Poster / Thumbnail', type: 'image', options: {hotspot: true}, hidden: ({parent}) => parent?.mediaType !== 'video'}),
    defineField({name: 'category', title: 'Category', type: 'string', options: {list: categories, layout: 'dropdown'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'workDate', title: 'Work Date', type: 'date'}),
    defineField({name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false}),
    defineField({name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Optional. Lower numbers appear first.'}),
  ],
  preview: {
    select: {title: 'title', media: 'image', mediaType: 'mediaType', category: 'category', featured: 'featured'},
    prepare({title, media, mediaType, category, featured}) {
      return {title, subtitle: `${mediaType === 'video' ? 'Video' : 'Image'} · ${category}${featured ? ' · Featured' : ''}`, media}
    },
  },
})
