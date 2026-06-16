import { DashboardReport } from '../reports/dashboardReport.js';
import { TopStylesReport } from '../reports/topStylesReport.js';

class ComponentRegistry {
  constructor() {
    this._registry = new Map();
    this._initRegistry();
  }

  _initRegistry() {
    this._registry.set('DashboardReport', new DashboardReport());
    this._registry.set('TopStylesReport', new TopStylesReport());
  }

  get(key) {
    if (!this._registry.has(key)) {
      console.warn(`ComponentRegistry: Instance for key "${key}" not found.`);
      return null;
    }
    return this._registry.get(key);
  }
}

export const registry = new ComponentRegistry();
