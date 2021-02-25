import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe('Users', () => {

  beforeAll(async () => {
    const conn = await createConnection()
    //await conn.runMigrations()
  })



  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/api/users')
      .send({
        email: 'user@example.com',
        name: 'User test'
      })

    expect(response.status).toBe(201)
  })

  it('Sould not be able to create a user with an existing email', async () => {
    const response = await request(app).post('/api/users')
      .send({
        email: 'user@example.com',
        name: 'User test'
      })

      expect(response.status).toBe(400)
  })
})