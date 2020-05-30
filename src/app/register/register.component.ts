import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {email :'',password : ''}; // used for 2 way binding on the HTML via the ngModel attribute

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
  }

  registerUser()
  {
    //console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
  }
}
