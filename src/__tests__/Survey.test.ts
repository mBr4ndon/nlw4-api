import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe('Surveys', () => {

  beforeAll(async () => {
    const conn = await createConnection()
    //await conn.runMigrations()
  })



  it('Should be able to create a new survey', async () => {
    const response = await request(app).post('/api/surveys')
      .send({
        title: 'title test',
        name: 'description test'
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('title')
  })

  it('Should be able to get all surveys', async () => {
    await request(app).post('/api/surveys')
      .send({
        title: 'title test 2',
        name: 'description test 2'
      })
    
    const response = await request(app).get('/api/surveys')

    expect(response.body.length).toBe(2)
  })

})