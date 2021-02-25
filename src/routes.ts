import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { SurveyController } from './controllers/SurveyController'
import { SendMailControlller } from './controllers/SendMailControlller'

const router = Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailControlller()

router.post('/api/users', userController.create)

router.post('/api/surveys', surveyController.create)
router.get('/api/surveys', surveyController.show)

router.post('/api/sendmail', sendMailController.execute)

export { router }