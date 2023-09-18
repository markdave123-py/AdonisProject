import  Hash  from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'

export default class AuthorsController {

     public async register({request, response }: HttpContextContract){

        try {
            const {name, email, password} = request.body()

            const author = await Author.create({
                name,
                email,
                password
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
            
            const { email, password } = request.body() 

            try {
                const author = await Author.findBy('email', email)

                if(!author) return response.status(404).json({
                    success: false,
                    message: "No user with this email address"
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
    }


