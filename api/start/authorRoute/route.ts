import Route from '@ioc:Adonis/Core/Route'








Route.group(() =>{

    Route.post('/register', 'AuthorsController.register')
    Route.post('login', 'AuthorsController.login')
    Route.get('/', 'AuthorsController.index').middleware('auth')
    Route.put('/:id', 'AuthorsController.update').middleware('auth') 
    Route.delete('/:id', 'AuthorsController.destroy').middleware('auth');

}).prefix("authors")


