/* ==========================================
   TOP STYLES PAGE
========================================== */

import {

    applyFilters

} from '../services/filterService.js';

import {

    buildTopStyles

} from '../engines/dashboard/topStylesEngine.js';

import {

    renderTopStylesReport

} from './topStylesReport.js';

/* ==========================================
   PAGE
========================================== */

export const topStylesPage = {

    async render() {

        await renderTopStylesPage();

    }

};

/* ==========================================
   RENDER
========================================== */

export async function renderTopStylesPage() {

    try {

        applyFilters();

        buildTopStyles();

        renderTopStylesReport();

    } catch (error) {

        console.error(

            'Top Styles Page Failed',

            error

        );

    }

}