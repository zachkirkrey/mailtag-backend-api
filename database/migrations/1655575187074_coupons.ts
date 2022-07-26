import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'coupons'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('code').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('percentage').notNullable()
      table.boolean('is_repetitive').notNullable()
      table.boolean('is_used').notNullable().defaultTo(false)
      table.boolean('is_deleted').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('used_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public override async down() {
    this.schema.dropTable(this.tableName)
  }
}
