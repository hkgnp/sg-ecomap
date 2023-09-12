import { type Resource } from '@prisma/client'

export const findResource = (resources: Resource[] | null, id: string) => {
  if (!resources) return
  const resourceArr = resources.filter((r) => r.id === id)
  if (resourceArr.length === 0) return
  return resourceArr[0]
}
