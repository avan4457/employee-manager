import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import employeeRouter from '../../routes/employee'
import { db } from '../../config/drizzle/db'
import { employee } from '../../models/schema'

const app = express()
app.use(bodyParser.json())
app.use('/api/employee', employeeRouter)

beforeAll(async () => {
  await db.delete(employee)
})

afterAll(async () => {
  await db.delete(employee)
})

describe('Employee API Integration Tests', () => {
  let createdEmployeeId: number

  it('should create a new employee', async () => {
    const newEmployee = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    }

    const response = await request(app).post('/api/employee').send(newEmployee).expect(200)

    expect(response.body.status).toBe(true)
    expect(response.body.data).toHaveProperty('id')
    expect(response.body.data.firstName).toBe('Jane')
    expect(response.body.data.lastName).toBe('Doe')
    expect(response.body.data.email).toBe('jane.doe@example.com')

    createdEmployeeId = response.body.data.id // Save ID for later use
  })

  it('should update the employee details', async () => {
    const updatedEmployee = {
      firstName: 'Janet',
      lastName: 'Doe',
      email: 'janet.doe@example.com',
    }

    const response = await request(app).put(`/api/employee/${createdEmployeeId}`).send(updatedEmployee).expect(200)

    expect(response.body.status).toBe(true)
    expect(response.body.data).toHaveProperty('id', createdEmployeeId)
    expect(response.body.data.firstName).toBe('Janet')
    expect(response.body.data.lastName).toBe('Doe')
    expect(response.body.data.email).toBe('janet.doe@example.com')
  })

  it('should delete the employee by ID', async () => {
    const response = await request(app).delete(`/api/employee/${createdEmployeeId}`).expect(200)

    expect(response.body.status).toBe(true)
    expect(response.body.data).toHaveProperty('id', createdEmployeeId)
  })
})
