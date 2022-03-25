import { ServiceError } from '../interfaces';
import StatusCode from '../enums/StatusCode';

export default class ErrorGen {
  constructor(
    private statusCode: typeof StatusCode,
  ) {}

  badRequest(message:string):ServiceError {
    return {
      error: {
        code: this.statusCode.BAD_REQUEST,
        message,
      },
    };
  }

  unauthorized(message:string):ServiceError {
    return {
      error: {
        code: this.statusCode.UNAUTHORIZED,
        message,
      },
    };
  }

  notFound(message:string):ServiceError {
    return {
      error: {
        code: this.statusCode.NOT_FOUND,
        message,
      },
    };
  }

  unprocessableEntity(message:string):ServiceError {
    return {
      error: {
        code: this.statusCode.UNPROCESSABLE_ENTITY,
        message,
      },
    };
  }

  internalServerError(message:string):ServiceError {
    return {
      error: {
        code: this.statusCode.INTERNAL_SERVER_ERROR,
        message,
      },
    };
  }
}
