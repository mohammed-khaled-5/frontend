import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
    password: '',
    role: 'admin',
    loggedIn: false,
  };

  userLogin(): void {
    if (this.user.username === '' || this.user.password === '') {
      window.alert('Please fill all the fields');
    } else {
      this.userService.userLogin(this.user).subscribe(
        () => {
          this.router.navigate(['/createstation']);
          // console.log(data);
        },
        () => {
          window.alert('Please enter valid credentials');
        }
      );
    }
  }

  validateForm!: UntypedFormGroup;
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

  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
