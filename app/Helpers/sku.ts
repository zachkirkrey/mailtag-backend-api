import { randomUUID } from 'crypto'

export const randomSkuCode = () => {
  const skuCode = randomUUID().split('-')
  return `${skuCode[0]}-${skuCode[1]}`
}
