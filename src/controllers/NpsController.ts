import { Request, Response } from "express"
import { getCustomRepository, Not, IsNull } from "typeorm"
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository"

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(0)
    })

    const detractors = surveysUsers.filter(survey => (
      survey.value >= 0 && survey.value <= 6
    ))

    const promoters = surveysUsers.filter(survey => (
      survey.value >= 9 && survey.value <= 10
    ))

    const passives = surveysUsers.filter(survey => (
      survey.value >= 7 && survey.value <= 8
    ))

    const totalAnswers = surveysUsers.length

    const npsPercentage = Number((((promoters.length - detractors.length) / totalAnswers) * 100).toFixed(2))

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      npsPercentage
    })
  }
}

export { NpsController }