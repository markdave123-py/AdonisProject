import Route from '@ioc:Adonis/Core/Route'







Route.group(() =>{
    Route.group(() =>{
        Route.post('/register', 'AuthorsController.register')
        Route.post('login', 'AuthorsController.login')

    }).prefix("authors")
}).prefix("api")

