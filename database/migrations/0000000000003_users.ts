import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('email').notNullable().unique()
      table.string('provider_id').notNullable().unique()
      table
        .uuid('account_id')
        .references('id')
        .inTable('accounts')
        .onDelete('CASCADE')
        .notNullable()
      table.string('username').notNullable()
      table.string('avatar_url').nullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('refresh_token').notNullable()

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
