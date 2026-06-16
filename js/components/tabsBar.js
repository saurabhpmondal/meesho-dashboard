import { TABS_CONFIG } from '../config/tabsConfig.js';

export class TabsBar {
  constructor(onTabChangeCallback) {
    this.container = null;
    this.onTabChange = onTabChangeCallback;
    this.activeTabId = null;
  }

  init(parentElement, initialTabId) {
    this.container = parentElement;
    this.activeTabId = initialTabId;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    const navElement = document.createElement('nav');
    navElement.className = 'tabs-navigation-bar';
    
    const ul = document.createElement('ul');
    ul.className = 'tabs-list';
    
    TABS_CONFIG.forEach(tab => {
      const li = document.createElement('li');
      li.className = `tab-item ${this.activeTabId === tab.id ? 'active' : ''}`;
      li.setAttribute('data-tab-id', tab.id);
      
      li.innerHTML = `
        <i class="tab-icon fas ${tab.icon}"></i>
        <span class="tab-label">${tab.label}</span>
      `;
      
      li.addEventListener('click', () => this.handleTabClick(tab.id));
      ul.appendChild(li);
    });
    
    navElement.appendChild(ul);
    this.container.appendChild(navElement);
  }

  handleTabClick(tabId) {
    if (this.activeTabId === tabId) return;
    
    this.activeTabId = tabId;
    
    const items = this.container.querySelectorAll('.tab-item');
    items.forEach(item => {
      if (item.getAttribute('data-tab-id') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    if (typeof this.onTabChange === 'function') {
      this.onTabChange(tabId);
    }
  }
}
