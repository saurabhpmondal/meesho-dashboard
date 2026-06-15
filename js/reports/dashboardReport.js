/* ==========================================
   DASHBOARD REPORT
========================================== */

import {

    applyFilters

} from '../services/filterService.js';

import {

    buildKPIs

} from '../engines/dashboard/kpiEngine.js';

import {

    buildDailySales

} from '../engines/dashboard/dailySalesEngine.js';

import {

    buildMonthlyPerformance

} from '../engines/dashboard/monthlyPerformanceEngine.js';

import {

    buildTopStates

} from '../engines/dashboard/topStatesEngine.js';

import {

    buildMonthlyAdsPerformance

} from '../engines/dashboard/monthlyAdsPerformanceEngine.js';

import {

    buildTopStyles

} from '../engines/dashboard/topStylesEngine.js';

import {

    renderKPICards

} from '../components/kpiCards.js';

import {

    renderDailySalesReport

} from './dailySalesReport.js';

import {

    renderMonthlyPerformanceReport

} from './monthlyPerformanceReport.js';

import {

    renderTopStatesReport

} from './topStatesReport.js';

import {

    renderMonthlyAdsPerformanceReport

} from './monthlyAdsPerformanceReport.js';

import {

    renderTopStylesReport

} from './topStylesReport.js';

/* ==========================================
   DASHBOARD REPORT
========================================== */

export const dashboardReport = {

    async render() {

        await renderDashboard();

    }

};

/* ==========================================
   RENDER DASHBOARD
========================================== */

export async function renderDashboard() {

    try {

        /* ==============================
           APPLY GLOBAL FILTERS
        ============================== */

        applyFilters();

        /* ==============================
           BUILD ENGINES
        ============================== */

        buildKPIs();

        buildDailySales();

        buildMonthlyPerformance();

        buildTopStates();

        buildMonthlyAdsPerformance();

        buildTopStyles();

        /* ==============================
           RENDER REPORTS
        ============================== */

        renderKPICards();

        renderDailySalesReport();

        renderMonthlyPerformanceReport();

        renderTopStatesReport();

        renderMonthlyAdsPerformanceReport();

        renderTopStylesReport();

    } catch (error) {

        console.error(

            'Dashboard Render Failed',

            error

        );

    }

}

/* ==========================================
   REFRESH DASHBOARD
========================================== */

export async function refreshDashboardReport() {

    await renderDashboard();

}