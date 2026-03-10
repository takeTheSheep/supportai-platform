export class AppError extends Error {
  readonly statusCode: number;
  readonly expose: boolean;

  constructor(message: string, statusCode = 400, expose = true) {
    super(message);
    this.statusCode = statusCode;
    this.expose = expose;
  }
}

export const safeErrorResponse = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      message: error.expose ? error.message : "Request failed",
      statusCode: error.statusCode
    };
  }

  return {
    message: "Unexpected error",
    statusCode: 500
  };
};

