import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'careersPage',
  title: 'Careers Page',
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
      name: 'jobPositions',
      title: 'Job Positions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'type',
              title: 'Employment Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Full-time', value: 'Full-time' },
                  { title: 'Part-time', value: 'Part-time' },
                  { title: 'Contract', value: 'Contract' },
                  { title: 'Temporary', value: 'Temporary' },
                  { title: 'Internship', value: 'Internship' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'experience',
              title: 'Experience Level',
              type: 'string',
              description: 'e.g., "2-5 years", "Entry level", "5+ years"',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'department',
              title: 'Department',
              type: 'string',
              options: {
                list: [
                  { title: 'Technical Operations', value: 'Technical Operations' },
                  { title: 'Project Management', value: 'Project Management' },
                  { title: 'Engineering', value: 'Engineering' },
                  { title: 'Administration', value: 'Administration' },
                  { title: 'Sales & Marketing', value: 'Sales & Marketing' }
                ]
              }
            }),
            defineField({
              name: 'description',
              title: 'Job Description',
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'requirements',
              title: 'Job Requirements',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(1)
            }),
            defineField({
              name: 'responsibilities',
              title: 'Key Responsibilities',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Main duties and responsibilities for this role'
            }),
            defineField({
              name: 'benefits',
              title: 'Benefits & Perks',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Specific benefits for this position'
            }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Tool/Technical', value: 'tool' },
                  { title: 'Chart/Management', value: 'chart' },
                  { title: 'Code/Engineering', value: 'code' },
                  { title: 'Building/Corporate', value: 'building' },
                  { title: 'Briefcase/General', value: 'briefcase' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'salary',
              title: 'Salary Range',
              type: 'object',
              fields: [
                defineField({
                  name: 'min',
                  title: 'Minimum Salary',
                  type: 'number'
                }),
                defineField({
                  name: 'max',
                  title: 'Maximum Salary',
                  type: 'number'
                }),
                defineField({
                  name: 'currency',
                  title: 'Currency',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'EUR (€)', value: 'EUR' },
                      { title: 'USD ($)', value: 'USD' },
                      { title: 'GBP (£)', value: 'GBP' }
                    ]
                  },
                  initialValue: 'EUR'
                }),
                defineField({
                  name: 'period',
                  title: 'Pay Period',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Per Year', value: 'year' },
                      { title: 'Per Month', value: 'month' },
                      { title: 'Per Hour', value: 'hour' }
                    ]
                  },
                  initialValue: 'year'
                })
              ]
            }),
            defineField({
              name: 'featured',
              title: 'Featured Position',
              type: 'boolean',
              description: 'Mark this position as featured to highlight it'
            }),
            defineField({
              name: 'urgent',
              title: 'Urgent Hiring',
              type: 'boolean',
              description: 'Mark if this position needs urgent filling'
            }),
            defineField({
              name: 'applicationDeadline',
              title: 'Application Deadline',
              type: 'date'
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this position should appear (lower numbers first)'
            })
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              location: 'location',
              department: 'department'
            },
            prepare(selection) {
              const { title, type, location, department } = selection
              return {
                title: title,
                subtitle: `${type} - ${location} ${department ? `- ${department}` : ''}`
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'companyBenefits',
      title: 'Company-wide Benefits',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Benefits Section Title',
          type: 'string',
          initialValue: 'Why Work With Us?'
        }),
        defineField({
          name: 'description',
          title: 'Benefits Description',
          type: 'text'
        }),
        defineField({
          name: 'benefits',
          title: 'General Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Benefit Title',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'description',
                  title: 'Benefit Description',
                  type: 'text'
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Money/Salary', value: 'money' },
                      { title: 'Health/Medical', value: 'health' },
                      { title: 'Time/Vacation', value: 'time' },
                      { title: 'Growth/Learning', value: 'growth' },
                      { title: 'Team/Culture', value: 'team' }
                    ]
                  }
                })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'applicationForm',
      title: 'Application Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
          initialValue: 'Apply Now'
        }),
        defineField({
          name: 'description',
          title: 'Form Description',
          type: 'text'
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Submit Application'
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          description: 'Message shown after successful form submission'
        }),
        defineField({
          name: 'maxFileSize',
          title: 'Maximum File Size (MB)',
          type: 'number',
          initialValue: 5,
          validation: Rule => Rule.min(1).max(10)
        }),
        defineField({
          name: 'acceptedFileTypes',
          title: 'Accepted File Types',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., .pdf, .doc, .docx',
          initialValue: ['.pdf', '.doc', '.docx']
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
