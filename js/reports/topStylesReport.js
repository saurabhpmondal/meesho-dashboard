// js/reports/topStylesReport.js

import * as StylesModule from '../engines/dashboard/topStylesEngine.js';

export class TopStylesReport {
  constructor() {
    this.container = null;
  }

  /**
   * Initializes and structures the Top Styles analytical execution viewport.
   * @param {HTMLElement} targetContainer 
   */
  async init(targetContainer) {
    this.container = targetContainer;
    this.renderLayout();
    
    const styleViewGrid = this.container.querySelector('#styles-engine-viewport');
    await this.loadStylesMatrix(styleViewGrid);
  }

  /**
   * Creates clean isolated structural wrappers for inventory ranking grids.
   */
  renderLayout() {
    this.container.innerHTML = `
      <div class="styles-report-layout">
        <div class="page-section-header">
          <h2>Catalog Demand Ranking Analysis</h2>
          <p class="section-description">High conversion variants, demand movement, and inventory sales metrics.</p>
        </div>
        <div id="styles-engine-viewport" class="styles-table-wrapper"></div>
      </div>
    `;
  }

  /**
   * Connects back to the base analytics processing layout engine rulesets.
   * @param {HTMLElement} elementWrapper 
   */
  async loadStylesMatrix(elementWrapper) {
    if (!elementWrapper) return;
    elementWrapper.innerHTML = '<div class="loading-spinner">Compiling Variant Conversion Data Sheets...</div>';
    try {
      // Direct lookups across module exports AND the global window namespace to handle non-exported setups
      const topStylesEngine = StylesModule.topStylesEngine || 
                              StylesModule.default || 
                              window.topStylesEngine || 
                              window.topStylesEngineInstance ||
                              (typeof StylesModule === 'object' && Object.values(StylesModule).find(v => typeof v === 'object' || typeof v === 'function'));

      if (!topStylesEngine) {
        elementWrapper.innerHTML = '<p>The specific top catalog performance tracking module failed to compile links.</p>';
        return;
      }

      // Check for an executable method inside an object or instance
      let executed = false;
      const executableInstance = typeof topStylesEngine === 'function' ? new topStylesEngine() : topStylesEngine;

      // Prioritize explicit operational method matches, completely ignoring native system prototype keys
      const explicitMethods = ['render', 'init', 'initEngine', 'mount'];
      for (const methodName of explicitMethods) {
        if (executableInstance && typeof executableInstance[methodName] === 'function') {
          await executableInstance[methodName](elementWrapper);
          executed = true;
          break;
        }
      }

      if (!executed) {
        if (typeof executableInstance === 'function') {
          await executableInstance(elementWrapper);
        } else {
          elementWrapper.innerHTML = '<p>Error: Resolved styles engine structure does not contain a valid UI rendering entry method.</p>';
        }
      }
    } catch (error) {
      console.error("Styles Engine Critical Execution Error:", error);
      elementWrapper.innerHTML = '<p>An operational error occurred while extracting catalog performance records.</p>';
    }
  }
}
