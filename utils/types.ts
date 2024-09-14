import { Gender } from './enum/common.enum'

export type EmployeeUpdateObj = {
  firstName?: string
  lastName?: string
  email?: string
  number?: string
  gender?: Gender
}
