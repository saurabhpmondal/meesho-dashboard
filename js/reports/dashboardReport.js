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
      // Direct lookup to find your custom exported buildKPIs method or standard fallbacks
      const buildMethod = KPIModule.buildKPIs || 
                          (KPIModule.kpiEngine && KPIModule.kpiEngine.buildKPIs) || 
                          (KPIModule.default && KPIModule.default.buildKPIs);

      if (typeof buildMethod === 'function') {
        // Execute your engine's original layout rendering process
        await buildMethod(viewElement);
      } else {
        // If it's structured as an instantiated class with buildKPIs instead
        const rawEngine = KPIModule.kpiEngine || KPIModule.default || Object.values(KPIModule)[0];
        let targetInstance = typeof rawEngine === 'function' ? new rawEngine() : rawEngine;

        if (targetInstance && typeof targetInstance.buildKPIs === 'function') {
          await targetInstance.buildKPIs(viewElement);
        } else if (targetInstance && typeof targetInstance.render === 'function') {
          await targetInstance.render(viewElement);
        } else {
          viewElement.innerHTML = '<p>Error: Could not resolve buildKPIs or render method hook inside engine.</p>';
        }
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
