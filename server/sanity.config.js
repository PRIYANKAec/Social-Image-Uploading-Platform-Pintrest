import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PinterestClone',

  projectId: '5nf3e9o2',
  dataset: 'pinterest',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
