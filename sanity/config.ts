// sanity.config.ts
import { defineConfig } from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemaTypes } from './schemas'

export const config = defineConfig({
  basePath:'/admin',
  name: 'syndeo',
  title: 'Syndeo content',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
