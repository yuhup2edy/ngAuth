import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {email :'',password : ''}; // used for 2 way binding on the HTML via the ngModel attribute

  constructor() { }

  ngOnInit(): void {
  }

  registerUser()
  {
    console.log(this.registerUserData);
  }
}
