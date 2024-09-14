import { Request, Response } from 'express'
import employeeService from '../services/employee'

// constnats and utils
import { HTTP_STATUS_CODE, STATUS_MESSAGE } from '../utils/constants'
import { ErrorResult, SuccessResult } from '../utils/interface'
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '../utils/responseHelpers'

// validations
import {
  CreateEmployeeSchema,
  GetEmployeeByIdSchema,
  ModifyEmployeeSchema,
  RemoveEmployeeByIdSchema,
} from '../utils/validations/employeeValidationSchema'

const createEmployee = (req: Request, res: Response) => {
  // validate req.body for schema
  const { error, value } = CreateEmployeeSchema.validate(req.body)

  if (error) {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
      (error && error?.message) || '' || STATUS_MESSAGE.REQUEST_VALIDATION_FAILED,
    )
  }

  employeeService
    .insertEmployee(value)
    .then((data) => {
      if (data?.status) {
        return SUCCESS_RESPONSE(
          res,
          true,
          HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
          (data as SuccessResult)?.data,
          data?.message || '',
        )
      } else {
        return ERROR_RESPONSE(res, false, (data as ErrorResult)?.code, data?.message || '')
      }
    })
    .catch((err) => {
      console.log(err)
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
        STATUS_MESSAGE.SERVER_ERROR,
      )
    })
}

const removeEmployee = (req: Request, res: Response) => {
  // validate req.params for schema
  const { error } = RemoveEmployeeByIdSchema.validate(req.params)
  if (error) {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
      (error && error?.message) || '' || STATUS_MESSAGE.REQUEST_VALIDATION_FAILED,
    )
  }

  employeeService
    .deleteEmployee(Number.parseInt(req.params.id))
    .then((data) => {
      console.log(data)
      if (data?.status) {
        return SUCCESS_RESPONSE(
          res,
          true,
          HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
          (data as SuccessResult)?.data,
          data.message || '',
        )
      } else {
        return ERROR_RESPONSE(res, false, (data as ErrorResult)?.code, data?.message || '')
      }
    })
    .catch((err) => {
      console.log(err)
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
        STATUS_MESSAGE.SERVER_ERROR,
      )
    })
}

const modifyEmployee = (req: Request, res: Response) => {
  // validate req.body for schema
  const { error, value } = ModifyEmployeeSchema.validate(req.body)

  if (error) {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
      (error && error?.message) || '' || STATUS_MESSAGE.REQUEST_VALIDATION_FAILED,
    )
  }

  employeeService
    .updateEmployee(Number.parseInt(req.params.id), value)
    .then((data) => {
      if (data?.status) {
        return SUCCESS_RESPONSE(
          res,
          true,
          HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
          (data as SuccessResult)?.data,
          data.message || '',
        )
      } else {
        return ERROR_RESPONSE(res, false, (data as ErrorResult)?.code, data?.message || '')
      }
    })
    .catch((err) => {
      console.log(err)
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
        STATUS_MESSAGE.SERVER_ERROR,
      )
    })
}

const getEmployeeById = (req: Request, res: Response) => {
  // validate req.params for schema
  const { error } = GetEmployeeByIdSchema.validate(req.params)
  if (error) {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE,
      (error && error?.message) || '' || STATUS_MESSAGE.REQUEST_VALIDATION_FAILED,
    )
  }

  employeeService
    .fetchEmployeeById(Number.parseInt(req.params.id))
    .then((data) => {
      if (data?.status) {
        return SUCCESS_RESPONSE(
          res,
          true,
          HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
          (data as SuccessResult)?.data,
          data.message || '',
        )
      } else {
        return ERROR_RESPONSE(res, false, (data as ErrorResult)?.code, data?.message || '')
      }
    })
    .catch((err) => {
      console.log(err)
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
        STATUS_MESSAGE.SERVER_ERROR,
      )
    })
}

const getAllEmployees = (req: Request, res: Response) => {
  employeeService
    .fetchAllEmployees()
    .then((data) => {
      if (data?.status) {
        return SUCCESS_RESPONSE(
          res,
          true,
          HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
          (data as SuccessResult)?.data,
          data.message || '',
        )
      } else {
        return ERROR_RESPONSE(res, false, HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE, data?.message || '')
      }
    })
    .catch((err) => {
      console.log(err)
      return ERROR_RESPONSE(
        res,
        false,
        HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
        STATUS_MESSAGE.SERVER_ERROR,
      )
    })
}

export default {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  modifyEmployee,
  removeEmployee,
}
