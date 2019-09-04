import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUser } from '../models';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output()
  public toggleSidenav = new EventEmitter();

  private sub: Subscription = null;
  public isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.sub = authService.currentUser
      .subscribe(
        user => this.isLoggedIn = user !== null
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public logout() {
    this.authService.logout().subscribe();
    this.toggleSidenav.emit();
  }
}
