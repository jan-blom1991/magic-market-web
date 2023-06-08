import {Component, OnInit} from '@angular/core';
import {Routed} from '../../../shared/models/routed';
import {Path} from '../../../shared/models/path';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';
import {ProgressBarService} from "../../../services/progress-bar.service";

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
              private messageService: MessageService,
              private progressBarService: ProgressBarService) {}

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
    this.progressBarService.activate();
    this.userService.getUser(emailAddress, password).subscribe();
  }
}
