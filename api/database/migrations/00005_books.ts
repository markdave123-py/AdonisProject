import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable();
      table.integer('author_id').unsigned().references('id').inTable('authors').onDelete('CASCADE').notNullable();
      table.integer('number_of_pages').notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
