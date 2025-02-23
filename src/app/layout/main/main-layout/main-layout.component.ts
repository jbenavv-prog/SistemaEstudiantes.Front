import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../../services/session.service';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private sessionService: SessionService, private router: Router) {}
  userEmail = '';

  ngOnInit() {
    this.userEmail = this.sessionService.getUserData()?.email;
  }

  logout(){
    this.sessionService.clearSession();
    this.router.navigate(['/auth/login']);
  }
}
