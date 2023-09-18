import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Author from 'App/Models/Author'


    // Write your database queries inside the run method

    
export default class AuthorSeeder extends BaseSeeder {
  public async run () {
    await Author.createMany([
      {
        name: 'Author 1',
        email: 'author1@example.com',
        password: 'password'
      },
      {
        name: 'Author 2',
        email: 'author2@example.com',
        password: 'password'
      },
      {
        name: 'Author 3',
        email: 'author3@example.com',
        password: 'password'
      },
      {
        name: 'Author 4',
        email: 'author4@example.com',
        password: 'password'
      },
      {
        name: 'Author 5',
        email: 'author5@example.com',
        password: 'password'
      },
      {
        name: 'Author 6',
        email: 'author6@example.com',
        password: 'password'
      },
      {
        name: 'Author 7',
        email: 'author7@example.com',
        password: 'password'
      },
      {
        name: 'Author 8',
        email: 'author8@example.com',
        password: 'password'
      },
      {
        name: 'Author 9',
        email: 'author9@example.com',
        password: 'password'
      },
      {
        name: 'Author 10',
        email: 'author10@example.com',
        password: 'password'
      }
    ])
  }
}



