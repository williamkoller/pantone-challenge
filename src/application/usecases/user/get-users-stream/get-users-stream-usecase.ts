import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersStreamUseCase, Output } from './iget-users-stream-usecase';
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

  async execute(): Promise<Readable> {
    const usersStream = await this.userRepository.findAllStream();

    const transformToString = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, JSON.stringify(chunk));
      },
    });

    const writableStream = new Writable({
      write(chunk, encoding, next) {
        const stringifyer = chunk.toString();
        const rowData = JSON.parse(stringifyer);
        console.log('PROCESSANDO', rowData);
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
