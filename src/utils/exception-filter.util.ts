import { Catch, ExceptionFilter, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class RabbitMqValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException) {
    // Extract validation error details
    const exceptionResponse = exception.getResponse();

    // Return the error as the response
    // For RabbitMQ, we return the error directly instead of throwing it
    return exceptionResponse;
  }
}