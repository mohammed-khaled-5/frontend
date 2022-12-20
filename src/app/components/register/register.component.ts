import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    id: '',
    username: '',
    password: '',
    role: 'admin',
    loggedIn: false,
  };

  createUser(): void {
    if (this.user.username === '' || this.user.password === '') {
      window.alert('Please fill all the fields');
    } else {
      this.userService.createUser(this.user).subscribe((data) => {
        this.router.navigate(['/login']);
        console.log(data);
      });
    }
  }

  validateForm: UntypedFormGroup;

  // current locale is key of the nzAutoTips
  // if it is not found, it will be searched again with `default`
  autoTips: Record<string, Record<string, string>> = {
    en: {
      required: 'Input is required',
    },
    default: {
      email: 'The input is not valid email',
    },
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls['confirm'].updateValueAndValidity()
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  userNameAsyncValidator = (control: UntypedFormControl) =>
    new Observable((observer: Observer<MyValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            duplicated: {
              'zh-cn': `用户名已存在`,
              en: `The username is redundant!`,
            },
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // use `MyValidators`
    const { required, maxLength, minLength } = MyValidators;
    this.validateForm = this.fb.group({
      userName: [
        '',
        [required, maxLength(12), minLength(4)],
        [this.userNameAsyncValidator],
      ],
      password: ['', [required]],
    });
  }
}

// current locale is key of the MyErrorsOptions
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `You must enter atleast ${minLength} characters`,
        },
      };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }
}
