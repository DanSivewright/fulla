export const prependServerUrl = (url: string) => {
  return `${process.env.NODE_ENV !== 'development' ? process.env.VERCEL_URL + '/' : ''}${url}`
}
