import { Archive } from "@/paylaod/blocks/archive-block"
import { BentoBlock } from "@/paylaod/blocks/bento-block"
import { CallToAction } from "@/paylaod/blocks/call-to-action"
import { Carousel } from "@/paylaod/blocks/carousel"
import { Content } from "@/paylaod/blocks/content"
import { FormBlock } from "@/paylaod/blocks/form"
import { MediaBlock } from "@/paylaod/blocks/media-block"
import { TextHero } from "@/paylaod/blocks/text-hero"
import { hero } from "@/paylaod/fields/hero"
import { slugField } from "@/paylaod/fields/slug-field"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import { CollectionConfig } from "payload"

import { populateCompany } from "./hooks/populate-company"
import { revalidateSpaces } from "./hooks/revalidate-spaces"

export const Spaces: CollectionConfig = {
  slug: "spaces",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            hero,
            {
              name: "description",
              label: "Description",
              type: "richText",
            },
            {
              name: "featureImages",
              label: "Feature Images",
              type: "relationship",
              relationTo: "media",
              hasMany: true,
            },
            {
              name: "type",
              label: "Type",
              type: "select",
              options: [
                { label: "Office", value: "office" },
                { label: "Desk", value: "desk" },
                { label: "Meeting Room", value: "meetingRoom" },
                { label: "Conference Room", value: "conferenceRoom" },
                { label: "Shared Workspace", value: "sharedWorkspace" },
                { label: "Private Office", value: "privateOffice" },
                { label: "Retail Store", value: "retailStore" },
                { label: "Warehouse", value: "warehouse" },
                { label: "Storage Unit", value: "storageUnit" },
                { label: "Garage", value: "garage" },
                { label: "Loft", value: "loft" },
                { label: "Penthouse", value: "penthouse" },
                { label: "Duplex", value: "duplex" },
                { label: "Studio", value: "studio" },
                { label: "Bungalow", value: "bungalow" },
                { label: "Cabin", value: "cabin" },
                { label: "Cottage", value: "cottage" },
                { label: "Chalet", value: "chalet" },
                { label: "Villa", value: "villa" },
                { label: "Serviced Apartment", value: "servicedApartment" },
                { label: "Hostel Room", value: "hostelRoom" },
                { label: "Restaurant Space", value: "restaurantSpace" },
                { label: "Café Space", value: "cafeSpace" },
                { label: "Bar Space", value: "barSpace" },
                { label: "School Classroom", value: "schoolClassroom" },
                { label: "Auditorium", value: "auditorium" },
                { label: "Lecture Hall", value: "lectureHall" },
                { label: "Boardroom", value: "boardroom" },
                { label: "Study Room", value: "studyRoom" },
                { label: "Art Studio", value: "artStudio" },
                { label: "Music Room", value: "musicRoom" },
                { label: "Theater", value: "theater" },
                { label: "Cinema", value: "cinema" },
                { label: "Tennis Court", value: "tennisCourt" },
                { label: "Squash Court", value: "squashCourt" },
                { label: "Basketball Court", value: "basketballCourt" },
                { label: "Swimming Pool", value: "swimmingPool" },
                { label: "Playground", value: "playground" },
                { label: "Garden", value: "garden" },
                { label: "Terrace", value: "terrace" },
                { label: "Balcony", value: "balcony" },
                { label: "Patio", value: "patio" },
                { label: "Courtyard", value: "courtyard" },
                { label: "Roof Deck", value: "roofDeck" },
                { label: "Basement", value: "basement" },
                { label: "Attic", value: "attic" },
                { label: "Utility Room", value: "utilityRoom" },
                { label: "Workshop", value: "workshop" },
              ],
            },
            {
              name: "floor",
              label: "Floor",
              type: "text",
            },
            {
              name: "capacity",
              label: "Capacity",
              type: "text",
            },
          ],
          label: "Display",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Carousel,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                BentoBlock,
                TextHero,
              ],
              required: true,
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,
              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },

    {
      name: "categories",
      type: "relationship",
      admin: {
        position: "sidebar",
      },
      hasMany: true,
      relationTo: "categories",
    },

    slugField("name"),
    {
      name: "property",
      label: "Property",
      type: "relationship",
      relationTo: "properties",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "manager",
      label: "Manager",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",
      access: {
        read: ({ req: { user } }) => {
          if (user?.role?.includes("admin")) return true
          return false
        },
      },
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSpaces],
    beforeChange: [populateCompany],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000 * 60, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 5,
  },
}
