import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Alert {
  _id: string;
  clientName: string;
  printerModel: string;
  issue: string;
  severity: string;
  status: string;
  confidence: number;
  createdAt: string;
}

export interface Ticket {
  _id: string;
  ticketId: string;
  alertId: string | any;
  clientName: string;
  printerModel: string;
  issue: string;
  priority: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'cancelled';
  assignedTechnician: any;
  createdAt: string;
  resolutionReport?: {
    problemDescription: string;
    actionTaken: string;
    date: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAlerts(): Observable<{ status: string, data: Alert[] }> {
    return this.http.get<{ status: string, data: Alert[] }>(`${this.apiUrl}/alerts`);
  }

  getTickets(): Observable<{ status: string, data: Ticket[] }> {
    return this.http.get<{ status: string, data: Ticket[] }>(`${this.apiUrl}/tickets`);
  }

  createTicket(data: any): Observable<{ status: string, data: Ticket }> {
    // Check if it's the old signature (alertId as string) or new one (data object)
    if (typeof data === 'string') {
      return this.http.post<{ status: string, data: Ticket }>(`${this.apiUrl}/tickets`, { alertId: data });
    }
    return this.http.post<{ status: string, data: Ticket }>(`${this.apiUrl}/tickets/manual`, data);
  }


  updateTicketStatus(ticketId: string, status: string, resolutionReport?: any): Observable<{ status: string, data: Ticket }> {
    const payload: any = { status };
    if (resolutionReport) {
      payload.resolutionReport = resolutionReport;
    }
    return this.http.patch<{ status: string, data: Ticket }>(`${this.apiUrl}/tickets/${ticketId}/status`, payload);
  }

  assignTicket(ticketId: string, technicianId: string): Observable<{ status: string, data: Ticket }> {
    return this.http.patch<{ status: string, data: Ticket }>(`${this.apiUrl}/tickets/${ticketId}/assign`, { technicianId });
  }

  getTechnicians(): Observable<{ status: string, data: { users: any[] } }> {
    return this.http.get<{ status: string, data: { users: any[] } }>(`${this.apiUrl}/admin/users`);
  }
}

