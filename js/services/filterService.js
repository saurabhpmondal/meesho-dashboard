/* ==========================================
   FILTER SERVICE
========================================== */

import {

    getSalesData,
    getAdsData,
    getFilters,
    setFilteredSalesData,
    setFilteredAdsData

} from '../core/state.js';

import {

    SEARCH_FIELDS

} from '../config/appConfig.js';

import {

    isDateInRange

} from '../utils/dateUtils.js';

/* ==========================================
   APPLY ALL FILTERS
========================================== */

export function applyFilters() {

    const salesData =
        getSalesData();

    const adsData =
        getAdsData();

    const filters =
        getFilters();

    const filteredSales =
        filterSalesData(

            salesData,
            filters

        );

    const filteredAds =
        filterAdsData(

            adsData,
            filters

        );

    setFilteredSalesData(

        filteredSales

    );

    setFilteredAdsData(

        filteredAds

    );

    return {

        sales:
            filteredSales,

        ads:
            filteredAds

    };

}

/* ==========================================
   SALES FILTERING
========================================== */

export function filterSalesData(

    data,
    filters

) {

    let result =
        [...data];

    /* Month */

    if (

        filters.month &&
        filters.month !== 'all' &&
        filters.month !== 'latest'

    ) {

        result =
            result.filter(

                row =>

                    Number(
                        row.month
                    ) ===

                    Number(
                        filters.month
                    )

            );

    }

    /* Year */

    if (

        filters.year &&
        filters.year !== 'all' &&
        filters.year !== 'latest'

    ) {

        result =
            result.filter(

                row =>

                    Number(
                        row.year
                    ) ===

                    Number(
                        filters.year
                    )

            );

    }

    /* Date Range */

    if (

        filters.fromDate ||
        filters.toDate

    ) {

        result =
            result.filter(

                row =>

                    isDateInRange(

                        row.orderDate,

                        filters.fromDate,

                        filters.toDate

                    )

            );

    }

    /* Search */

    if (

        filters.search

    ) {

        result =
            applySearch(

                result,
                filters.search

            );

    }

    return result;

}

/* ==========================================
   ADS FILTERING
========================================== */

export function filterAdsData(

    data,
    filters

) {

    let result =
        [...data];

    if (

        filters.month &&
        filters.month !== 'all' &&
        filters.month !== 'latest'

    ) {

        result =
            result.filter(

                row =>

                    Number(
                        row.month
                    ) ===

                    Number(
                        filters.month
                    )

            );

    }

    if (

        filters.year &&
        filters.year !== 'all' &&
        filters.year !== 'latest'

    ) {

        result =
            result.filter(

                row =>

                    Number(
                        row.year
                    ) ===

                    Number(
                        filters.year
                    )

            );

    }

    return result;

}

/* ==========================================
   GLOBAL SEARCH
========================================== */

export function applySearch(

    data,
    searchText

) {

    const search =
        String(

            searchText || ''

        )

            .trim()

            .toLowerCase();

    if (!search) {

        return data;

    }

    return data.filter(

        row => {

            return SEARCH_FIELDS.some(

                field => {

                    const value =
                        row[field];

                    if (

                        value === null ||
                        value === undefined

                    ) {

                        return false;

                    }

                    return String(

                        value

                    )

                        .toLowerCase()

                        .includes(

                            search

                        );

                }

            );

        }

    );

}

/* ==========================================
   MONTH FILTER
========================================== */

export function filterByMonth(

    data,
    month

) {

    return data.filter(

        row =>

            Number(
                row.month
            ) ===

            Number(
                month
            )

    );

}

/* ==========================================
   YEAR FILTER
========================================== */

export function filterByYear(

    data,
    year

) {

    return data.filter(

        row =>

            Number(
                row.year
            ) ===

            Number(
                year
            )

    );

}

/* ==========================================
   DATE FILTER
========================================== */

export function filterByDateRange(

    data,
    fromDate,
    toDate

) {

    return data.filter(

        row =>

            isDateInRange(

                row.orderDate,

                fromDate,

                toDate

            )

    );

}

/* ==========================================
   CHECK ACTIVE FILTERS
========================================== */

export function hasActiveFilters() {

    const filters =
        getFilters();

    return Boolean(

        filters.month !== 'latest' ||

        filters.year !== 'latest' ||

        filters.fromDate ||

        filters.toDate ||

        filters.search

    );

}

/* ==========================================
   FILTER SUMMARY
========================================== */

export function getFilterSummary() {

    const filters =
        getFilters();

    return {

        month:
            filters.month,

        year:
            filters.year,

        fromDate:
            filters.fromDate,

        toDate:
            filters.toDate,

        search:
            filters.search

    };

}