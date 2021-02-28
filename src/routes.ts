import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { SurveyController } from './controllers/SurveyController'
import { SendMailControlller } from './controllers/SendMailControlller'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'

const router = Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailControlller()
const answerController = new AnswerController()
const npsController = new NpsController()

router.post('/api/users', userController.create)

router.post('/api/surveys', surveyController.create)
router.get('/api/surveys', surveyController.show)

router.post('/api/sendmail', sendMailController.execute)

router.get('/api/answers/:value', answerController.execute)

router.get('/api/nps/:survey_id', npsController.execute)

export { router }