/**
 * ┌─────────────────────────────────────────────────────────┐
 *  Leads Handlers — CRUD for leads
 * └─────────────────────────────────────────────────────────┘
 *
 * Full CRUD endpoints for the Lead Management page.
 *
 *   GET    /leads          → List all leads (with search, filter, pagination)
 *   GET    /leads/:id      → Get single lead
 *   POST   /leads          → Create a new lead
 *   PUT    /leads/:id      → Update a lead
 *   DELETE /leads/:id      → Delete a lead
 *
 * QUERY PARAMETERS (GET /leads):
 *   ?search=arjun          → Search by name, email, or company
 *   ?status=Qualified      → Filter by status
 *   ?source=LinkedIn       → Filter by source
 *   ?page=1&limit=10       → Pagination
 */

import { http, HttpResponse, delay } from 'msw';
import { leads } from '../db';
import type { Lead } from '../db';

const BASE = '*/api';

export const leadsHandlers = [

  /* ── GET /leads (list with filters + pagination) ── */
  http.get(`${BASE}/leads`, async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || '';
    const source = url.searchParams.get('source') || '';
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    let filtered = [...leads];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.email.toLowerCase().includes(search) ||
          l.company.toLowerCase().includes(search),
      );
    }

    // Status filter
    if (status && status !== 'All') {
      filtered = filtered.filter((l) => l.status === status);
    }

    // Source filter
    if (source && source !== 'All') {
      filtered = filtered.filter((l) => l.source === source);
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      data: {
        data: paged,
        total,
        page,
        limit,
        totalPages,
      },
    });
  }),

  /* ── GET /leads/:id ── */
  http.get(`${BASE}/leads/:id`, async ({ params }) => {
    await delay(200);

    const lead = leads.find((l) => l.id === Number(params.id));

    if (!lead) {
      return HttpResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json({ success: true, data: lead });
  }),

  /* ── POST /leads ── */
  http.post(`${BASE}/leads`, async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as Partial<Lead>;

    if (!body.name || !body.email) {
      return HttpResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 },
      );
    }

    const newLead: Lead = {
      id: Math.max(...leads.map((l) => l.id), 0) + 1,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      company: body.company || '',
      designation: body.designation || '',
      source: body.source || 'Website',
      status: body.status || 'New',
      score: body.score || 0,
      assignedTo: body.assignedTo || '-',
      createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastActivity: 'Just now',
    };

    leads.unshift(newLead); // add to start

    return HttpResponse.json(
      { success: true, data: newLead, message: 'Lead created' },
      { status: 201 },
    );
  }),

  /* ── PUT /leads/:id ── */
  http.put(`${BASE}/leads/:id`, async ({ params, request }) => {
    await delay(300);

    const idx = leads.findIndex((l) => l.id === Number(params.id));

    if (idx === -1) {
      return HttpResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Partial<Lead>;
    leads[idx] = { ...leads[idx], ...body, id: leads[idx].id };

    return HttpResponse.json({
      success: true,
      data: leads[idx],
      message: 'Lead updated',
    });
  }),

  /* ── DELETE /leads/:id ── */
  http.delete(`${BASE}/leads/:id`, async ({ params }) => {
    await delay(300);

    const idx = leads.findIndex((l) => l.id === Number(params.id));

    if (idx === -1) {
      return HttpResponse.json(
        { success: false, message: 'Lead not found' },
        { status: 404 },
      );
    }

    leads.splice(idx, 1);

    return HttpResponse.json({
      success: true,
      message: 'Lead deleted',
    });
  }),
];
