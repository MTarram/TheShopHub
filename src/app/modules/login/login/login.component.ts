import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }
  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = this.formBuilder.group({
      usernameFormControl: new FormControl('', [Validators.required]),
      passwordFormControl: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {


    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.get('usernameFormControl')?.value, this.form.get('passwordFormControl')?.value)
      .pipe(first())
      .subscribe({
        next: () => {},
        error: error => {
          this.messageService.clear();
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Error', detail: error.error });
        }
      });
  }
}
