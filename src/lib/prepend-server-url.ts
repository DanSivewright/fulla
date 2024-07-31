export const prependServerUrl = (url: string) => {
  return `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_URL : ''}${url}`
}
