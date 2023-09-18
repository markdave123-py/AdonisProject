import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Authors extends BaseSchema {
  protected tableName = 'authors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()
      table.increments('id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
