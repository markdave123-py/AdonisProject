import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run () {
    await Book.createMany([
      {
        name: 'Book 1',
        number_of_pages: 200
      },
      {
        name: 'Book 2',
        number_of_pages: 300
      },
      {
        name: 'Book 3',
        number_of_pages: 250
      },
      {
        name: 'Book 4',
        number_of_pages: 180
      },
      {
        name: 'Book 5',
        number_of_pages: 220
      },
      {
        name: 'Book 6',
        number_of_pages: 280
      },
      {
        name: 'Book 7',
        number_of_pages: 320
      },
      {
        name: 'Book 8',
        number_of_pages: 270
      },
      {
        name: 'Book 9',
        number_of_pages: 240
      },
      {
        name: 'Book 10',
        number_of_pages: 190
      }
    ])
  }
}






