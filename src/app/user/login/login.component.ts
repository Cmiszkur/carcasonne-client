import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.sass' ],
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [ Validators.required ]);
  passwordFormControl = new FormControl('', [ Validators.required ]);
  LoginForm = new FormGroup({
    username: this.usernameFormControl,
    password: this.passwordFormControl,
  });

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    const userInput = this.LoginForm.value;
    this.authService.login(userInput).subscribe((data) => {
      console.log(data);
      if (data.message === 'username') {
        this.usernameFormControl.setErrors({ usernameHasError: true });
      }
      if (data.message === 'password') {
        this.passwordFormControl.setErrors({ passwordHasError: true });
      }
    });
  }
}
