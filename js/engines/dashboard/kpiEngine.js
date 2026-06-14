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

    const filters =
        state.filters || {};

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
       PREVIOUS MONTH
    ============================== */

    const currentMonth =
        Number(
            filters.month
        );

    const currentYear =
        Number(
            filters.year
        );

    let previousMonth =
        currentMonth - 1;

    let previousYear =
        currentYear;

    if (

        previousMonth === 0

    ) {

        previousMonth = 12;

        previousYear =
            currentYear - 1;

    }

    /* ==============================
       PREVIOUS SALES
    ============================== */

    const previousSales =
        (state.salesData || [])

            .filter(

                row =>

                    Number(
                        row.month
                    ) ===
                    previousMonth

                    &&

                    Number(
                        row.year
                    ) ===
                    previousYear

            );

    const previousGMV =
        previousSales.reduce(

            (total, row) =>

                total +

                Number(
                    row.gmv || 0
                ),

            0

        );

    const previousUnits =
        previousSales.reduce(

            (total, row) =>

                total +

                Number(
                    row.quantity || 0
                ),

            0

        );

    const previousASP =
        calculateASP(

            previousGMV,

            previousUnits

        );

    /* ==============================
       PREVIOUS ADS
    ============================== */

    const previousAds =
        (state.adsData || [])

            .find(

                row =>

                    Number(
                        row.month
                    ) ===
                    previousMonth

                    &&

                    Number(
                        row.year
                    ) ===
                    previousYear

            );

    const previousAdSpend =
        Number(
            previousAds?.ads_spend || 0
        );

    const previousROI =
        Number(
            previousAds?.roi || 0
        );

    /* ==============================
       GROWTH
    ============================== */

    const gmvGrowth =
        calculateGrowth(

            gmv,

            previousGMV

        );

    const unitsGrowth =
        calculateGrowth(

            units,

            previousUnits

        );

    const aspGrowth =
        calculateGrowth(

            asp,

            previousASP

        );

    const adSpendGrowth =
        calculateGrowth(

            adSpend,

            previousAdSpend

        );

    const roiGrowth =
        calculateGrowth(

            roi,

            previousROI

        );

    /* ==============================
       SAVE STATE
    ============================== */

    const kpis = {

        gmv,

        units,

        asp,

        adSpend,

        roi,

        gmvGrowth,

        unitsGrowth,

        aspGrowth,

        adSpendGrowth,

        roiGrowth,

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
   GROWTH %
========================================== */

function calculateGrowth(

    current,
    previous

) {

    const currentValue =
        Number(
            current || 0
        );

    const previousValue =
        Number(
            previous || 0
        );

    if (

        previousValue === 0

    ) {

        if (

            currentValue > 0

        ) {

            return 'NEW';

        }

        return 0;

    }

    return (

        (
            currentValue -
            previousValue
        )

        /

        previousValue

    ) * 100;

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

        gmvGrowth: 0,

        unitsGrowth: 0,

        aspGrowth: 0,

        adSpendGrowth: 0,

        roiGrowth: 0,

        orders: 0,

        revenue: 0,

        views: 0,

        clicks: 0,

        ctr: 0,

        cvr: 0,

        adOrders: 0

    };

}