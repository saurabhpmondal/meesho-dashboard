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
      // Look for custom style building entry methods or core fallbacks
      const buildStylesMethod = StylesModule.buildStyles || 
                                StylesModule.initStyles ||
                                (StylesModule.topStylesEngine && StylesModule.topStylesEngine.buildStyles);

      if (typeof buildStylesMethod === 'function') {
        await buildStylesMethod(elementWrapper);
      } else {
        const rawEngine = StylesModule.topStylesEngine || StylesModule.default || Object.values(StylesModule)[0];
        let targetInstance = typeof rawEngine === 'function' ? new rawEngine() : rawEngine;

        if (targetInstance && typeof targetInstance.buildStyles === 'function') {
          await targetInstance.buildStyles(elementWrapper);
        } else if (targetInstance && typeof targetInstance.render === 'function') {
          await targetInstance.render(elementWrapper);
        } else if (targetInstance && typeof targetInstance.init === 'function') {
          await targetInstance.init(elementWrapper);
        } else {
          elementWrapper.innerHTML = '<p>The specific top catalog performance tracking module failed to compile links.</p>';
        }
      }
    } catch (error) {
      console.error("Styles Engine Critical Execution Error:", error);
      elementWrapper.innerHTML = '<p>An operational error occurred while extracting catalog performance records.</p>';
    }
  }
}
