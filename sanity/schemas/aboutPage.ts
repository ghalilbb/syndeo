import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'companyBackground',
      title: 'Company Background',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Mission Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Mission Statement',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Mission Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Vision Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Vision Statement',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Vision Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text'
        },
        {
          name: 'image',
          title: 'Certifications Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'certificationsList',
          title: 'Certifications List',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'safetyStandards',
      title: 'Safety Standards',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Safety Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Experience Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'partnerships',
      title: 'Partnerships & Quality Marks',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          title: 'Partnerships Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'qualityMarks',
          title: 'Quality Marks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Mark Name',
                  type: 'string'
                },
                {
                  name: 'color',
                  title: 'Badge Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Blue', value: 'blue' },
                      { title: 'Green', value: 'green' },
                      { title: 'Gray', value: 'gray' },
                      { title: 'Orange', value: 'orange' },
                      { title: 'Red', value: 'red' }
                    ]
                  }
                }
              ]
            }
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
