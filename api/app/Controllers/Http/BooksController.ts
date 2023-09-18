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

      const bookExists = await Book.findBy('name', name)

      if(bookExists)return response.status(403).json({
        message: "A book with thia name already exists.."
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



    public async update({ params, request, response, auth}: HttpContextContract) {
        try {
    // Find the author by ID
            const name = request.input('name')
            const authorId = auth.user?.id
            const id = parseInt(params.id)

            if(!name) return response.status(404).json('')

            const book = await Book.findBy('id', id)

            if(!book) return response.status(404).json({
                success: false,
                message: "No book with this Id"
            })

            if(book.authorId !== authorId) return response.status(401).json({
                message: "Invalid Request, Unauthorized ...."
            })

            // Update the author's name
            book.name = name;
            await book.save();

            return response.status(200).send({ 
                message: 'Book name updated successfully', 
                book: book
            
            });
            } catch (error) {
                return response.status(500).send({ error: 'An error occurred while updating the author name' });
        }
    }

  
}