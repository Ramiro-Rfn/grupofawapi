import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { v4 as uuid } from 'uuid'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({
      id: uuid(),
      name: 'ADMIN',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'ADMIN',
    })
  }
}
