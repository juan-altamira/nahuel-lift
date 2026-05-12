import type { APIRoute } from 'astro';
import { GET as getSummary, POST as postSummary } from '../analytics/summary.json';

export const prerender = false;

export const GET: APIRoute = (context) => getSummary(context);

export const POST: APIRoute = (context) => postSummary(context);
