import { TABS_CONFIG, DEFAULT_TAB_ID } from '../config/tabsConfig.js';
import { TabsBar } from '../components/tabsBar.js';
import { registry } from './registry.js';

class AppController {
  constructor() {
    this.activeTabId = DEFAULT_TAB_ID;
    this.tabsBarComponent = null;
    this.navContainer = null;
    this.viewContainer = null;
  }

  init() {
    this.navContainer = document.getElementById('navigation-wrapper');
    this.viewContainer = document.getElementById('report-view-container');
    
    if (!this.navContainer || !this.viewContainer) {
      console.error("AppController: Required base DOM scaffolding structural elements missing.");
      return;
    }
    
    this.tabsBarComponent = new TabsBar((tabId) => this.switchTab(tabId));
    this.tabsBarComponent.init(this.navContainer, this.activeTabId);
    
    this.renderActiveReport();
  }

  switchTab(tabId) {
    this.activeTabId = tabId;
    this.renderActiveReport();
  }

  renderActiveReport() {
    this.viewContainer.innerHTML = '';
    
    const activeConfig = TABS_CONFIG.find(tab => tab.id === this.activeTabId);
    if (!activeConfig) {
      console.error(`AppController: Tab ID context "${this.activeTabId}" does not exist.`);
      return;
    }
    
    const reportInstance = registry.get(activeConfig.reportClass);
    if (reportInstance && typeof reportInstance.init === 'function') {
      reportInstance.init(this.viewContainer);
    } else {
      this.viewContainer.innerHTML = `
        <div class="error-view-state">
          <h3>View Rendering Error</h3>
          <p>The report engine component could not be resolved or initialized.</p>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
