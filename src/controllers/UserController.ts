import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Invalid params'})
    }

    const usersRespository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRespository.findOne({
      email
    })

    if (userAlreadyExists) {
      return response.status(400).json({ 
        error: "User already exists"
      })
    }

    const user = usersRespository.create({
      name,
      email
    })

    await usersRespository.save(user)

    return response.status(201).json(user)
  }
}

export { UserController }
