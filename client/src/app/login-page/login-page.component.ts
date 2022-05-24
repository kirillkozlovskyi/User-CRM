import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  form: FormGroup;
  aSub: Subscription | undefined;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
    this.route.queryParams.subscribe((params: Params) => {
      if(params['register']) {

      }
      else if (params['accessDenied']) {
        // TODO add message "autorisation before app used"
      }
    });
  }
  ngOnDestroy() {
      this.aSub?.unsubscribe();
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe((data) => {
      this.router.navigate(['/overview'])
      console.log('login success');
    }, (error) => {
      console.warn(error.message);
      this.form.enable();
    });
  }
}
