import Joi from 'joi'
import { Gender } from '../../utils/enum/common.enum'

// Schema for creating a employee
export const CreateEmployeeSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional(),
  number: Joi.string().optional(),
  photo: Joi.string().optional().allow(null),
  gender: Joi.valid(...Object.values(Gender)).optional(),
})

// Schema for modify a employee
export const ModifyEmployeeSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().optional(),
  number: Joi.string().optional(),
  photo: Joi.string().optional().allow(null),
  gender: Joi.valid(...Object.values(Gender)).optional(),
})

// Schema for deleting a employee by ID
export const RemoveEmployeeByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
})

// Schema for fetching a employee by ID
export const GetEmployeeByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
})
