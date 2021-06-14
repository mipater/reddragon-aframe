// @ts-nocheck
import {Component, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoading = false;
  error: string = '';

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.error = '';
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
