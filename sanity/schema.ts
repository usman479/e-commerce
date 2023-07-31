import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { post } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category,post ]
}
