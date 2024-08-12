// storage-adapter-import-placeholder
import path from "path"
import { fileURLToPath } from "url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types"
import {
  FixedToolbarFeature,
  HeadingFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Bookings } from "./paylaod/collections/bookings"
import Categories from "./paylaod/collections/categories"
import { Collections } from "./paylaod/collections/collections"
import { Companies } from "./paylaod/collections/companies"
import { Media } from "./paylaod/collections/media"
import { Pages } from "./paylaod/collections/pages"
import { Posts } from "./paylaod/collections/posts"
import { Properties } from "./paylaod/collections/properties"
import { PropertiesTypes } from "./paylaod/collections/properties-types"
import { Spaces } from "./paylaod/collections/spaces"
import { SpacesTypes } from "./paylaod/collections/spaces-types"
import { Towns } from "./paylaod/collections/towns"
import { Users } from "./paylaod/collections/users"
import { Footer } from "./paylaod/globals/footer/footer"
import { Header } from "./paylaod/globals/header/header"
import { Page, Post } from "./payload-types"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Fulla` : "Fulla"
}

// @ts-ignore
const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Categories,
    Posts,
    Pages,
    Companies,
    Properties,
    PropertiesTypes,
    Spaces,
    Bookings,
    Collections,
    Towns,
    SpacesTypes,
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URL || "",
  //   },
  // }),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        [Media.slug]: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ("name" in field && field.name === "confirmationMessage") {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({
                        enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                      }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
    }),
    nestedDocsPlugin({
      collections: ["categories", "towns", "spacesTypes"],
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
})
