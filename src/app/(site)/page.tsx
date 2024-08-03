import { redirect } from 'next/navigation'

type Props = {}
const Root: React.FC<Props> = ({}) => {
  return redirect('/marketing')
}
export default Root
