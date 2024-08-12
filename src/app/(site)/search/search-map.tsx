"use client"

import { useEffect } from "react"
import maplibregl from "maplibre-gl"
import Map from "react-map-gl"

import "maplibre-gl/dist/maplibre-gl.css"

import dynamic from "next/dynamic"
import { Protocol } from "pmtiles"
import { default as layers } from "protomaps-themes-base"

type Props = {
  lat?: number
  long?: number
  zoom?: number
}
const SearchMap: React.FC<Props> = ({
  lat = -26.023596079004335,
  long = 27.990992768098145,
  zoom = 13,
}) => {
  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])
  return (
    <Map
      scrollZoom={false}
      initialViewState={{
        latitude: lat,
        longitude: long,
        zoom: zoom,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle={{
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sources: {
          protomaps: {
            attribution:
              '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
            type: "vector",
            url: "pmtiles://https://zdwzlmzfrkcov1ms.public.blob.vercel-storage.com/my_area-oQDNSbUywR5Gw8VV90SQG2x0FPvpBQ.pmtiles",
          },
        },
        // @ts-ignore
        layers: layers("protomaps", "dark"),
      }}
      // @ts-ignore
      mapLib={maplibregl}
    />
  )
}

export default dynamic(() => Promise.resolve(SearchMap), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
