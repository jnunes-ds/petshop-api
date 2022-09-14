import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from '../contracts/contract';
import { Result } from '../models/result.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const body = context.switchToHttp().getRequest().body;
    const isValid = this.contract.validate(body);

    if (!isValid) {
      throw new HttpException(
        new Result('Ops, algo saiu errado!', false, null, this.contract.errors),
        HttpStatus.BAD_REQUEST,
      );
    }

    return call$;
  }
}
