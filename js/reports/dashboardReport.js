// js/reports/dashboardReport.js

import * as KPIModule from '../engines/dashboard/kpiEngine.js';
import { filterBar } from '../components/filterBar.js';

export class DashboardReport {
  constructor() {
    this.container = null;
  }

  /**
   * Initializes and renders the core multi-card marketplace operational dashboard.
   * @param {HTMLElement} targetContainer 
   */
  async init(targetContainer) {
    this.container = targetContainer;
    this.renderLayout();
    
    // Boot internal layout components safely
    const filterContainer = this.container.querySelector('#dashboard-filter-bar');
    const contentContainer = this.container.querySelector('#dashboard-main-view');
    
    if (filterContainer && filterBar) {
      try {
        if (typeof filterBar.init === 'function') {
          filterBar.init(filterContainer, () => this.refreshData(contentContainer));
        } else if (typeof filterBar === 'function') {
          const filterInstance = new filterBar();
          filterInstance.init(filterContainer, () => this.refreshData(contentContainer));
        }
      } catch (filterError) {
        console.warn("DashboardReport: filterBar initialization skipped:", filterError);
      }
    }
    
    await this.refreshData(contentContainer);
  }

  /**
   * Generates basic inner structure slots.
   */
  renderLayout() {
    this.container.innerHTML = `
      <div class="dashboard-report-layout">
        <div id="dashboard-filter-bar" class="filter-bar-section"></div>
        <div id="dashboard-main-view" class="metrics-content-grid"></div>
      </div>
    `;
  }

  /**
   * Fires active background calculation aggregation data processes.
   * @param {HTMLElement} viewElement 
   */
  async refreshData(viewElement) {
    if (!viewElement) return;
    
    viewElement.innerHTML = '<div class="loading-spinner">Loading Analytical Performance Metrics...</div>';
    try {
      // Direct lookups across module exports AND the global window namespace to handle non-exported setups
      const kpiEngine = KPIModule.kpiEngine || 
                        KPIModule.default || 
                        window.kpiEngine || 
                        window.kpiEngineInstance || 
                        (typeof KPIModule === 'object' && Object.values(KPIModule).find(v => typeof v === 'object' || typeof v === 'function'));

      if (!kpiEngine) {
        viewElement.innerHTML = '<p>Error mounting KPI Performance engine framework matrix.</p>';
        return;
      }

      // Check for an executable method inside an object or instance
      let executed = false;
      const executableInstance = typeof kpiEngine === 'function' ? new kpiEngine() : kpiEngine;

      // Prioritize explicit operational method matches, completely ignoring native system prototype keys
      const explicitMethods = ['render', 'init', 'initEngine', 'mount'];
      for (const methodName of explicitMethods) {
        if (executableInstance && typeof executableInstance[methodName] === 'function') {
          await executableInstance[methodName](viewElement);
          executed = true;
          break;
        }
      }

      if (!executed) {
        // If it is a completely flat functional script or simple runner configuration block
        if (typeof executableInstance === 'function') {
          await executableInstance(viewElement);
        } else {
          viewElement.innerHTML = '<p>Error: Resolved engine structure does not contain a valid UI rendering entry method.</p>';
        }
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
