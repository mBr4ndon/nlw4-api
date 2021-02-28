import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';

class SendMailControlller {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body

    const usersRespository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const userAlreadyExists = await usersRespository.findOneOrFail({ email })
    if (!userAlreadyExists) {
      return response.status(400).json({ 
        error: 'User does not exists'
      })
    }

    const surveyAlreadyExists = await surveysRepository.findOneOrFail({ id: survey_id })
    if (!surveyAlreadyExists) {
      return response.status(400).json({ 
        error: 'Survey does not exists'
      })
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: userAlreadyExists.id, value: 0},
      relations: ['user', 'survey']
    })

    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      description: surveyAlreadyExists.description,
      id: '',
      link: process.env.LOCAL_URL_MAIL
    }
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    if (surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id
      await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survey_id
    })
    await surveysUsersRepository.save(surveyUser)

    variables.id = surveyUser.id


    await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath)

    return response.status(201).json(surveyUser)
  }
}

export { SendMailControlller }