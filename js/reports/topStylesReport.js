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
      // Resolve the actual engine instance dynamically from the wildcard namespace bundle
      const topStylesEngine = StylesModule.topStylesEngine || StylesModule.default || StylesModule.TopStylesLogicEngine || Object.values(StylesModule)[0];
      
      if (topStylesEngine) {
        if (typeof topStylesEngine.render === 'function') {
          await topStylesEngine.render(elementWrapper);
        } else if (typeof topStylesEngine === 'function') {
          const engineInstance = new topStylesEngine();
          await engineInstance.render(elementWrapper);
        } else {
          elementWrapper.innerHTML = '<p>Error: Resolved styles engine does not expose a render method context.</p>';
        }
      } else {
        elementWrapper.innerHTML = '<p>The specific top catalog performance tracking module failed to compile links.</p>';
      }
    } catch (error) {
      console.error("Styles Engine Critical Execution Error:", error);
      elementWrapper.innerHTML = '<p>An operational error occurred while extracting catalog performance records.</p>';
    }
  }
}
