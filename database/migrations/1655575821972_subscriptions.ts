import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public override async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.uuid('plan_id').references('id').inTable('plans').onDelete('CASCADE').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.string('payment_status').notNullable()
      table.boolean('is_canceled').notNullable().defaultTo(false)
      table.boolean('is_expired').notNullable().defaultTo(false)
      table.boolean('is_deleted').notNullable().defaultTo(false)
      table.unique(['plan_id', 'user_id', 'is_canceled'])
      table.string('stripe_subscription_id').notNullable()
      table.string('stripe_customer_id').notNullable()
      table.string('billing').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('expires_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public override async down() {
    this.schema.dropTable(this.tableName)
  }
}
