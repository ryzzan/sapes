import { FormControl } from '@angular/forms';

export class BasicValidators {

  static email (control: FormControl){

    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
  static date (control: FormControl){

    let DATE_REGEXP = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if(!control.value) return null;
    return DATE_REGEXP.test(control.value) ? null : {
      validateDate: {
        valid: false
      }
    };
  }

  static nameStr (control: FormControl){

    let NAMESTR_REGEXP = /^[\\p{L} .'-]+$/;
    if(!control.value) return null;
    return NAMESTR_REGEXP.test(control.value) ? null : {
      validateNameStr: {
        valid: false
      }
    };
  }

  static cpf (control: FormControl){

    let CPF_REGEXP = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
    if(!control.value) return null;
    return CPF_REGEXP.test(control.value) ? null : {
      validateCpf: {
        valid: false
      }
    };
  }

 static zip (control: FormControl){

    let ZIP_REGEXP = /^[0-9]{5}-[0-9]{3}$/;
    if(!control.value) return null;
    return ZIP_REGEXP.test(control.value) ? null : {
      validateZip: {
        valid: false
      }
    };
 }

 static phone (control: FormControl){

    let ZIP_PHONE = /^[(]?[0-9]{2}[)]?[ ]?[0-9]{4}?[-]?[0-9]{4}$/;
    if(!control.value) return null;
    return ZIP_PHONE.test(control.value) ? null : {
      validatePhone: {
        valid: false
      }
    };
 }

 static cell_phone (control: FormControl){

    let ZIP_CELL_PHONE = /^[(]?[0-9]{2}[)]?[ ]?[0-9]{5}?[-]?[0-9]{4}$/;
    if(!control.value) return null;
    return ZIP_CELL_PHONE.test(control.value) ? null : {
      validateCellPhone: {
        valid: false
      }
    };
 }

}
