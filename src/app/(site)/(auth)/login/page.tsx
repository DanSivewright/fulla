import { Suspense } from "react"

import { LoginForm } from "./login-form"

type Props = {}
const Login: React.FC<Props> = ({}) => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
export default Login
