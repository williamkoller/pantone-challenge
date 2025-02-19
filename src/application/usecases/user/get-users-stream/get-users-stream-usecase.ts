import { Inject, Injectable } from '@nestjs/common';
import {
  IGetUsersStreamUseCase,
  Input,
  Output,
} from './iget-users-stream-usecase';
import { UserMapper } from '../../../mappers/user/user-mapper';
import { UserRepository } from '../../../../data/db/user/user-repository';
import { User } from '../../../../domain/user/user';
import { Readable, Transform, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

@Injectable()
export class GetUsersStreamUseCase implements IGetUsersStreamUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input): Promise<Readable> {
    const limitDefault = Math.min(input.limit ?? 1000, 1000);
    const offsetDefault = Math.max(input.offset ?? 1, 1);

    const usersStream = await this.userRepository.findAllStream(
      limitDefault,
      (offsetDefault - 1) * limitDefault,
    );

    const transformToString = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, JSON.stringify(chunk));
      },
    });

    const writableStream = new Writable({
      write(chunk, encoding, next) {
        next();
      },
    });

    console.log('Iniciou', new Date().toISOString());

    usersStream
      .pipe(transformToString)
      .pipe(writableStream)
      .on('close', () => console.log('Finalizou', new Date().toISOString()));

    return usersStream.pipe(transformToString);
  }
}
