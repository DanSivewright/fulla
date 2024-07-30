export const prependServerUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${url}`
}
