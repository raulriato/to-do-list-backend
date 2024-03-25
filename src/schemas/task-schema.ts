import joi from 'joi';

const taskSchema = joi.object({
  title: joi.string().trim().required(),
  description: joi.string().trim().required(),
  priority: joi.string().trim().required(),
  startAt: joi.string().trim().required(),
  endAt: joi.string().trim().required(),
  userId: joi.number().positive().integer().required()
})

export {
  taskSchema
}