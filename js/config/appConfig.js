/* ==========================================
   APPLICATION CONFIGURATION
========================================== */

export const APP_CONFIG = {

    APP_NAME: 'Meesho Sales & Ads Dashboard',

    VERSION: '1.0.0',

    DEFAULT_CURRENCY: '₹',

    DATE_FORMAT: 'YYYY-MM-DD'

};

/* ==========================================
   DATA SOURCES
========================================== */

export const DATA_SOURCES = {

    SALES_CSV:
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVAyWN9Q1IBhh1oC9W5YVAQZYqL7RyxaZUuPUbeJ6vaqtEQDTUYmXraBzHuqSVnj7ynO5xkXA9vuuu/pub?gid=328436164&single=true&output=csv',

    ADS_CSV:
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVAyWN9Q1IBhh1oC9W5YVAQZYqL7RyxaZUuPUbeJ6vaqtEQDTUYmXraBzHuqSVnj7ynO5xkXA9vuuu/pub?gid=8523756&single=true&output=csv'

};

/* ==========================================
   MONTH CONFIG
========================================== */

export const MONTHS = [

    {
        value: 1,
        shortName: 'Jan',
        fullName: 'January'
    },

    {
        value: 2,
        shortName: 'Feb',
        fullName: 'February'
    },

    {
        value: 3,
        shortName: 'Mar',
        fullName: 'March'
    },

    {
        value: 4,
        shortName: 'Apr',
        fullName: 'April'
    },

    {
        value: 5,
        shortName: 'May',
        fullName: 'May'
    },

    {
        value: 6,
        shortName: 'Jun',
        fullName: 'June'
    },

    {
        value: 7,
        shortName: 'Jul',
        fullName: 'July'
    },

    {
        value: 8,
        shortName: 'Aug',
        fullName: 'August'
    },

    {
        value: 9,
        shortName: 'Sep',
        fullName: 'September'
    },

    {
        value: 10,
        shortName: 'Oct',
        fullName: 'October'
    },

    {
        value: 11,
        shortName: 'Nov',
        fullName: 'November'
    },

    {
        value: 12,
        shortName: 'Dec',
        fullName: 'December'
    }

];

/* ==========================================
   SEARCH CONFIG
========================================== */

export const SEARCH_FIELDS = [

    'sub_order_no',

    'catalog_id',

    'customer_state',

    'sku',

    'packet_id',

    /* Future Ready */

    'erp_sku',

    'erp_status'

];

/* ==========================================
   KPI DEFINITIONS
========================================== */

export const KPI_CONFIG = [

    {
        key: 'gmv',
        label: 'GMV',
        className: 'kpi-gmv'
    },

    {
        key: 'units',
        label: 'Units',
        className: 'kpi-units'
    },

    {
        key: 'orders',
        label: 'Orders',
        className: 'kpi-orders'
    },

    {
        key: 'asp',
        label: 'ASP',
        className: 'kpi-asp'
    },

    {
        key: 'adSpend',
        label: 'Ad Spend',
        className: 'kpi-spend'
    },

    {
        key: 'revenue',
        label: 'Revenue',
        className: 'kpi-revenue'
    },

    {
        key: 'roi',
        label: 'ROI',
        className: 'kpi-roi'
    },

    {
        key: 'ctr',
        label: 'CTR',
        className: 'kpi-ctr'
    },

    {
        key: 'cvr',
        label: 'CVR',
        className: 'kpi-cvr'
    }

];

/* ==========================================
   REPORTS
========================================== */

export const REPORTS = {

    DAILY_SALES: 'dailySales',

    MONTHLY_PERFORMANCE: 'monthlyPerformance',

    TOP_STATES: 'topStates'

};

/* ==========================================
   SALES COLUMN MAPPING
========================================== */

export const SALES_COLUMNS = {

    DATE:
        'order_date',

    ORDER_ID:
        'sub_order_no',

    CATALOG_ID:
        'catalog_id',

    STATE:
        'customer_state',

    SKU:
        'sku',

    QUANTITY:
        'quantity',

    GMV:
        'supplier_listed_price_(incl._gst_+_commission)',

    PACKET_ID:
        'packet_id'

};

/* ==========================================
   ADS COLUMN MAPPING
========================================== */

export const ADS_COLUMNS = {

    MONTH:
        'month',

    YEAR:
        'year',

    SPEND:
        'ads_spend',

    REVENUE:
        'revenue',

    VIEWS:
        'views',

    CLICKS:
        'clicks',

    ORDERS:
        'orders',

    ROI:
        'roi'

};

/* ==========================================
   TABLE SETTINGS
========================================== */

export const TABLE_CONFIG = {

    TOP_STATES_LIMIT: 10,

    DAILY_SALES_SORT: 'DESC',

    MONTHLY_SORT: 'DESC'

};

/* ==========================================
   APP DEFAULTS
========================================== */

export const DEFAULT_FILTERS = {

    month: 'latest',

    year: 'latest',

    fromDate: '',

    toDate: '',

    search: ''

};