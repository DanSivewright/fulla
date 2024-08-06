import { Access } from "payload"

import { checkRole } from "../utils/check-roles"

export const adminsOrMe: Access = ({ req: { user } }, accessorKey?: string) => {
  accessorKey ??= "user"
  if (checkRole(["admin"], user)) {
    return true
  }

  return {
    [accessorKey]: {
      equals: user?.id,
    },
  }
}
