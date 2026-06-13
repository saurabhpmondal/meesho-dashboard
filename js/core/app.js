/* ==========================================
   APP ENTRY POINT
========================================== */

import {

    DATA_SOURCES

} from '../config/appConfig.js';

import {

    setSalesData,
    setAdsData,
    setFilteredSalesData,
    setFilteredAdsData,
    updateFilters,
    setInitialized,
    setLastRefresh

} from './state.js';

import {

    initializeRegistry,
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
    getLatestMonthYear

} from '../utils/dateUtils.js';

/* ==========================================
   DOM ELEMENTS
========================================== */

const monthFilter =
    document.getElementById('monthFilter');

const yearFilter =
    document.getElementById('yearFilter');

const fromDate =
    document.getElementById('fromDate');

const toDate =
    document.getElementById('toDate');

const globalSearch =
    document.getElementById('globalSearch');

/* ==========================================
   INITIALIZE APP
========================================== */

async function initializeApp() {

    try {

        showLoading();

        console.log(
            'Loading Sales CSV...'
        );

        const salesData =
            await loadCSV(
                DATA_SOURCES.SALES_CSV
            );

        console.log(
            'Loading Ads CSV...'
        );

        const adsData =
            await loadCSV(
                DATA_SOURCES.ADS_CSV
            );

        const normalizedSales =
            normalizeSalesData(
                salesData
            );

        const normalizedAds =
            normalizeAdsData(
                adsData
            );

        setSalesData(
            normalizedSales
        );

        setAdsData(
            normalizedAds
        );

        setFilteredSalesData(
            normalizedSales
        );

        setFilteredAdsData(
            normalizedAds
        );

        initializeFilters(
            normalizedSales
        );

        initializeEvents();

        setInitialized(
            true
        );

        setLastRefresh(
            new Date()
        );

        initializeRegistry();

        await refreshDashboard();

        console.log(
            'Dashboard Initialized'
        );

    } catch (error) {

        console.error(
            'Initialization Failed',
            error
        );

        alert(
            'Failed to load dashboard data'
        );

    } finally {

        hideLoading();

    }

}

/* ==========================================
   FILTER DROPDOWNS
========================================== */

function initializeFilters(
    salesData
) {

    const monthMap =
        new Map();

    const yearSet =
        new Set();

    salesData.forEach(row => {

        if (
            row.month &&
            row.monthName
        ) {

            monthMap.set(
                row.month,
                row.monthName
            );

        }

        if (
            row.year
        ) {

            yearSet.add(
                row.year
            );

        }

    });

    buildMonthFilter(
        monthMap
    );

    buildYearFilter(
        yearSet
    );

    const latest =
        getLatestMonthYear(
            salesData
        );

    if (
        latest
    ) {

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

}

/* ==========================================
   MONTH FILTER
========================================== */

function buildMonthFilter(
    monthMap
) {

    const sortedMonths =
        [...monthMap.entries()]
            .sort(
                (a, b) =>
                    a[0] - b[0]
            );

    sortedMonths.forEach(
        ([value, label]) => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                value;

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
   FILTER EVENTS
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
   FILTER HANDLER
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
    fn,
    delay = 300
) {

    let timer;

    return (...args) => {

        clearTimeout(
            timer
        );

        timer =
            setTimeout(
                () => fn(...args),
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