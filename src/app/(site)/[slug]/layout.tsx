import MarketingHeader from '@/components/navigation/marketing-header'

type Props = {
  children: React.ReactNode
}
const SlugLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative">
      <MarketingHeader />
      {children}
    </div>
  )
}
export default SlugLayout
