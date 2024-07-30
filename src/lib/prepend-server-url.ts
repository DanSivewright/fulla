export const prePrependServerUrl = (url: string) => {
  return `${process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SERVER_URL : ''}${url}`
}
