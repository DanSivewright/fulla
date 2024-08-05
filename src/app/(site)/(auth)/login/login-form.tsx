"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth"

const FormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 chars",
    })
    .max(255, { message: "Email must not be more than 255 chars long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, {
      message: "Password must be at least 6 chars",
    })
    .max(255, { message: "Password must not be more than 1024 chars long" }),
})

export const LoginForm: React.FC = ({}) => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const redirect = useRef(searchParams.get("redirect"))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data ?? {}

    try {
      await login({
        email,
        password,
      })
      if (redirect?.current) router.push(redirect.current as string)
      else router.push("/")
    } catch (_) {
      setError(
        "There was an error with the credentials provided. Please try again."
      )
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <div>
          <Link href={`/create-account${allParams}`}>Create an account</Link>
          <br />
          <Link href={`/recover-password${allParams}`}>
            Recover your password
          </Link>
        </div>
      </form>
    </Form>
  )
}
