import employeeService from '../../services/employee'

// Mock the db module
jest.mock('../../config/drizzle/db', () => ({
  db: {
    insert: jest.fn(() => ({
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ]),
    })),
    delete: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ]),
    })),
    update: jest.fn(() => ({
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ]),
    })),
    select: jest.fn(() => ({
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockResolvedValueOnce([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ]),
    })),
    transaction: jest.fn((callback) =>
      callback({
        delete: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValueOnce([
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
            },
          ]),
        })),
      }),
    ),
  },
}))

describe('employeeService', () => {
  it('should insert a new employee and return the inserted employee', async () => {
    const newEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }

    const result = await employeeService.insertEmployee(newEmployee)

    expect(result).toEqual({
      status: true,
      message: 'Successfully Created',
      pagination: undefined,
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    })
  })

  it('should delete an employee and return the deleted employee', async () => {
    const employeeId = 1

    const result = await employeeService.deleteEmployee(employeeId)

    expect(result).toEqual({
      status: true,
      message: 'Successfully Deleted',
      pagination: undefined,
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    })
  })

  it('should update an employee and return the updated employee', async () => {
    const updatePayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }
    const employeeId = 1

    const result = await employeeService.updateEmployee(employeeId, updatePayload)

    expect(result).toEqual({
      status: true,
      message: 'Successfully Updated',
      pagination: undefined,
      data: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    })
  })

  it('should fetch all employees and return the list of employees', async () => {
    const result = await employeeService.fetchAllEmployees()

    expect(result).toEqual({
      status: true,
      pagination: undefined,
      message: 'Data Successfully Retrieved',
      data: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
      ],
    })
  })
})
