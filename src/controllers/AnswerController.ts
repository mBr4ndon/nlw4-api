import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query


    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({ 
      id: String(u)
    })

    if(!surveyUserAlreadyExists) {
      return response.status(400).json({ 
        error: "Survey or user does not exists"
      })
    }

    surveyUserAlreadyExists.value = Number(value)

    await surveysUsersRepository.save(surveyUserAlreadyExists)

    return response.json(surveyUserAlreadyExists)
  }
}

export { AnswerController }