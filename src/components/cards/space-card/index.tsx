import Image from "next/image"
import Link from "next/link"
import { Media, Space } from "@/payload-types"
import { Home, MapPin, Table } from "lucide-react"

import { prependServerUrl } from "@/lib/prepend-server-url"
import { Badge } from "@/components/ui/badge"
import { Paragraph } from "@/components/paragraph"
import { titleVariants } from "@/components/title"

type Props = {
  space: Space
}
export const SpaceCard: React.FC<Props> = ({ space }) => {
  return (
    <div className="group col-span-12 flex w-full flex-col gap-3 md:col-span-6 xl:col-span-4">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-accent rounded-lg">
        {space.featureImages?.[0] && (
          <Image
            src={prependServerUrl(
              (space.featureImages?.[0] as Media)?.url ?? ""
            )}
            alt={(space.featureImages?.[0] as Media)?.alt ?? ""}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <Link href={`/spaces/${space.id}`} className="flex items-center gap-2">
          <div className="relative h-4 w-4 overflow-hidden rounded-full bg-gradient-to-tl from-red-500 to-green-300">
            {/* <Image
              src={space.organization.logo?.fileUrl ?? ''}
              fill
              className="object-cover"
              alt={'logo for ' + space.organization.name}
            /> */}
          </div>
          <Paragraph className="line-clamp-1 font-mono font-semibold group-hover:underline">
            {space.name}
          </Paragraph>
          <Badge size="xs" variant="blue">
            4.9
          </Badge>
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <MapPin size={12} />
          <Paragraph size="xs">SUBBURB</Paragraph>
        </div>
      </div>
      <p style={{ margin: 0 }} className={titleVariants({ level: 5 })}>
        R{new Intl.NumberFormat().format(1275 ?? 0)}
        <span className="text-xs text-muted-foreground/50"> / month</span>
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <Table size={12} />
          <Paragraph size="xs">5 Desks</Paragraph>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/50">
          <Home size={12} />
          <Paragraph size="xs">2 Rooms</Paragraph>
        </div>
      </div>
    </div>
  )
}
