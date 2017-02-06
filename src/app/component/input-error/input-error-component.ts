import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css']
})
export class InputErrorComponent implements OnChanges {
  @Input() validators:any = {};
  @Input() errors:any;
  @Input() title:string;
  private messages:any;
  private messageError: string = "";

  constructor() {
  }

  ngOnChanges(){

    this.setMessages(this.validators);
    this.messageError = this.getMessage(this.errors,this.messages);
  }

  getMessage(errors = {}, messages){
    if(errors == null) return '';

    let key = this.getError(errors);
    if(key == "") return '';
    return messages[key].replace('@field', this.title);
  }

  getError(errors){
    if(typeof(errors.required)!="undefined")
      return 'required';

    let keys = Object.keys(errors);
    if(keys.length === 0) '';

    let key = null;
    keys.forEach(function(value){
      if(value != "required"){
        return key = value;
      }
    })
    if(key != null) return key;
    return 'defaultInvalid';
  }

  setMessages({
      required = 'O campo @field é obrigatório',
      defaultInvalid = 'O valor do campo @field é inválido',
      validateCpf = 'CPF em formato incorreto'
  } = {}){
      this.messages = {
        required: required,
        defaultInvalid: defaultInvalid,
        validateCpf: validateCpf
      }
  }
}
