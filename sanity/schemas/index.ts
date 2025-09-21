// schemas/index.ts
import { SchemaTypeDefinition } from 'sanity'
import aboutPage from './aboutPage'
import servicesPage from './servicesPage'
import projectsPage from './projectsPage'
import careersPage from './careersPage'
import contactPage from './contactPage'

export const schemaTypes = [aboutPage, servicesPage, projectsPage, careersPage, contactPage]
