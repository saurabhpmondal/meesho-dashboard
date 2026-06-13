/* ==========================================
   KPI ENGINE
========================================== */

import {

    getState,
    setKPIs

} from '../../core/state.js';

import {

    calculateCTR,
    calculateCVR,
    calculateROI,
    calculateASP

} from '../../utils/calculations.js';

/* ==========================================
   BUILD KPI DATA
========================================== */

export function buildKPIs() {

    const state =
        getState();

    const sales =
        state.filteredSalesData || [];

    const ads =
        state.filteredAdsData || [];

    /* ==============================
       SALES KPIs
    ============================== */

    const gmv =
        sales.reduce(

            (total, row) =>

                total +

                Number(
                    row.gmv || 0
                ),

            0

        );

    const units =
        sales.reduce(

            (total, row) =>

                total +

                Number(
                    row.quantity || 0
                ),

            0

        );

    const orders =
        new Set(

            sales

                .map(

                    row =>
                        row.sub_order_no

                )

                .filter(Boolean)

        ).size;

    const asp =
        calculateASP(

            gmv,

            units

        );

    /* ==============================
       ADS KPIs

       Filtered ads already contains
       selected month/year data.
    ============================== */

    const adsRow =
        ads.length
            ? ads[0]
            : null;

    const adSpend =
        Number(

            adsRow?.ads_spend || 0

        );

    const revenue =
        Number(

            adsRow?.revenue || 0

        );

    const views =
        Number(

            adsRow?.views || 0

        );

    const clicks =
        Number(

            adsRow?.clicks || 0

        );

    const adOrders =
        Number(

            adsRow?.orders || 0

        );

    const roi =
        Number(

            adsRow?.roi ||

            calculateROI(

                revenue,

                adSpend

            )

        );

    const ctr =
        calculateCTR(

            clicks,

            views

        );

    const cvr =
        calculateCVR(

            adOrders,

            clicks

        );

    /* ==============================
       SAVE STATE
    ============================== */

    const kpis = {

        /* KPI Cards */

        gmv,

        units,

        asp,

        adSpend,

        roi,

        /* Future Reports */

        orders,

        revenue,

        views,

        clicks,

        ctr,

        cvr,

        adOrders

    };

    setKPIs(
        kpis
    );

    return kpis;

}

/* ==========================================
   EMPTY KPI STATE
========================================== */

export function getEmptyKPIs() {

    return {

        gmv: 0,

        units: 0,

        asp: 0,

        adSpend: 0,

        roi: 0,

        orders: 0,

        revenue: 0,

        views: 0,

        clicks: 0,

        ctr: 0,

        cvr: 0,

        adOrders: 0

    };

}