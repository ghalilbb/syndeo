import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Service',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Service Description',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'applications',
              title: 'Key Applications',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Network', value: 'network' },
                  { title: 'Fiber Optics', value: 'fiber' },
                  { title: 'Data Cabling', value: 'plug' },
                  { title: 'Civil Engineering', value: 'bridge' },
                  { title: 'Maintenance', value: 'tool' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'images',
              title: 'Service Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                }
              ],
              validation: Rule => Rule.required().min(1).max(3)
            },
            {
              name: 'imagePosition',
              title: 'Image Position',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right', value: 'right' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'images.0'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
