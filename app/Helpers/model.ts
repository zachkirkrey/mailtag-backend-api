import { Exception } from '@adonisjs/core/build/standalone'
import { LucidRow } from '@ioc:Adonis/Lucid/Orm'

export const isRelationshipPreloaded = (model: LucidRow, relationship: string) => {
  const isPreloaded = Object.keys(model.$preloaded).includes(relationship)

  if (!isPreloaded) {
    throw new Exception(`Please preload ${relationship} before use`)
  }
}
