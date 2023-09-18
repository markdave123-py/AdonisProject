import Route from '@ioc:Adonis/Core/Route'







Route.group(() =>{
    
    Route.post('/', 'BooksController.store').middleware('auth')
    Route.put('/:id', 'BooksController.update').middleware('auth')


}).prefix("books")










