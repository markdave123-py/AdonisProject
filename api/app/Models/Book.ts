import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Author from './Author';

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public authorId: number;

  @belongsTo(() => Author,
  {
    foreignKey: "authorId"
  })
  public author: BelongsTo<typeof Author>;

  @column()
  public number_of_pages: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
