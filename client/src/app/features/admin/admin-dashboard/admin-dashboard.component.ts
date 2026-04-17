import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  adminService = inject(AdminService);
  userCount = signal<number>(0);

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(res => {
      this.userCount.set(res.results);
    });
  }
}
