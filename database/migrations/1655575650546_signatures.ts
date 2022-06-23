import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { BorderRadiusTypes } from 'App/Helpers/type'

export default class extends BaseSchema {
  protected tableName = 'signatures'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('name').notNullable()
      table.string('title').nullable()
      table.string('avatar_url').nullable()
      table.string('avatar_border_radius_type').notNullable().defaultTo(BorderRadiusTypes.SQUARE)
      table.string('company').nullable()
      table.string('email').nullable()
      table.string('website').nullable()
      table.string('office_address').nullable()
      table.string('office_phone_number').nullable()
      table.string('home_phone_number').nullable()
      table.string('calendar_url').nullable()
      table.string('banner_url').nullable()
      table.boolean('is_banner_enabled').notNullable().defaultTo(false)
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.boolean('is_default').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public override async down() {
    this.schema.dropTable(this.tableName)
  }
}
