import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import { signIn } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import authImage from "../../../../../public/images/marketing-one.jpg"

type Props = {}
const Login: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="container relative flex flex-col items-center justify-center h-screen md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Rgister
        </Link>
        <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src={authImage}
              placeholder="blur"
              alt="Hero"
              className="object-cover"
              fill
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign into your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to continue
              </p>
            </div>
            <form
              action={async (formData: FormData) => {
                "use server"

                const email = formData.get("email")
                const password = formData.get("password")

                await signIn("credentials", {
                  email,
                  password,
                  redirectTo: "/",
                })
              }}
              className="space-y-4"
            >
              <Label>
                <span>Email</span>
                <Input name="email" type="email" />
              </Label>
              <Label>
                <span>Password</span>
                <Input name="password" type="password" />
              </Label>
              <Button type="submit">Sign in</Button>
            </form>
            {/* <LoginAuthForm /> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
