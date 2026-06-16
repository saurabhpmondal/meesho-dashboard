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
      // 1. Resolve the raw engine object or class from the module exports
      const rawEngine = StylesModule.topStylesEngine || StylesModule.default || StylesModule.TopStylesLogicEngine || Object.values(StylesModule)[0];
      
      if (!rawEngine) {
        elementWrapper.innerHTML = '<p>The specific top catalog performance tracking module failed to compile links.</p>';
        return;
      }

      // 2. Safely get an executable instance (handle object vs class constructor)
      let targetInstance = rawEngine;
      if (typeof rawEngine === 'function') {
        targetInstance = new rawEngine();
      }

      // 3. Dynamically scan and execute the correct UI display method hook
      if (typeof targetInstance.render === 'function') {
        await targetInstance.render(elementWrapper);
      } else if (typeof targetInstance.init === 'function') {
        await targetInstance.init(elementWrapper);
      } else if (typeof targetInstance.initEngine === 'function') {
        await targetInstance.initEngine(elementWrapper);
      } else if (typeof targetInstance.mount === 'function') {
        await targetInstance.mount(elementWrapper);
      } else {
        // Fallback: search for alternative method descriptors
        const availableMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(targetInstance))
          .concat(Object.keys(targetInstance))
          .filter(prop => typeof targetInstance[prop] === 'function' && prop !== 'constructor');
          
        if (availableMethods.length > 0) {
          console.log(`TopStylesReport: Found alternative initialization method: ${availableMethods[0]}`);
          await targetInstance[availableMethods[0]](elementWrapper);
        } else {
          elementWrapper.innerHTML = '<p>Error: Resolved styles engine does not expose an initialization method context.</p>';
        }
      }
    } catch (error) {
      console.error("Styles Engine Critical Execution Error:", error);
      elementWrapper.innerHTML = '<p>An operational error occurred while extracting catalog performance records.</p>';
    }
  }
}
