import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Space } from '../../../../payload-types'

export const revalidateSpaces: CollectionAfterChangeHook<Space> = ({
  doc,
  req: { payload },
}) => {
  const path = `spaces/${doc.id}`

  payload.logger.info(`Revalidating page at path: ${path}`)

  revalidatePath(path)
  revalidateTag('collection_spaces')

  return doc
}
