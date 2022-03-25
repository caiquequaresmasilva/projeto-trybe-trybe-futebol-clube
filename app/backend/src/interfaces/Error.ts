type ErrorKeys = {
  code: number
  message:string
};

interface ServiceError{
  error: ErrorKeys | false
}

interface ExtendedError extends Error{
  code?:number
}

export { ErrorKeys, ServiceError, ExtendedError };
