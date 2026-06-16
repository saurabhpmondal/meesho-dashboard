/* ==========================================
   APP ENTRY POINT
========================================== */

import {

    DATA_SOURCES

} from '../config/appConfig.js';

import {

    setSalesData,
    setAdsData,
    setMasterData,
    setFilteredSalesData,
    setFilteredAdsData,
    updateFilters,
    setInitialized,
    setLastRefresh

} from './state.js';

import {

    initializeRegistry,
    registerReport,
    refreshDashboard,
    hideLoading,
    showLoading

} from './registry.js';

import {

    loadCSV

} from '../services/csvLoader.js';

import {

    normalizeSalesData,
    normalizeAdsData,
    normalizeMasterData,
    getLatestMonthYear

} from '../utils/dateUtils.js';

import {

    dashboardReport

} from '../reports/dashboardReport.js';

/* ==========================================
   DOM
========================================== */

let monthFilter;

let yearFilter;

let fromDate;

let toDate;

let globalSearch;

/* ==========================================
   INIT APP
========================================== */

async function initializeApp() {

    try {

        showLoading();

        cacheDom();

        console.log(
            'Loading Sales Data...'
        );

        const salesData =
            await loadCSV(
                DATA_SOURCES.SALES_CSV
            );

        console.log(
            'Loading Ads Data...'
        );

        const adsData =
            await loadCSV(
                DATA_SOURCES.ADS_CSV
            );

        console.log(
            'Loading Master Data...'
        );

        const masterData =
            await loadCSV(
                DATA_SOURCES.MASTER_CSV
            );

        const normalizedSales =
            normalizeSalesData(
                salesData
            );

        const normalizedAds =
            normalizeAdsData(
                adsData
            );

        const normalizedMaster =
            normalizeMasterData(
                masterData
            );

        /* ==============================
           STORE DATA
        ============================== */

        setSalesData(
            normalizedSales
        );

        setAdsData(
            normalizedAds
        );

        setMasterData(
            normalizedMaster
        );

        /* ==============================
           DEFAULT FILTERED DATA
        ============================== */

        setFilteredSalesData(
            normalizedSales
        );

        setFilteredAdsData(
            normalizedAds
        );

        /* ==============================
           FILTERS
        ============================== */

        initializeFilters(
            normalizedSales
        );

        initializeEvents();

        /* ==============================
           REPORT REGISTRY
        ============================== */

        initializeRegistry();

        registerDashboard();

        setInitialized(
            true
        );

        setLastRefresh(
            new Date()
        );

        await refreshDashboard();

        console.log(
            'Dashboard Ready'
        );

        console.log(

            'Master Records:',

            normalizedMaster.length

        );

    } catch (error) {

        console.error(

            'App Initialization Failed',

            error

        );

        alert(
            'Failed to load dashboard data.'
        );

    } finally {

        hideLoading();

    }

}

/* ==========================================
   CACHE DOM
========================================== */

function cacheDom() {

    monthFilter =
        document.getElementById(
            'monthFilter'
        );

    yearFilter =
        document.getElementById(
            'yearFilter'
        );

    fromDate =
        document.getElementById(
            'fromDate'
        );

    toDate =
        document.getElementById(
            'toDate'
        );

    globalSearch =
        document.getElementById(
            'globalSearch'
        );

}

/* ==========================================
   REGISTER REPORTS
========================================== */

function registerDashboard() {

    registerReport(

        'dashboard',

        dashboardReport

    );

}

/* ==========================================
   FILTER INIT
========================================== */

function initializeFilters(

    salesData

) {

    const months =
        new Map();

    const years =
        new Set();

    salesData.forEach(

        row => {

            months.set(

                row.month,

                row.monthName

            );

            years.add(

                row.year

            );

        }

    );

    buildMonthFilter(
        months
    );

    buildYearFilter(
        years
    );

    const latest =
        getLatestMonthYear(
            salesData
        );

    if (!latest) {

        return;

    }

    monthFilter.value =
        latest.month;

    yearFilter.value =
        latest.year;

    updateFilters({

        month:
            latest.month,

        year:
            latest.year

    });

}

/* ==========================================
   MONTH FILTER
========================================== */

function buildMonthFilter(

    monthMap

) {

    const months =
        [...monthMap.entries()]

            .sort(

                (a, b) =>

                    a[0] - b[0]

            );

    months.forEach(

        ([month, label]) => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                month;

            option.textContent =
                label;

            monthFilter.appendChild(
                option
            );

        }

    );

}

/* ==========================================
   YEAR FILTER
========================================== */

function buildYearFilter(

    yearSet

) {

    const years =
        [...yearSet]

            .sort(

                (a, b) =>

                    b - a

            );

    years.forEach(

        year => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                year;

            option.textContent =
                year;

            yearFilter.appendChild(
                option
            );

        }

    );

}

/* ==========================================
   EVENTS
========================================== */

function initializeEvents() {

    monthFilter.addEventListener(

        'change',

        handleFilterChange

    );

    yearFilter.addEventListener(

        'change',

        handleFilterChange

    );

    fromDate.addEventListener(

        'change',

        handleFilterChange

    );

    toDate.addEventListener(

        'change',

        handleFilterChange

    );

    globalSearch.addEventListener(

        'input',

        debounce(

            handleFilterChange,

            300

        )

    );

}

/* ==========================================
   FILTER CHANGE
========================================== */

async function handleFilterChange() {

    updateFilters({

        month:
            monthFilter.value,

        year:
            yearFilter.value,

        fromDate:
            fromDate.value,

        toDate:
            toDate.value,

        search:
            globalSearch.value.trim()

    });

    await refreshDashboard();

}

/* ==========================================
   DEBOUNCE
========================================== */

function debounce(

    callback,

    delay = 300

) {

    let timeout;

    return (...args) => {

        clearTimeout(
            timeout
        );

        timeout =
            setTimeout(

                () => {

                    callback(
                        ...args
                    );

                },

                delay

            );

    };

}

/* ==========================================
   BOOT
========================================== */

document.addEventListener(

    'DOMContentLoaded',

    async () => {

        await initializeApp();

    }

);