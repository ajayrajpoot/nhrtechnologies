import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { UsesService } from 'src/app/services/uses.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent {

  form: any;
  id: string = '';
  isEditMode: boolean = false;
  loading = false;
  submitted = false;
  frmUser: any;

  matcher = new MyErrorStateMatcher();

  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userSrv: UsesService,
    private gblSrv: GlobalService,
  ) { }

  ngOnInit() {
 

    this.bindFrm();

    this.id = this.route.snapshot.params['id'];

    if (this.id)
      this.isEditMode = true;

    if (this.isEditMode) {

      this.userSrv.getUsersById({ id: this.id })
        .subscribe((x: any) => {
          if (x.User && x.User.length) {
            this.frmUser?.reset(x.User[0]);
          }
        },
          error => {

            console.error(error.error.Message)
            this.gblSrv.errorNotification(error.error.Message || error.error || error.message || error);
          });

    }
  }

  redirect(url: string) {
    this.gblSrv.redirect(url);
  }

  bindFrm() {

    this.frmUser = this.fb.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      Gender: [''],
      Address: ['', [Validators.required]],
      Role: ['', [Validators.required]],
    });

    this.frmUser.valueChanges.subscribe((data: any) => {
      this.logValidationErrorUser(this.frmUser);
    });

  }

  formErrorsUser: any = {
    Name: '',
    Email: '',
    Password: '',
    Gender: '',
    Address: '',
    Role: '',
  };

  errorMessagesUser: any = {
    Name: { 'required': 'Enter Name.' },
    Email: { 'required': 'Enter Email.', 'email': 'Enter valied Email' },
    Password: { 'required': 'Enter Password.' },
    Gender: { 'required': 'Select Gender.' },
    Address: { 'required': 'Enter Address.' },
    Role: { 'required': 'Select Role.' },
  }

  logValidationErrorUser(group: UntypedFormGroup = this.frmUser): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof UntypedFormGroup) {
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
      if (control.controls) { // control is a FormGroup
        this.markFormTouched(control);
      } else { // control is a FormControl
        control.markAsTouched();
      }

    });
    this.logValidationErrorUser();
  }

  onSubmit() {

    this.markFormTouched(this.frmUser);

    if (this.frmUser?.invalid) {
      return;
    }

    this.loading = true;
    console.log("this.isEditMode", this.isEditMode);

    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  private createUser() {

    try {

      this.userSrv.createUsers(this.frmUser?.value)
        .subscribe((data) => {

          if (data.Result) {
            this.gblSrv.successNotification(data.Message);
            this.router.navigate(['users']);
          } else {
            this.gblSrv.errorNotification(data.Message);
          }

        }, (error: any) => {

          console.error(error);
          this.gblSrv.errorNotification(error.error.Message || error.error || error.message || error);

        }
        );
    } catch (error: any) {
      this.gblSrv.errorNotification(error.Message || error);

    }

  }

  private updateUser() {
    try {
      this.userSrv.updateUsers(this.id, this.frmUser?.value)
        .subscribe(
          (data) => {
            if (data.Result) {
              this.gblSrv.successNotification(data.Message);
              this.router.navigate(['users']);
            } else {
              this.gblSrv.errorNotification(data.Message);
            }
          },
          (error: any) => {
            console.error(error);
            this.gblSrv.errorNotification(error.error.Message || error.error || error.message || error);

          }
        );


    } catch (error: any) {
      this.gblSrv.errorNotification(error.Message || error);

    }
  }
}
