import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion:'2023-06-09',
  dataset:'production',
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn:true,
})
