/* ==========================================
   DASHBOARD REPORT
========================================== */

import {

    applyFilters

} from '../servicesimport { kpiEngine } from '../engines/dashboard/kpiEngine.js';
import { filterBar } from '../components/filterBar.js';

export class DashboardReport {
  constructor() {
    this.container = null;
  }

  async init(targetContainer) {
    this.container = targetContainer;
    this.renderLayout();
    
    const filterContainer = this.container.querySelector('#dashboard-filter-bar');
    const contentContainer = this.container.querySelector('#dashboard-main-view');
    
    if (filterBar && typeof filterBar.init === 'function') {
      filterBar.init(filterContainer, () => this.refreshData(contentContainer));
    }
    
    await this.refreshData(contentContainer);
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="dashboard-report-layout">
        <div id="dashboard-filter-bar" class="filter-bar-section"></div>
        <div id="dashboard-main-view" class="metrics-content-grid"></div>
      </div>
    `;
  }

  async refreshData(viewElement) {
    viewElement.innerHTML = '<div class="loading-spinner">Loading Analytical Performance Metrics...</div>';
    try {
      if (kpiEngine && typeof kpiEngine.render === 'function') {
        await kpiEngine.render(viewElement);
      } else {
        viewElement.innerHTML = '<p>Error mounting KPI Performance engine framework matrix.</p>';
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
';

import {

    buildKPIs

} from '../engines/dashboard/kpiEngine.js';

import {

    buildDailySales

} from '../engines/dashboard/dailySalesEngine.js';

import {

    buildMonthlyPerformance

} from '../engines/dashboard/monthlyPerformanceEngine.js';

import {

    buildTopStates

} from '../engines/dashboard/topStatesEngine.js';

import {

    buildMonthlyAdsPerformance

} from '../engines/dashboard/monthlyAdsPerformanceEngine.js';

import {

    renderKPICards

} from '../components/kpiCards.js';

import {

    renderDailySalesReport

} from './dailySalesReport.js';

import {

    renderMonthlyPerformanceReport

} from './monthlyPerformanceReport.js';

import {

    renderTopStatesReport

} from './topStatesReport.js';

import {

    renderMonthlyAdsPerformanceReport

} from './monthlyAdsPerformanceReport.js';

/* ==========================================
   DASHBOARD REPORT
========================================== */

export const dashboardReport = {

    async render() {

        await renderDashboard();

    }

};

/* ==========================================
   RENDER DASHBOARD
========================================== */

export async function renderDashboard() {

    try {

        applyFilters();

        buildKPIs();

        buildDailySales();

        buildMonthlyPerformance();

        buildTopStates();

        buildMonthlyAdsPerformance();

        renderKPICards();

        renderDailySalesReport();

        renderMonthlyPerformanceReport();

        renderTopStatesReport();

        renderMonthlyAdsPerformanceReport();

    } catch (error) {

        console.error(

            'Dashboard Render Failed',

            error

        );

    }

}

/* ==========================================
   REFRESH DASHBOARD
========================================== */

export async function refreshDashboardReport() {

    await renderDashboard();

}