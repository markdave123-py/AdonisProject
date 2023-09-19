import  Hash  from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'
import AuthorValidator from 'App/Validators/AuthorValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import UpdateValidator from 'App/Validators/UpdateValidator'

export default class AuthorsController {

     public async register({request, response }: HttpContextContract){

        const payload = await request.validate(AuthorValidator)

        try {
            // const {name, email, password} = request.body()

            // const authorExists = await Author.findBy('email', email);

            // if(authorExists) return response.status(400).json({
            //     message: "This user already exists"
            // })

            const result = await Author.create(payload)

            const author = await Author.create({
                name: result.name,
                email: result.email,
                password: result.password
            })

           

        return response.status(201).json({
            success: true,
            message: "new Author added",
            data: {
                    name: author.name,
                    email: author.email,
                    id: author.id,
                    createdAt: author.createdAt
                    },
        })
        } catch (error) {
            console.log(error)
            response.badRequest(`'error creating this user.....' ${error}`)
        
        }

    }

    public async login({ auth, request, response }: HttpContextContract){
            
            const payload = await request.validate(LoginValidator)

            try {

                const {email, password} = payload
                
                const author = await Author.findBy('email', email)

                if(!author) return response.status(404).json({
                    success: false,
                    message: "No author with this email address"
                })

                if(!(await Hash.verify(author.password, password))){
                    return response.status(401).json({
                        succes: false,
                        message: "Invalid credentials"
                    })
                }

                const userToken = await auth.use('api').generate(author, {expiresIn: '30 mins'} )

                author.remember_me_token = userToken.token

                await author.save()

                return response.status(200).json({

                    success: true,
                    messsage: 'user login successfully',
                    data: {
                        name: author.name,
                        email: author.email,
                        token: author.remember_me_token,
                        id: author.id,
                        createdAt: author.createdAt
                    },
                })
                
            } catch (error) {
                console.log(error)
                return response.badRequest(error.message)
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

    
    
    public async update({ params, request, response, auth}: HttpContextContract) {

        const payload = await request.validate(UpdateValidator)
        try {
    // Find the author by ID
            const { name } = payload
            const authorId = auth.user?.id
            const id = parseInt(params.id)

            if(authorId !== id) return response.status(403).json({
                success: false,
                message: "Bad Request..."
            })

            const author = await Author.findBy('id', id);


            // Update the author's name
            author!.name = name;
            await author!.save();

            return response.status(200).send({ 
                message: 'Author name updated successfully', 
                author: {
                    name: author?.name,
                    email: author?.email,
                    id: author?.id,
                    updateAt: author?.updatedAt
                } 
            
            });
            } catch (error) {
                return response.status(500).send({ error: 'An error occurred while updating the author name' });
        }
    }



    async destroy({ params, response, auth }) {
        try {
        // Find the author by ID
            const authorId = auth.user?.id
            const id = parseInt(params.id)

            if(authorId !== id) return response.status(403).json({
                success: false,
                message: "Bad Request..."
            })

            const author = await Author.findBy('id', id);

        // Delete the author
            await author!.delete();

            return response.status(200).send({ message: 'Author deleted successfully' });
        } catch (error) {
            return response.status(500).send({ error: 'An error occurred while deleting the author' });
        }
    }

}


