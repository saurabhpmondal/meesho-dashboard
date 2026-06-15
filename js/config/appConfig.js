/* ==========================================
   APPLICATION CONFIGURATION
========================================== */

export const APP_CONFIG = {

    APP_NAME: 'Meesho Sales & Ads Dashboard',

    VERSION: '1.1.0',

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
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVAyWN9Q1IBhh1oC9W5YVAQZYqL7RyxaZUuPUbeJ6vaqtEQDTUYmXraBzHuqSVnj7ynO5xkXA9vuuu/pub?gid=8523756&single=true&output=csv',

    MASTER_CSV:
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVAyWN9Q1IBhh1oC9W5YVAQZYqL7RyxaZUuPUbeJ6vaqtEQDTUYmXraBzHuqSVnj7ynO5xkXA9vuuu/pub?gid=1659451695&single=true&output=csv'

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

    'product_name',

    'size',

    'erp_sku',

    'erp_status',

    'erpsku',

    'sellersku'

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
        key: 'roi',
        label: 'ROI',
        className: 'kpi-roi'
    }

];

/* ==========================================
   REPORTS
========================================== */

export const REPORTS = {

    DAILY_SALES: 'dailySales',

    MONTHLY_PERFORMANCE: 'monthlyPerformance',

    TOP_STATES: 'topStates',

    MONTHLY_ADS_PERFORMANCE: 'monthlyAdsPerformance',

    TOP_STYLES: 'topStyles'

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

    PRODUCT_NAME:
        'product_name',

    SIZE:
        'size',

    QUANTITY:
        'quantity',

    GMV:
        'supplier_listed_price_(incl._gst_+_commission)',

    PACKET_ID:
        'packet_id',

    CREDIT_REASON:
        'reason_for_credit_entry'

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
   MASTER COLUMN MAPPING
========================================== */

export const MASTER_COLUMNS = {

    LIVE_DATE:
        'live_date',

    ERP_LAUNCH_DATE:
        'erp_launch_date',

    CATEGORY:
        'category',

    SELLER_SKU:
        'sellersku',

    ERP_SKU:
        'erpsku',

    BRAND:
        'brand',

    ERP_STATUS:
        'erp_status',

    CATALOG_ID:
        'catalog_id',

    PRODUCT_ID:
        'product_id',

    MRP:
        'mrp',

    TP:
        'tp'

};

/* ==========================================
   TABLE SETTINGS
========================================== */

export const TABLE_CONFIG = {

    TOP_STATES_LIMIT: 10,

    TOP_STYLES_LIMIT: 100,

    DAILY_SALES_SORT: 'ASC',

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