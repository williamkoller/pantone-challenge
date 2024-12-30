import { ProducerConflictException } from './producer-conflict-exception';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProducerConflictException', () => {
  it('should be defined', () => {
    const exception = new ProducerConflictException();
    expect(exception).toBeDefined();
  });

  it('should have the correct status code', () => {
    const exception = new ProducerConflictException();
    expect(exception.getStatus()).toBe(HttpStatus.CONFLICT);
  });

  it('should have the correct default message', () => {
    const exception = new ProducerConflictException();
    expect(exception.message).toBe('Producer already exists');
  });

  it('should allow custom message', () => {
    const customMessage = 'Custom producer conflict message';
    const exception = new ProducerConflictException(customMessage);
    expect(exception.message).toBe(customMessage);
  });

  it('should be an instance of HttpException', () => {
    const exception = new ProducerConflictException();
    expect(exception instanceof HttpException).toBe(true);
  });
});
