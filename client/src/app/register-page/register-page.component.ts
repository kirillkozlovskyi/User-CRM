import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  aSub: Subscription | undefined;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }
  ngOnDestroy() {
    this.aSub?.unsubscribe();
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe((data) => {
      this.router.navigate(['/login'], {
        queryParams: {register: true}
      });
    }, e => {
      this.form.enable();
      console.log(e.massage)
    })
  }

}
