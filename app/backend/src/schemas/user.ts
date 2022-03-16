import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
});

const userSchema = Joi.object();

export { loginSchema, userSchema };
