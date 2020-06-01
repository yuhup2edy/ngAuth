import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  constructor(private _eventService : EventService, private _router : Router) { }

  specialEvents = [];

  ngOnInit(): void {

    this._eventService.getSpecialEvents()
        .subscribe(
          res => this.specialEvents = res,
          err => {
            if (err instanceof HttpErrorResponse){
              if (err.status === 401) { // if the server or middleware returns 401, route to the login page
                  this._router.navigate(['/login']);
              }
            }
          }
        );
  }

}
