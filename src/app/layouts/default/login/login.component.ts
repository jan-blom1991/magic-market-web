import { Component, OnInit } from '@angular/core';
import {Routed} from '../../../domain/routed';
import {Path} from '../../../domain/path';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, Routed {
  path: Path = Path.LOGIN;
  title = 'Login';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const emailAddress = this.loginForm.get('emailAddress').value;
    const password = this.loginForm.get('password').value;
    this.userService.getUser(emailAddress, password).subscribe({
      next: (data) => {
        this.messageService.updateMessage(data);
      },

      error: (error) => {
        this.messageService.updateMessage(error.error);
      }
    });
  }
}
