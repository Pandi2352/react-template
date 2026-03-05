/**
 * ┌──────────────────────────────────────────────────────────────┐
 *  Leads Service — API calls for Lead Management
 * └──────────────────────────────────────────────────────────────┘
 *
 * Each method maps to one REST endpoint:
 *
 *   leadsService.getAll(params)   →  GET    /leads?search=&status=&page=
 *   leadsService.getById(id)      →  GET    /leads/:id
 *   leadsService.create(data)     →  POST   /leads
 *   leadsService.update(id, data) →  PUT    /leads/:id
 *   leadsService.delete(id)       →  DELETE /leads/:id
 *
 * In development, MSW intercepts these and returns mock data.
 * In production, these go to the real backend API.
 */

import { apiClient, ENDPOINTS } from '@/api';
import type { ApiResponse, PaginatedResponse } from '@/types';

/* ── Types ── */

export type LeadSource = 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Event';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified';

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  assignedTo: string;
  createdDate: string;
  lastActivity: string;
}

export interface LeadFilters {
  search?: string;
  status?: string;
  source?: string;
  page?: number;
  limit?: number;
}

/* ── Service ── */

export const leadsService = {
  getAll(filters: LeadFilters = {}) {
    return apiClient.get<ApiResponse<PaginatedResponse<Lead>>>(ENDPOINTS.LEADS, {
      params: filters,
    });
  },

  getById(id: number) {
    return apiClient.get<ApiResponse<Lead>>(`${ENDPOINTS.LEADS}/${id}`);
  },

  create(data: Partial<Lead>) {
    return apiClient.post<ApiResponse<Lead>>(ENDPOINTS.LEADS, data);
  },

  update(id: number, data: Partial<Lead>) {
    return apiClient.put<ApiResponse<Lead>>(`${ENDPOINTS.LEADS}/${id}`, data);
  },

  delete(id: number) {
    return apiClient.delete<ApiResponse<null>>(`${ENDPOINTS.LEADS}/${id}`);
  },
};
