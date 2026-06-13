/* ==========================================
   GLOBAL APPLICATION STATE
========================================== */

export const state = {

    /* ======================================
       RAW DATA
    ====================================== */

    salesData: [],

    adsData: [],

    /* ======================================
       FILTERED DATA
    ====================================== */

    filteredSalesData: [],

    filteredAdsData: [],

    /* ======================================
       FILTERS
    ====================================== */

    filters: {

        month: 'latest',

        year: 'latest',

        fromDate: '',

        toDate: '',

        search: ''

    },

    /* ======================================
       DASHBOARD OUTPUTS
    ====================================== */

    kpis: {

        gmv: 0,

        units: 0,

        orders: 0,

        asp: 0,

        adSpend: 0,

        revenue: 0,

        roi: 0,

        ctr: 0,

        cvr: 0

    },

    dailySales: [],

    monthlyPerformance: [],

    topStates: [],

    monthlyAdsPerformance: [],

    /* ======================================
       APP STATUS
    ====================================== */

    loading: false,

    initialized: false,

    lastRefresh: null

};

/* ==========================================
   GETTERS
========================================== */

export function getState() {

    return state;

}

export function getSalesData() {

    return state.salesData;

}

export function getAdsData() {

    return state.adsData;

}

export function getFilters() {

    return state.filters;

}

export function getKPIs() {

    return state.kpis;

}

/* ==========================================
   RAW DATA SETTERS
========================================== */

export function setSalesData(data) {

    state.salesData = Array.isArray(data)
        ? data
        : [];

}

export function setAdsData(data) {

    state.adsData = Array.isArray(data)
        ? data
        : [];

}

/* ==========================================
   FILTERED DATA SETTERS
========================================== */

export function setFilteredSalesData(data) {

    state.filteredSalesData = Array.isArray(data)
        ? data
        : [];

}

export function setFilteredAdsData(data) {

    state.filteredAdsData = Array.isArray(data)
        ? data
        : [];

}

/* ==========================================
   FILTER MANAGEMENT
========================================== */

export function updateFilter(key, value) {

    if (!(key in state.filters)) {

        return;

    }

    state.filters[key] = value;

}

export function updateFilters(filters = {}) {

    state.filters = {

        ...state.filters,

        ...filters

    };

}

export function resetFilters() {

    state.filters = {

        month: 'latest',

        year: 'latest',

        fromDate: '',

        toDate: '',

        search: ''

    };

}

/* ==========================================
   KPI STATE
========================================== */

export function setKPIs(kpis = {}) {

    state.kpis = {

        ...state.kpis,

        ...kpis

    };

}

/* ==========================================
   REPORT STATE
========================================== */

export function setDailySales(data) {

    state.dailySales = Array.isArray(data)
        ? data
        : [];

}

export function setMonthlyPerformance(data) {

    state.monthlyPerformance = Array.isArray(data)
        ? data
        : [];

}

export function setTopStates(data) {

    state.topStates = Array.isArray(data)
        ? data
        : [];

}

export function setMonthlyAdsPerformance(data) {

    state.monthlyAdsPerformance = Array.isArray(data)
        ? data
        : [];

}

/* ==========================================
   LOADING
========================================== */

export function setLoading(value) {

    state.loading = Boolean(value);

}

/* ==========================================
   APP INITIALIZATION
========================================== */

export function setInitialized(value) {

    state.initialized = Boolean(value);

}

/* ==========================================
   LAST REFRESH
========================================== */

export function setLastRefresh(date = new Date()) {

    state.lastRefresh = date;

}

/* ==========================================
   DASHBOARD RESET
========================================== */

export function resetDashboardData() {

    state.kpis = {

        gmv: 0,

        units: 0,

        orders: 0,

        asp: 0,

        adSpend: 0,

        revenue: 0,

        roi: 0,

        ctr: 0,

        cvr: 0

    };

    state.dailySales = [];

    state.monthlyPerformance = [];

    state.topStates = [];

    state.monthlyAdsPerformance = [];

}

/* ==========================================
   FULL RESET
========================================== */

export function resetState() {

    state.salesData = [];

    state.adsData = [];

    state.filteredSalesData = [];

    state.filteredAdsData = [];

    resetFilters();

    resetDashboardData();

    state.loading = false;

    state.initialized = false;

    state.lastRefresh = null;

}