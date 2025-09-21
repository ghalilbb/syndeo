import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './sanity.client'

// Create an image URL builder using the client
const builder = imageUrlBuilder(client)

// Export a function that can be used to get image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getAboutPageData() {
  return client.fetch(`
    *[_type == "aboutPage"][0]{
      title,
      companyBackground{
        title,
        description,
        image
      },
      mission{
        title,
        description,
        image
      },
      vision{
        title,
        description,
        image
      },
      certifications{
        title,
        description,
        image,
        certificationsList
      },
      safetyStandards{
        title,
        description,
        image
      },
      experience{
        title,
        description,
        image
      },
      partnerships{
        title,
        description,
        image,
        qualityMarks
      }
    }
  `)
}

export async function getServicesPageData() {
  return client.fetch(`
    *[_type == "servicesPage"][0]{
      title,
      subtitle,
      services[] | order(order asc) {
        title,
        description,
        applications,
        icon,
        images,
        imagePosition,
        order
      }
    }
  `)
}

export async function getProjectsPageData() {
  return client.fetch(`
    *[_type == "projectsPage"][0]{
      title,
      subtitle,
      projects[]{
        title,
        client,
        category,
        description,
        results,
        technologies,
        images,
        featured,
        completionDate,
        projectDuration,
        teamSize
      },
      categories[]{
        name,
        slug,
        icon
      }
    }
  `)
}

export async function getCareersPageData() {
  return client.fetch(`
    *[_type == "careersPage"][0]{
      title,
      subtitle,
      jobPositions[] | order(order asc) {
        title,
        type,
        experience,
        location,
        department,
        description,
        requirements,
        responsibilities,
        benefits,
        icon,
        salary{
          min,
          max,
          currency,
          period
        },
        featured,
        urgent,
        applicationDeadline,
        order
      },
      companyBenefits{
        title,
        description,
        benefits[]{
          title,
          description,
          icon
        }
      },
      applicationForm{
        title,
        description,
        submitButtonText,
        successMessage,
        maxFileSize,
        acceptedFileTypes
      }
    }
  `)
}

export async function getContactPageData() {
  return client.fetch(`
    *[_type == "contactPage"][0]{
      title,
      description,
      contactInfo{
        phone,
        email,
        address,
        chamberOfCommerce,
        vatNumber,
        workingHours
      },
      socialMedia{
        twitter,
        instagram,
        youtube
      },
      contactTile{
        title,
        description
      },
      mapSettings{
        embedUrl,
        mapHeight
      },
      contactForm{
        formTitle,
        formDescription,
        successMessage
      },
      seo{
        metaTitle,
        metaDescription
      }
    }
  `)
}