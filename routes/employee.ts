import express from 'express'
import employeeController from '../controllers/employee'

const employeeRouter = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First Name of the employee
 *         lastName:
 *           type: string
 *           description: Last Name of the employee
 *         gender:
 *           type: string
 *           description: Gender of the employee
 *         number:
 *           type: string
 *           description: Phone number of the employee
 *         email:
 *           type: string
 *           description: Email address of the employee
 *         photo:
 *           type: string
 *           description: Photo of the employee
 *
 */

/**
 * @swagger
 * /api/employee:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     requestBody:
 *       description: Employee object to be created
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Successful creation of the employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal server error
 */
employeeRouter.post('/', employeeController.createEmployee)

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Remove employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the employee to remove
 *     responses:
 *       200:
 *         description: Employee removed successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

employeeRouter.delete('/:id', employeeController.removeEmployee)

/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Modify employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the employee to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee modified successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
employeeRouter.put('/:id', employeeController.modifyEmployee)

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
employeeRouter.get('/:id', employeeController.getEmployeeById)

/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: A list of all employees
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               data: [{}, {}, ...]
 *               message: Success
 *       500:
 *         description: Internal server error
 */
employeeRouter.get('/', employeeController.getAllEmployees)

export default employeeRouter
