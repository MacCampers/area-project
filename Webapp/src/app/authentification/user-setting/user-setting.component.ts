import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentification/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService:AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    })
  }

  updatePassword() {
    if (this.form.valid) {
      this.authService.updatePassword(this.form.value);
    }
  }
}
