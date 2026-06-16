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
      // 1. Locate the engine inside the module exports
      const rawEngine = KPIModule.kpiEngine || 
                        KPIModule.default || 
                        window.kpiEngine || 
                        window.kpiEngineInstance || 
                        (typeof KPIModule === 'object' && Object.values(KPIModule).find(v => typeof v === 'object' || typeof v === 'function'));

      if (!rawEngine) {
        viewElement.innerHTML = '<p>Error: Could not locate kpiEngine module file exports.</p>';
        return;
      }

      // 2. Resolve target execution instance block
      let targetInstance = rawEngine;
      if (typeof rawEngine === 'function') {
        targetInstance = new rawEngine();
      }

      // ==========================================
      // CRITICAL DEBUGGING SNIPPET: Inspect keys
      // ==========================================
      console.log("=== DEBUGGING KPI ENGINE STRUCTURAL KEYS ===");
      console.log("Raw Export Keys:", Object.keys(KPIModule));
      console.log("Engine Instance Keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(targetInstance)));
      console.log("Engine Direct Keys:", Object.keys(targetInstance));
      console.log("============================================");

      // 3. Match execution entry points
      let executed = false;
      const explicitMethods = ['render', 'init', 'initEngine', 'mount'];
      for (const methodName of explicitMethods) {
        if (targetInstance && typeof targetInstance[methodName] === 'function') {
          await targetInstance[methodName](viewElement);
          executed = true;
          break;
        }
      }

      if (!executed) {
        if (typeof targetInstance === 'function') {
          await targetInstance(viewElement);
        } else {
          viewElement.innerHTML = `
            <div style="padding: 1rem; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
              <h4>Data Rendering Point Mismatch</h4>
              <p>The layout engine is loaded, but it uses an unrecognized execution method name.</p>
              <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #555;">Please open your browser console logs and share the printed engine instance keys.</p>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
