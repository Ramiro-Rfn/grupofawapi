import { UserService } from '#services/user_service'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

const userService = new UserService()

export default class UsersController {
  public async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    try {
      const createdUser = await userService.createUser(data)

      return response.status(201).json(createdUser)
    } catch (erorr) {
      return response.status(400).json({
        message: erorr.message,
      })
    }
  }

  public async index({ auth, response }: HttpContext) {
    await auth.authenticate()

    try {
      const users = await userService.listAllUsers()

      return response.status(200).json(users)
    } catch (error) {
      return response.status(400).json({ message: 'Erro ao buscar Usuário' })
    }
  }

  public async show({ auth, response, request }: HttpContext) {
    await auth.authenticate()

    const { id } = request.params()

    try {
      const user = await userService.listOneUser(id)

      return user
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async delete({ auth, response, request }: HttpContext) {
    await auth.authenticate()
    const { id } = request.params()

    try {
      await userService.deleteUser(id)

      return response.status(204)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }

  public async update({ auth, response, request }: HttpContext) {
    await auth.authenticate()
    const { id } = request.params()
    const data = request.body()

    try {
      await userService.updateUser(id, { name: data.name })

      return response.status(200)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}
