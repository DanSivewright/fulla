import { User } from "@/payload-types"
import { Access, AccessArgs } from "payload"

import { checkRole } from "../utils/check-roles"

export const adminsOrLoggedIn: Access = ({ req }: AccessArgs<User>) => {
  if (checkRole(["admin"], req.user)) {
    return true
  }

  return !!req.user
}
