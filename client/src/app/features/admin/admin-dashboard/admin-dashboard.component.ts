import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  adminService = inject(AdminService);
  ticketService = inject(TicketService);
  
  userCount = signal<number>(0);
  tickets = signal<any[]>([]);

  stats = computed(() => {
    const all = this.tickets();
    return {
      total: all.length,
      todo: all.filter(t => t.status === 'pending' || t.status === 'assigned').length,
      inProgress: all.filter(t => t.status === 'in_progress').length,
      resolved: all.filter(t => t.status === 'resolved').length
    };
  });

  ngOnInit() {
    this.adminService.getAllUsers().subscribe(res => {
      this.userCount.set(res.results);
    });
    this.fetchTickets();
  }

  fetchTickets() {
    this.ticketService.getTickets().subscribe({
      next: (res) => this.tickets.set(res.data),
      error: (err) => console.error('Error fetching tickets for admin stats', err)
    });
  }
}

