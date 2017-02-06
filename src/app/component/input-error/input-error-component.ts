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
    /* get the message for error*/
    if(errors == null) return '';

    let key = this.getError(errors);
    if(key == "") return '';
   
    if(key == 'minlength'){
     return messages[key].replace('@minValue', this.errors.minlength.requiredLength);
    }

    if(key == 'maxlength'){
     return messages[key].replace('@maxValue', this.errors.maxlength.requiredLength);
    }
    
    let message =  messages[key].replace('@field', this.title);
    return message;
  }

  getError(errors){
    /* Get de name of error*/ 
    if(typeof(errors.required)!="undefined")
      return 'required';

    let keys = Object.keys(errors);
    if(keys.length === 0) '';
    console.log(errors);
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
      validateCpf = 'CPF em formato incorreto',
      minlength = 'Este campo deve ter no mínimo @minValue caracteres',
      maxlength = 'Este campo deve ter no máximo @maxValue caracteres'
  } = {}){
      this.messages = {
        required: required,
        defaultInvalid: defaultInvalid,
        validateCpf: validateCpf,
        minlength: minlength,
        maxlength: maxlength
      }
  }
}
