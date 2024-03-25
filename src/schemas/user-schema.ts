import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().trim().required(),
  username: joi.string().trim().required(),
  password: joi.string().trim().required()
})

export {
  userSchema
}