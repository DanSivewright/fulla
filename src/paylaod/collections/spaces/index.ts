import { slugField } from '@/paylaod/fields/slug-field'
import { CollectionConfig } from 'payload'

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'accessControl',
    //   label: 'Access Control',
    //   type: 'select',
    //   options: [],
    // },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
    slugField('name'),
    {
      name: 'property',
      label: 'Property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'public',
      label: 'Public',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'manager',
      label: 'Manager',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { label: 'Office', value: 'office' },
        { label: 'Desk', value: 'desk' },
        { label: 'Meeting Room', value: 'meetingRoom' },
        { label: 'Conference Room', value: 'conferenceRoom' },
        { label: 'Shared Workspace', value: 'sharedWorkspace' },
        { label: 'Private Office', value: 'privateOffice' },
        { label: 'Retail Store', value: 'retailStore' },
        { label: 'Warehouse', value: 'warehouse' },
        { label: 'Storage Unit', value: 'storageUnit' },
        { label: 'Garage', value: 'garage' },
        { label: 'Loft', value: 'loft' },
        { label: 'Penthouse', value: 'penthouse' },
        { label: 'Duplex', value: 'duplex' },
        { label: 'Studio', value: 'studio' },
        { label: 'Bungalow', value: 'bungalow' },
        { label: 'Cabin', value: 'cabin' },
        { label: 'Cottage', value: 'cottage' },
        { label: 'Chalet', value: 'chalet' },
        { label: 'Villa', value: 'villa' },
        { label: 'Serviced Apartment', value: 'servicedApartment' },
        { label: 'Hostel Room', value: 'hostelRoom' },
        { label: 'Restaurant Space', value: 'restaurantSpace' },
        { label: 'Café Space', value: 'cafeSpace' },
        { label: 'Bar Space', value: 'barSpace' },
        { label: 'School Classroom', value: 'schoolClassroom' },
        { label: 'Auditorium', value: 'auditorium' },
        { label: 'Lecture Hall', value: 'lectureHall' },
        { label: 'Boardroom', value: 'boardroom' },
        { label: 'Study Room', value: 'studyRoom' },
        { label: 'Art Studio', value: 'artStudio' },
        { label: 'Music Room', value: 'musicRoom' },
        { label: 'Theater', value: 'theater' },
        { label: 'Cinema', value: 'cinema' },
        { label: 'Tennis Court', value: 'tennisCourt' },
        { label: 'Squash Court', value: 'squashCourt' },
        { label: 'Basketball Court', value: 'basketballCourt' },
        { label: 'Swimming Pool', value: 'swimmingPool' },
        { label: 'Playground', value: 'playground' },
        { label: 'Garden', value: 'garden' },
        { label: 'Terrace', value: 'terrace' },
        { label: 'Balcony', value: 'balcony' },
        { label: 'Patio', value: 'patio' },
        { label: 'Courtyard', value: 'courtyard' },
        { label: 'Roof Deck', value: 'roofDeck' },
        { label: 'Basement', value: 'basement' },
        { label: 'Attic', value: 'attic' },
        { label: 'Utility Room', value: 'utilityRoom' },
        { label: 'Workshop', value: 'workshop' },
      ],
    },
    {
      name: 'floor',
      label: 'Floor',
      type: 'text',
    },
    {
      name: 'capacity',
      label: 'Capacity',
      type: 'text',
    },
  ],
}
