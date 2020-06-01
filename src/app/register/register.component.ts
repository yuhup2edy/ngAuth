import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // use this to route the user to the events page after he logs in or signs up

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {email :'',password : ''}; // used for 2 way binding on the HTML via the ngModel attribute

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
  }

  registerUser()
  {
    //console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => { // we need to store the token returned by the service in the browser's local storage (cache)
            localStorage.setItem('token', res.token), // save as a key-value pair / object 
            console.log(res),
            this._router.navigate(['/special']) // once registered, send user to the special events page directly
          },
          err => console.log(err)
        );
  }
}
