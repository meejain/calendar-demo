// add delayed functionality here
import { sampleRUM } from './aem.js';
import { loadrrule } from '../templates/calendar/calendar.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// Script for Full Calendar
// check if windows location contains calendar
if (window.location.pathname.includes('/calendar')) {
  loadrrule();
}
