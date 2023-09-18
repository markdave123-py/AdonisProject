import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author';
import Book from 'App/Models/Book';

export default class BooksController {

    public async store({request,response,auth}: HttpContextContract) {
    const { name , number_of_pages } = request.body();
    try {
      const author_id = auth.user?.id;
      const author = await Author.findBy('id', author_id)

      if(!author) return response.status(401).json({
        success: false,
        message: "You Can't perform this operation!!"
      }) 

      const book = await Book.create({

        authorId: author_id,
        name: name,
        number_of_pages: number_of_pages
      });


      return response.status(201).json({
        success: true,
        message: "Book successfully added",
        data: book
      })

    } catch (error) {
      console.log(error.message);
      return response.badRequest(error.message);
    }
  }


  public async index({request,response,auth}: HttpContextContract) {

    const {page = 1, perPage= 10, search} = request.qs()

    if(!auth.user) return response.status(401).json({
        success: false,
        message: "User Unauthorized..."
    })

    const query = Author.query()
      .withCount('books')
      .select(['id', 'name']);

    if (search) {
      query.where('name', 'LIKE', `%${search}%`);
    }

    const authors = await query.paginate(page, perPage);

   return response.status(200).json({
    succss: true,
    authors: authors
   })


    
  

}

}