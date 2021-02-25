import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { SurveyController } from './controllers/SurveyController'

const router = Router()

const userController = new UserController()
const surveyController = new SurveyController()

router.post('/api/users', userController.create)
router.post('/api/surveys', surveyController.create)
router.get('/api/surveys', surveyController.show)

export { router }