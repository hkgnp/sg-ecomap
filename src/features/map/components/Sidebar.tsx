import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'

export const Sidebar = () => {
  const resources = useContext(ResourceContext)

  return <div>Hello World</div>
}
