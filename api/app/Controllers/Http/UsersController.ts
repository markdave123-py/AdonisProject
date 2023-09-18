import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import  Hash  from '@ioc:Adonis/Core/Hash'

export default class UsersController {

    // public async index() {
    //     const users = await User.all()
    //     return {user: users}
    // }

    // public async show({ params }){
    //     const user = await User.find(params.id)
    //     return user
    // } 

    public async register({request, response }: HttpContextContract){

        try {
            const {username, email, password} = request.body()

            const user = await User.create({
                username,
                email,
                password
            })


        return response.status(201).json({
            success: true,
            message: "user successfully created",
            data:{
                    name: user.username,
                    email: user.email,
                    id: user.id,
                    createdAt: user.createdAt
                    },
        })
        } catch (error) {
            console.log(error)
            response.internalServerError(`'internal sever error...' `)
        }

    }



    public async login({ auth, request, response }: HttpContextContract){
            
            const { email, password } = request.body() 

            try {
                const user = await User.findBy('email', email)

                if(!user) return response.status(404).json({
                    success: false,
                    message: "No user with this email address"
                })

                if(!(await Hash.verify(user.password, password))){
                    return response.status(401).json({
                        succes: false,
                        message: "Invalid credentials"
                    })
                }

                const userToken = await auth.use('api').generate(user, {expiresIn: '30 mins'} )

                user.remember_me_token = userToken.token

                await user.save()

                return response.status(200).json({

                    success: true,
                    messsage: 'user login successfully',
                    data: {
                        name: user.username,
                        email: user.email,
                        token: user.remember_me_token,
                        id: user.id,
                        createdAt: user.createdAt
                    },
                })
                
            } catch (error) {
                console.log(error)
                return response.badRequest(error.message)
            }
        } 
}
