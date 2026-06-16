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
   * Includes standard fallback class structures to accommodate your original elements.
   */
  renderLayout() {
    this.container.innerHTML = `
      <div class="dashboard-report-layout">
        <div id="dashboard-filter-bar" class="filter-bar-section"></div>
        
        <div id="dashboard-main-view" class="metrics-content-grid dashboard-container dashboard-wrapper">
          <div id="kpi-container" class="kpi-grid"></div>
          <div id="sales-container" class="sales-grid"></div>
          <div id="ads-container" class="ads-grid"></div>
        </div>
      </div>
    `;
  }

  /**
   * Fires active background calculation aggregation data processes.
   * @param {HTMLElement} viewElement 
   */
  async refreshData(viewElement) {
    if (!viewElement) return;
    
    try {
      // Direct lookup to find your custom exported buildKPIs method or standard fallbacks
      const buildMethod = KPIModule.buildKPIs || 
                          (KPIModule.kpiEngine && KPIModule.kpiEngine.buildKPIs) || 
                          (KPIModule.default && KPIModule.default.buildKPIs);

      if (typeof buildMethod === 'function') {
        // Run your engine's original layout rendering process directly on the target frame view
        await buildMethod(viewElement);
        
        // COMPATIBILITY FALLBACK FALL-THROUGH: 
        // If your engine bypasses the argument and strictly targets global page IDs instead,
        // we trigger it a second time globally now that the inner html template nodes are fully mounted above.
        if (viewElement.innerHTML.includes('Loading Analytical Performance Metrics...')) {
          await buildMethod();
        }
      } else {
        const rawEngine = KPIModule.kpiEngine || KPIModule.default || Object.values(KPIModule)[0];
        let targetInstance = typeof rawEngine === 'function' ? new rawEngine() : rawEngine;

        if (targetInstance && typeof targetInstance.buildKPIs === 'function') {
          await targetInstance.buildKPIs(viewElement);
        } else if (targetInstance && typeof targetInstance.render === 'function') {
          await targetInstance.render(viewElement);
        }
      }
      
      // Clean up the temporary loading text fallback safely if the engine populated content successfully
      if (viewElement.innerHTML.includes('Loading Analytical Performance Metrics...')) {
        viewElement.innerHTML = `
          <div class="no-data-notice" style="padding: 2rem; text-align: center; color: var(--text-muted, #666);">
             <p>Analytics initialization executed. Please double-check if data sheet sync handles rendering properties.</p>
          </div>
        `;
      }
    } catch (error) {
      console.error("DashboardReport Execution Halt Failure:", error);
      viewElement.innerHTML = '<p>Data aggregation execution failed during compilation process structures.</p>';
    }
  }
}
