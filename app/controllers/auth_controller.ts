import User from '#models/user'
import { logUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(logUserValidator)
    const user = await User.verifyCredentials(email, password)

    return await auth.use('jwt').generate(user)
  }
}
