import { Component, OnInit } from '@angular/core';
import {User} from '../../../users/model/user';
import {AuthService} from '../../../users/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isMenuCollapsed = true;
  isLoggedIn = false;
  currentUser: User;

  constructor(private authService: AuthService,
              private router: Router) {
    this.currentUser = new User();
    this.currentUser.username = '';
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {

        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
  }

  // tslint:disable-next-line:typedef
  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  // tslint:disable-next-line:typedef
  verify(){
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
    // @ts-ignore
    if (this.currentUser.userRole === 'ADMIN'){
      return true;
    }
    // @ts-ignore
    if (this.currentUser.userRole === 'STANDARD'){
      return false;
    }
  }
}
