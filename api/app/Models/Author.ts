import { DateTime } from 'luxon'
import { BaseModel,  column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Book from './Book'

export default class Author extends BaseModel {

  public static get hidden(){
    return ['password']
}
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public password: string

  @hasMany(() => Book,{
    foreignKey: 'authorId'
  })
  public books: HasMany<typeof Book>

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public remember_me_token: String

  
  // @hasMany(() => Post,{
  //   foreignKey: 'user_id'
  // })
  // public posts: HasMany<typeof Post>

  
  @beforeSave()
  public static async hashPassword(author: Author){
    if(author.$dirty.password){
      
      author.password = await Hash.make(author.password)
        
      }
    }

}
