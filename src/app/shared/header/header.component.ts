import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  constructor(private router: Router,private authService : AuthService) {}

  @Output() lang = new EventEmitter<string>();

  onLogout() {
    this.authService.logout()
    // this.router.navigate(['login']);
  }


  changeLanguage(e:string){
    this.lang.emit(e);
  }
}
