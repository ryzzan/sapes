export class Student {
  name: string = '';
  cpf: number;
  complete: boolean = false;
  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
