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
          { title: '2-in-1 Laptop', value: '2-in-1 Laptop' },
          { title: 'Desktop', value: 'Desktop' },
          { title: 'Gaming Laptop', value: 'Gaming Laptop' },
          { title: 'Laptop', value: 'Laptop' },
          { title: 'Monitor', value: 'Monitor' },
          { title: 'Motherboard', value: 'Motherboard' },
          { title: 'PC Cabinet', value: 'PC Cabinet' },
          { title: 'Printer', value: 'Printer' },
          { title: 'Processor', value: 'Processor' },
          { title: 'Processor & Motherboard Combo', value: 'Processor & Motherboard Combo' },
          { title: 'UPS', value: 'UPS' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Used', value: 'Used' },
          { title: 'Refurbished', value: 'Refurbished' }
        ],
        layout: 'radio'
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