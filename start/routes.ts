/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/users', [UsersController, 'create'])
    router.post('/login', [AuthController, 'login'])
    router.get('/users', [UsersController, 'index'])
    router.get('/user/one/:id', [UsersController, 'show'])
    router.delete('/user/delete/:id', [UsersController, 'delete'])
    router.put('/user/update/:id', [UsersController, 'update'])
  })
  .prefix('/api')
