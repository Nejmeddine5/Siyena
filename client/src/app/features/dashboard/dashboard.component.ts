import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notificationService = inject(NotificationService);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    // Redirect Admin to Admin Dashboard
    const user = this.authService.currentUser();
    if (user?.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return;
    }
    
    this.notificationService.loadNotifications();
  }

  logout() {
    this.authService.logout();
  }
}
