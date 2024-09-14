interface SuccessResult {
  status: boolean
  message: string | undefined
  data?: { id?: number } | undefined
}

interface ErrorResult {
  status: boolean
  code: number
  message: string
}

export { SuccessResult, ErrorResult }
