import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { CreateCustomerDTO } from '../dtos/create-customer.dto';
import { Customer } from '../models/custumer.model';
import { Contract } from './contract';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: CreateCustomerDTO): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'Email inválido');
    flunt.isFixedLen(model.document, 11, 'cpf inválido');
    flunt.hasMaxLen(model.password, 6, 'Senha inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
