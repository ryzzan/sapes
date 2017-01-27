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

    return DATE_REGEXP.test(control.value) ? null : {
      validateDate: {
        valid: false
      }
    };
  }

  static name (control: FormControl){

    let DATE_REGEXP = /^[A-Z]'?[- a-zA-Z]( [a-zA-Z])*$/;

    return DATE_REGEXP.test(control.value) ? null : {
      validateDate: {
        valid: false
      }
    };
  }
}
