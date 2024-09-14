import { desc, eq } from 'drizzle-orm'
import { db } from '../config/drizzle/db'
import { employee } from '../models/schema'

// constants and utils
import { HTTP_STATUS_CODE, MESSAGES, STATUS_MESSAGE } from '../utils/constants'
import { EmployeeUpdateObj } from '../utils/types'
import { ERROR_RESULT, SUCCESS_RESULT } from '../utils/returnResult'

type NewEmployee = typeof employee.$inferInsert

// Make the id property optional
type NewEmployeePayload = Omit<NewEmployee, 'id'> & { id?: NewEmployee['id'] }

/**
 * Inserts a new employee into the database
 * @param {object} employeePayload - employee information to insert
 * @returns {object} - the inserted employee, or null on error
 */
const insertEmployee = async (employeePayload: NewEmployeePayload) => {
  try {
    const newEmployee = await db
      .insert(employee)
      .values(employeePayload as NewEmployee)
      .returning()
    return SUCCESS_RESULT(true, MESSAGES.CREATED, newEmployee?.shift())
  } catch (err) {
    console.error(err)
    return ERROR_RESULT(false, HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE, STATUS_MESSAGE.DATABASE_ERROR)
  }
}

/**
 * Deletes an employee from the database
 * @param {number} employeeId - ID of the employee to delete
 * @returns {Result} - result object with success status and message
 */
const deleteEmployee = async (employeeId: number) => {
  return await db.transaction(async (tx) => {
    try {
      const deletedEmployee = await tx.delete(employee).where(eq(employee.id, employeeId)).returning()
      return SUCCESS_RESULT(true, MESSAGES.DELETED, deletedEmployee?.shift())
    } catch (err) {
      tx.rollback()
      console.error(err)
      return ERROR_RESULT(false, HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE, STATUS_MESSAGE.DATABASE_ERROR)
    }
  })
}

/**
 * Updates an existing employee in the database
 * @param {number} userId - id of the employee to be updated
 * @param {EmployeeUpdateObj} updatePayload - updated employee information
 * @returns {Result} - result object with success status and message
 */
const updateEmployee = async (employeeId: number, updatePayload: EmployeeUpdateObj) => {
  try {
    const updatedEmployee = await db.update(employee).set(updatePayload).where(eq(employee.id, employeeId)).returning()
    return SUCCESS_RESULT(true, MESSAGES.UPDATED, updatedEmployee?.shift())
  } catch (error) {
    console.error(error)
    return ERROR_RESULT(false, HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE, STATUS_MESSAGE.DATABASE_ERROR)
  }
}

/**
 * Fetches a employee by their ID
 * @param {number} employeeId - ID of the employee to fetch
 * @returns {Result<User, Error>} - Result object with the employee data or an error
 */
const fetchEmployeeById = async (employeeId: number) => {
  try {
    const employeeData = (await db.select().from(employee).where(eq(employee.id, employeeId))).shift()

    // employee not found
    if (!employeeData) {
      return ERROR_RESULT(false, HTTP_STATUS_CODE.NOT_FOUND_RESPONSE_CODE, MESSAGES.RESULT_NOT_FOUND)
    }

    return SUCCESS_RESULT(true, MESSAGES.DATA_SUCCESS, employee)
  } catch (error) {
    console.error(error)
    return ERROR_RESULT(false, HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE, STATUS_MESSAGE.DATABASE_ERROR)
  }
}

/**
 * Fetches all employees from the database
 * @returns {Result<Employee[], Error>} - Result object with the list of employees or an error
 */
const fetchAllEmployees = async () => {
  try {
    const allEmployees = await db.select().from(employee).orderBy(desc(employee.createdAt))
    return SUCCESS_RESULT(true, MESSAGES.DATA_SUCCESS, allEmployees)
  } catch (err) {
    console.error(err)
    return ERROR_RESULT(false, HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE, STATUS_MESSAGE.DATABASE_ERROR)
  }
}

export default {
  deleteEmployee,
  fetchAllEmployees,
  fetchEmployeeById,
  insertEmployee,
  updateEmployee,
}
