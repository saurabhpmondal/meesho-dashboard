// js/components/filterBar.js

class FilterBarComponent {
  constructor() {
    this.container = null;
    this.onFilterChangeCallback = null;
  }

  /**
   * Initializes and renders the filter bar UI layout safely.
   * @param {HTMLElement} parentElement 
   * @param {Function} onFilterChange 
   */
  init(parentElement, onFilterChange) {
    if (!parentElement) return;
    this.container = parentElement;
    this.onFilterChangeCallback = onFilterChange;
    this.render();
  }

  /**
   * Generates localized HTML elements for dropdown controls.
   */
  render() {
    this.container.innerHTML = `
      <div class="filter-bar-wrapper" style="display: flex; gap: 1rem; padding: 1rem 0; align-items: center;">
        <div class="filter-group">
          <label for="date-range-select" style="font-weight: 500; margin-right: 0.5rem;">Date Range:</label>
          <select id="date-range-select" class="filter-dropdown" style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;">
            <option value="last7">Last 7 Days</option>
            <option value="last30" selected>Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <button id="apply-filters-btn" class="filter-submit-button" style="padding: 0.5rem 1rem; background-color: #9f227e; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
          Apply Filters
        </button>
      </div>
    `;

    // Bind safe change actions
    const applyBtn = this.container.querySelector('#apply-filters-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        if (typeof this.onFilterChangeCallback === 'function') {
          this.onFilterChangeCallback();
        }
      });
    }
  }

  /**
   * Safe helper method to grab active layout filter state values.
   * @returns {Object}
   */
  getSelectedFilters() {
    const dateSelect = this.container ? this.container.querySelector('#date-range-select') : null;
    return {
      dateRange: dateSelect ? dateSelect.value : 'last30'
    };
  }
}

export const filterBar = new FilterBarComponent();
