// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './paylaod/collections/users'
import { Media } from './paylaod/collections/media'
import { Companies } from './paylaod/collections/companies'
import { Properties } from './paylaod/collections/properties'
import { PropertiesTypes } from './paylaod/collections/properties-types'
import { Spaces } from './paylaod/collections/spaces'
import { Bookings } from './paylaod/collections/bookings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    //
    Users,
    Media,

    Companies,

    Properties,
    PropertiesTypes,

    Spaces,

    Bookings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
