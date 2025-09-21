import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
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
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'client',
              title: 'Client Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'category',
              title: 'Project Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Network Infrastructure', value: 'Network Infrastructure' },
                  { title: 'Fiber Optics', value: 'Fiber Optics' },
                  { title: 'Data Infrastructure', value: 'Data Infrastructure' },
                  { title: 'Civil Engineering', value: 'Civil Engineering' },
                  { title: 'Maintenance & Support', value: 'Maintenance & Support' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Project Description',
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'results',
              title: 'Key Results',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            }),
            defineField({
              name: 'technologies',
              title: 'Technologies Used',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            }),
            defineField({
              name: 'images',
              title: 'Project Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                }
              ],
              validation: Rule => Rule.max(5)
            }),
            defineField({
              name: 'featured',
              title: 'Featured Project',
              type: 'boolean',
              description: 'Mark this project as featured to highlight it'
            }),
            defineField({
              name: 'completionDate',
              title: 'Completion Date',
              type: 'date'
            }),
            defineField({
              name: 'projectDuration',
              title: 'Project Duration',
              type: 'string',
              description: 'e.g., "6 months", "1 year"'
            }),
            defineField({
              name: 'teamSize',
              title: 'Team Size',
              type: 'number',
              description: 'Number of team members involved'
            })
          ],
          preview: {
            select: {
              title: 'title',
              client: 'client',
              category: 'category',
              media: 'images.0'
            },
            prepare(selection) {
              const { title, client, category, media } = selection
              return {
                title: title,
                subtitle: `${client} - ${category}`,
                media: media
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Project Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'slug',
              title: 'Category Slug',
              type: 'string',
              description: 'Used for filtering (e.g., "network", "fiber", "data")',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Network', value: 'network' },
                  { title: 'Fiber', value: 'fiber' },
                  { title: 'Data/Laptop', value: 'laptop' },
                  { title: 'Building', value: 'building' },
                  { title: 'Tool', value: 'tool' }
                ]
              }
            })
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
