import { headers } from "next/headers"
import config from "@payload-config"
import { getPayloadHMR } from "@payloadcms/next/utilities"

export const getMe = async () => {
  const payload = await getPayloadHMR({ config })
  const me = await payload.auth({
    headers: headers(),
  })
  return me.user
}
