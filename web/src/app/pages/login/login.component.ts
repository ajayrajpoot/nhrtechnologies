import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { GlobalService } from 'src/app/services/global.service';
import { UsesService } from 'src/app/services/uses.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  frmUser: any;


  matcher = new MyErrorStateMatcher();

  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userSrv: UsesService,
    private gblSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.bindFrm()
  }
  bindFrm() {

    this.frmUser = this.fb.group({
      Email: ['admin@gmail.com', [Validators.required, Validators.email]],
      Password: ['12345', [Validators.required]],
    });

    this.frmUser.valueChanges.subscribe((data: any) => {
      this.logValidationErrorUser(this.frmUser);
    });

  }

  formErrorsUser: any = {
    Email: '',
    Password: '',
  };

  errorMessagesUser: any = {
    Email: { 'required': 'Enter Email.', 'email': 'Enter valied Email' },
    Password: { 'required': 'Enter Password.' },
  }

  logValidationErrorUser(group: FormGroup = this.frmUser): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorUser(abstractControl);
      } else {
        this.formErrorsUser[key] = '';
        if (abstractControl && !abstractControl.valid
          && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.errorMessagesUser[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrorsUser[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  markFormTouched(formGroup: any) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      if (control.controls) {  
        this.markFormTouched(control);
      } else {  
        control.markAsTouched();
      }

    });
    this.logValidationErrorUser();
  }

  onSubmit() {

    this.userSrv.login(this.frmUser.value).subscribe(data => {
      if (data.Result) {
        
        this.gblSrv.successNotification(data.Message);

        localStorage.setItem('localData', JSON.stringify(data));
        this.gblSrv.redirect('/users');

      } else {
        this.gblSrv.errorNotification(data.Message);
      }
    });

  }
}
