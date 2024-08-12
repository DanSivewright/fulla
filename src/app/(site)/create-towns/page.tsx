import configPromise from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"

import { randburgSuburbs } from "@/lib/town-json-record"
import { Section } from "@/components/section"
import { Title } from "@/components/title"

type Props = {}

const CreateTowns: React.FC<Props> = async ({}) => {
  const payload = await getPayloadHMR({ config: configPromise })

  // const propTypes = await payload.find({
  //   collection: "spacesTypes",
  // })

  // const subSpaces = [
  //   "Office",
  //   "Desk",
  //   "Meeting Room",
  //   "Conference Room",
  //   "Shared Workspace",
  //   "Private Office",
  //   "Studio",
  //   "Retail Store",
  //   "Warehouse",
  //   "Storage Unit",
  //   "Garage",
  //   "Loft",
  //   "Penthouse",
  //   "Duplex",
  //   "Bungalow",
  //   "Cabin",
  //   "Cottage",
  //   "Chalet",
  //   "Villa",
  //   "Serviced Apartment",
  //   "Hostel Room",
  //   "Restaurant Space",
  //   "Café Space",
  //   "Bar Space",
  //   "School Classroom",
  //   "Auditorium",
  //   "Lecture Hall",
  //   "Boardroom",
  //   "Study Room",
  //   "Art Studio",
  //   "Music Room",
  //   "Theater",
  //   "Cinema",
  //   "Tennis Court",
  //   "Squash Court",
  //   "Basketball Court",
  //   "Swimming Pool",
  //   "Playground",
  //   "Garden",
  //   "Terrace",
  //   "Balcony",
  //   "Patio",
  //   "Courtyard",
  //   "Roof Deck",
  //   "Basement",
  //   "Attic",
  //   "Utility Room",
  //   "Workshop",
  // ]

  // const data = [
  //   {
  //     name: "Space",
  //   },
  //   {
  //     name: "Apartment",
  //   },
  //   {
  //     name: "House",
  //   },
  //   {
  //     name: "Commercial Property",
  //   },
  // ]

  const subSpacesWithTypes = [
    { name: "Office", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Desk", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Meeting Room", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Conference Room", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Shared Workspace", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Private Office", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Studio", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Retail Store", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Warehouse", parent: "66ba0ceb2c0f9a39adaff246" }, // Commercial Property
    { name: "Storage Unit", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Garage", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Loft", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Penthouse", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Duplex", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Bungalow", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Cabin", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Cottage", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Chalet", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Villa", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Serviced Apartment", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Hostel Room", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Restaurant Space", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Café Space", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Bar Space", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "School Classroom", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Auditorium", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Lecture Hall", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Boardroom", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Study Room", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Art Studio", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Music Room", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Theater", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Cinema", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
    { name: "Tennis Court", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Squash Court", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Basketball Court", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Swimming Pool", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Playground", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Garden", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Terrace", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Balcony", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Patio", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Courtyard", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Roof Deck", parent: "66ba0ceb2c0f9a39adaff244" }, // Apartment
    { name: "Basement", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Attic", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Utility Room", parent: "66ba0ceb2c0f9a39adaff245" }, // House
    { name: "Workshop", parent: "66ba0ceb2c0f9a39adaff243" }, // Space
  ]

  // const createdTown = await Promise.all(
  //   subSpacesWithTypes.map((suburb) =>
  //     payload.create({
  //       collection: "spacesTypes",
  //       data: suburb,
  //     })
  //   )
  // )
  // const spaceTypes = [
  //   {
  //     id: "66ba0ceb2c0f9a39adaff246",
  //     name: "Commercial Property",
  //   },
  //   {
  //     id: "66ba0ceb2c0f9a39adaff243",
  //     name: "Space",
  //   },
  //   {
  //     id: "66ba0ceb2c0f9a39adaff244",
  //     name: "Apartment",
  //   },
  //   {
  //     id: "66ba0ceb2c0f9a39adaff245",
  //     name: "House",
  //   },
  // ]

  return (
    <Section className="gutter">
      <Title>Create Towns</Title>
      {/* <pre>{JSON.stringify(createdTown, null, 2)}</pre> */}
    </Section>
  )
}
export default CreateTowns
