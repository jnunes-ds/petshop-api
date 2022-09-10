import { Flunt } from 'src/utils/flunt';
import { Customer } from '../models/custumer.model';
import { Contract } from './contract';

export class CreateCustomerContract implements Contract {
  errors: any[];
  validate(model: Customer): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'Email inválido');
    flunt.isFixedLen(model.document, 11, 'cpf inválido');
    flunt.hasMinLen(model.password, 6, 'Senha inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
