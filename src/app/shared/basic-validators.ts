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
    let DATE_REGEXP = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
    var str = control.value;

    if(!str) return null;
    var currentDate = new Date(str.split('/').reverse().join('/'));
    var newDate = new Date();
    return (DATE_REGEXP.test(control.value) && (currentDate < newDate)) ? null : {
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

    var error = false;
    var add = 0;
    var i;
    var rev;
    if(!control.value) {
      return null;
    }
    var cpf = control.value.replace(/[^\d]+/g,'');

    if(cpf == '') error = true;
    //removes the known invalid CPFs numbers
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") error = true;

    //valid first digit
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            error = true;
    //valid second digit
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        error = true;

    return (CPF_REGEXP.test(control.value) &&  !error) ? null : {
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
