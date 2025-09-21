import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      description: 'Main description text below the title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.required().email(),
        }),
        defineField({
          name: 'address',
          title: 'Physical Address',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'chamberOfCommerce',
          title: 'Chamber of Commerce Number',
          type: 'string',
          description: 'KvK number',
        }),
        defineField({
          name: 'vatNumber',
          title: 'VAT Number',
          type: 'string',
          description: 'EU VAT registration number',
        }),
        defineField({
          name: 'workingHours',
          title: 'Working Hours',
          type: 'string',
          description: 'Business working hours (e.g., "8 a.m. – 11 p.m.")',
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'contactTile',
      title: 'Contact Tile Section',
      type: 'object',
      description: 'Settings for the contact tile component used on other pages',
      fields: [
        defineField({
          name: 'title',
          title: 'Contact Tile Title',
          type: 'string',
          initialValue: 'Contact us',
        }),
        defineField({
          name: 'description',
          title: 'Contact Tile Description',
          type: 'text',
          initialValue: 'Leave your email and we will get back to you within 24 hours',
        }),
      ],
    }),
    defineField({
      name: 'mapSettings',
      title: 'Google Maps Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'embedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          description: 'Complete Google Maps embed URL with location and styling',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'mapHeight',
          title: 'Map Height (px)',
          type: 'number',
          initialValue: 400,
          validation: (Rule) => Rule.required().min(200).max(800),
        }),
      ],
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'formTitle',
          title: 'Form Title',
          type: 'string',
          initialValue: 'Send us a Message',
        }),
        defineField({
          name: 'formDescription',
          title: 'Form Description',
          type: 'text',
          initialValue: 'Fill out the form below and we\'ll get back to you as soon as possible.',
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'text',
          initialValue: 'Message sent successfully! We\'ll get back to you soon.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for search engines',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description for search engines',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Contact Page',
        subtitle: subtitle ? `${subtitle.slice(0, 50)}...` : 'Contact page content',
      };
    },
  },
});
