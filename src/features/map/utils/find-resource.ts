import { ResourceWithPosts } from '../types'

export const findResource = (
  resources: ResourceWithPosts[] | null,
  id: string
) => {
  if (!resources) return
  const resourceArr = resources.filter((r) => r.id === id)
  if (resourceArr.length === 0) return
  return resourceArr[0]
}
