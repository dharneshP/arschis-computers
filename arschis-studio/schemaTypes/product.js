export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Branded Desktops', value: 'Branded Desktops' },
            { title: 'PC Cabinets', value: 'PC Cabinets' },
            { title: 'PC Components', value: 'PC Components' }
          ],
          layout: 'dropdown'
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'specs',
        title: 'Specifications',
        type: 'text',
        description: 'Keep it short (e.g., Intel i3 | 8GB RAM | 512GB SSD)'
      }
    ]
  } 