/* ==========================================
   DATA STORE SERVICE
========================================== */

import {

    getState,

    getSalesData,

    getAdsData,

    getFilters,

    setFilteredSalesData,

    setFilteredAdsData

} from '../core/state.js';

/* ==========================================
   SALES
========================================== */

export function getRawSalesData() {

    return getSalesData();

}

export function getFilteredSales() {

    return getState().filteredSalesData;

}

/* ==========================================
   ADS
========================================== */

export function getRawAdsData() {

    return getAdsData();

}

export function getFilteredAds() {

    return getState().filteredAdsData;

}

/* ==========================================
   FILTERED DATA UPDATE
========================================== */

export function updateFilteredData(

    salesData,
    adsData

) {

    setFilteredSalesData(

        salesData

    );

    setFilteredAdsData(

        adsData

    );

}

/* ==========================================
   FILTER STATE
========================================== */

export function getCurrentFilters() {

    return getFilters();

}

/* ==========================================
   MONTH + YEAR ADS LOOKUP
========================================== */

export function getAdsByMonthYear(

    month,
    year

) {

    const adsData =
        getRawAdsData();

    return adsData.find(

        row =>

            Number(row.month) === Number(month)

            &&

            Number(row.year) === Number(year)

    ) || null;

}

/* ==========================================
   MONTH + YEAR SALES LOOKUP
========================================== */

export function getSalesByMonthYear(

    month,
    year

) {

    const sales =
        getRawSalesData();

    return sales.filter(

        row =>

            Number(row.month) === Number(month)

            &&

            Number(row.year) === Number(year)

    );

}

/* ==========================================
   DISTINCT YEARS
========================================== */

export function getAvailableYears() {

    const sales =
        getRawSalesData();

    return [

        ...new Set(

            sales.map(

                row => row.year

            )

        )

    ].sort(

        (a, b) => b - a

    );

}

/* ==========================================
   DISTINCT MONTHS
========================================== */

export function getAvailableMonths() {

    const sales =
        getRawSalesData();

    const monthMap =
        new Map();

    sales.forEach(

        row => {

            monthMap.set(

                row.month,

                row.monthName

            );

        }

    );

    return [

        ...monthMap.entries()

    ].sort(

        (a, b) =>

            a[0] - b[0]

    );

}

/* ==========================================
   LATEST MONTH
========================================== */

export function getLatestMonthYear() {

    const sales =
        getRawSalesData();

    if (

        !sales.length

    ) {

        return null;

    }

    const sorted =
        [...sales]

            .sort(

                (a, b) => {

                    const aKey =
                        (a.year * 100) +
                        a.month;

                    const bKey =
                        (b.year * 100) +
                        b.month;

                    return bKey - aKey;

                }

            );

    return {

        month:
            sorted[0].month,

        year:
            sorted[0].year,

        monthName:
            sorted[0].monthName

    };

}

/* ==========================================
   STATE REPORT DATA
========================================== */

export function getDashboardData() {

    const state =
        getState();

    return {

        kpis:
            state.kpis,

        dailySales:
            state.dailySales,

        monthlyPerformance:
            state.monthlyPerformance,

        topStates:
            state.topStates

    };

}

/* ==========================================
   APP SUMMARY
========================================== */

export function getDataSummary() {

    return {

        salesRows:
            getRawSalesData().length,

        adsRows:
            getRawAdsData().length,

        filteredSalesRows:
            getFilteredSales().length,

        filteredAdsRows:
            getFilteredAds().length

    };

}

/* ==========================================
   DEBUG
========================================== */

export function debugStore() {

    console.log({

        sales:
            getRawSalesData(),

        ads:
            getRawAdsData(),

        filters:
            getCurrentFilters(),

        dashboard:
            getDashboardData()

    });

}