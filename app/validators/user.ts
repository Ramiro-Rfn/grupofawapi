import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)

export const logUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
