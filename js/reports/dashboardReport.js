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
      // 1. Resolve the raw engine object or class from the module exports
      const rawEngine = KPIModule.kpiEngine || KPIModule.default || KPIModule.KPILogicEngine || Object.values(KPIModule)[0];
      
      if (!rawEngine) {
        viewElement.innerHTML = '<p>Error mounting KPI Performance engine framework matrix.</p>';
        return;
      }

      // 2. Safely get an executable instance (handle object vs class constructor)
      let targetInstance = rawEngine;
      if (typeof rawEngine === 'function') {
        targetInstance = new rawEngine();
      }

      // 3. Dynamically scan and execute the correct UI display method hook
      if (typeof targetInstance.render === 'function') {
        await targetInstance.render(viewElement);
      } else if (typeof targetInstance.init === 'function') {
        await targetInstance.init(viewElement);
      } else if (typeof targetInstance.initEngine === 'function') {
        await targetInstance.initEngine(viewElement);
      } else if (typeof targetInstance.mount === 'function') {
        await targetInstance.mount(viewElement);
      } else {
        // Fallback: search for any available method inside the engine object that looks like an initiator
        const availableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(targetInstance))
          .concat(Object.keys(targetInstance))
          .filter(prop => typeof targetInstance[prop] === 'function' && prop !== 'constructor');
          
        if (availableMethods.length > 0) {
          console.log(`DashboardReport: Found alternative initialization method: ${availableMethods[0]}`);
          await targetInstance[availableMethods[0]](viewElement);
        } else {
          viewElement.innerHTML = '<p>Error: Resolved engine does not expose an initialization method context.</p>';
        }
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
