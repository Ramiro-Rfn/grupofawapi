import User from '#models/user'

type CreateUserDTO = {
  name: string
  email: string
  password: string
}

type UpdateUserDTO = {
  name: string | undefined
}

export class UserService {
  async createUser(data: CreateUserDTO) {
    const existsUser = await User.findBy('email', data.email)

    if (existsUser?.id) {
      throw new Error('user already exists')
    }

    const createdUser = await User.create(data)

    return createdUser
  }

  async listAllUsers() {
    const users = await User.all()

    return users
  }

  async listOneUser(id: string) {
    const user = await User.findOrFail(id)

    return user
  }

  async deleteUser(id: string) {
    const user = await User.findOrFail(id)

    await user.delete()
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    const user = await User.findOrFail(id)

    user.merge(data)

    const updatedUser = await user.save()

    return updatedUser
  }
}
