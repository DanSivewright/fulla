"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import Map, {
  FullscreenControl,
  MapRef,
  Marker,
  NavigationControl,
} from "react-map-gl"
import useSupercluster from "use-supercluster"

import "maplibre-gl/dist/maplibre-gl.css"

import dynamic from "next/dynamic"
import { Space } from "@/payload-types"
import { Protocol } from "pmtiles"
import { default as layers } from "protomaps-themes-base"

import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { SpaceCard } from "@/components/cards/space-card"

type Props = {
  lat?: number
  long?: number
  zoom?: number
  spaces?: Space[]
}
const SearchMap: React.FC<Props> = ({
  lat = -26.023596079004335,
  long = 27.990992768098145,
  zoom = 10,
  spaces,
}) => {
  const mapRef = useRef<MapRef>(null)
  const [defaultBounds, setDefaultBounds] = useState<number[] | null>(null)

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    zoom,
  })

  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  const points = spaces
    .filter((x) => x?.location && x?.location?.length)
    .map(({ id, location, name, ...rest }) => ({
      type: "Feature",
      properties: {
        cluster: false,
        spaceId: id,
        name,
        data: {
          id,
          name,
          ...rest,
        },
      },
      geometry: {
        type: "Point",
        coordinates: location,
      },
    }))

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : defaultBounds
      ? defaultBounds
      : null

  const { clusters, supercluster } = useSupercluster({
    // @ts-ignore
    points,
    // @ts-ignore
    bounds,
    zoom: viewport.zoom,
    options: { radius: 50, maxZoom: 20 },
  })

  return (
    <Map
      onLoad={() => {
        if (mapRef.current) {
          const mapBounds = mapRef.current.getMap().getBounds().toArray().flat()
          setDefaultBounds(mapBounds)
        }
      }}
      ref={mapRef}
      scrollZoom={false}
      {...viewport}
      maxZoom={20}
      onMove={(evt) =>
        setViewport({
          ...evt.viewState,
        })
      }
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle={{
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sources: {
          protomaps: {
            // attribution:
            //   '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
            type: "vector",
            url: "pmtiles://https://zdwzlmzfrkcov1ms.public.blob.vercel-storage.com/my_area-oQDNSbUywR5Gw8VV90SQG2x0FPvpBQ.pmtiles",
          },
        },
        // @ts-ignore
        layers: layers("protomaps", "dark"),
      }}
      // @ts-ignore
      mapLib={maplibregl}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        // @ts-ignore
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <Badge
                onClick={() => {
                  const expansionZoom = Math.min(
                    // @ts-ignore
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  )
                  mapRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: expansionZoom,
                  })
                }}
              >
                {pointCount}: Spaces
              </Badge>
            </Marker>
          )
        }

        return (
          <Marker
            key={`crime-${cluster.properties.spaceId}`}
            latitude={latitude}
            longitude={longitude}
          >
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger>
                <Badge>R{new Intl.NumberFormat().format(1245)}</Badge>
              </HoverCardTrigger>
              <HoverCardContent className="p-2">
                <SpaceCard space={cluster.properties.data} />
                {/* {cluster.properties.data?.name} */}
              </HoverCardContent>
            </HoverCard>
          </Marker>
        )
      })}
    </Map>
  )
}

export default dynamic(() => Promise.resolve(SearchMap), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
