import { topStylesEngine } from '../engines/dashboard/topStylesEngine.js';

export class TopStylesReport {
  constructor() {
    this.container = null;
  }

  async init(targetContainer) {
    this.container = targetContainer;
    this.renderLayout();
    
    const styleViewGrid = this.container.querySelector('#styles-engine-viewport');
    await this.loadStylesMatrix(styleViewGrid);
  }

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

  async loadStylesMatrix(elementWrapper) {
    elementWrapper.innerHTML = '<div class="loading-spinner">Compiling Variant Conversion Data Sheets...</div>';
    try {
      if (topStylesEngine && typeof topStylesEngine.render === 'function') {
        await topStylesEngine.render(elementWrapper);
      } else {
        elementWrapper.innerHTML = '<p>The specific top catalog performance tracking module failed to compile links.</p>';
      }
    } catch (error) {
      console.error("Styles Engine Critical Execution Error:", error);
      elementWrapper.innerHTML = '<p>An operational error occurred while extracting catalog performance records.</p>';
    }
  }
}
