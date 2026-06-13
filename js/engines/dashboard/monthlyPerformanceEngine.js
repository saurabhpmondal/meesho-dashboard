/* ==========================================
   MONTHLY PERFORMANCE ENGINE
========================================== */

import {

    getState,
    setMonthlyPerformance

} from '../../core/state.js';

/* ==========================================
   BUILD MONTHLY PERFORMANCE
========================================== */

export function buildMonthlyPerformance() {

    const state =
        getState();

    const sales =
        state.filteredSalesData || [];

    const ads =
        state.adsData || [];

    const monthlyMap =
        new Map();

    /* ======================================
       AGGREGATE SALES
    ====================================== */

    sales.forEach(

        row => {

            const key =
                `${row.year}-${row.month}`;

            if (

                !monthlyMap.has(
                    key
                )

            ) {

                monthlyMap.set(

                    key,

                    {

                        month:
                            row.month,

                        year:
                            row.year,

                        monthName:
                            row.monthName,

                        monthYear:
                            row.monthYear,

                        gmv: 0,

                        units: 0,

                        orders:
                            new Set()

                    }

                );

            }

            const record =
                monthlyMap.get(
                    key
                );

            record.gmv +=
                Number(
                    row.gmv || 0
                );

            record.units +=
                Number(
                    row.quantity || 0
                );

            if (

                row.sub_order_no

            ) {

                record.orders.add(

                    row.sub_order_no

                );

            }

        }

    );

    /* ======================================
       MERGE ADS DATA
    ====================================== */

    const results =
        Array.from(

            monthlyMap.values()

        )

            .map(

                row => {

                    const adsRow =
                        ads.find(

                            ad =>

                                Number(
                                    ad.month
                                ) ===

                                Number(
                                    row.month
                                )

                                &&

                                Number(
                                    ad.year
                                ) ===

                                Number(
                                    row.year
                                )

                        );

                    const orders =
                        row.orders.size;

                    const asp =
                        row.units === 0

                            ? 0

                            : row.gmv /
                              row.units;

                    const spend =
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
                            adsRow?.roi || 0
                        );

                    const ctr =
                        views === 0

                            ? 0

                            : (clicks / views) * 100;

                    const cvr =
                        clicks === 0

                            ? 0

                            : (adOrders / clicks) * 100;

                    return {

                        month:
                            row.month,

                        year:
                            row.year,

                        monthName:
                            row.monthName,

                        monthYear:
                            row.monthYear,

                        gmv:
                            row.gmv,

                        units:
                            row.units,

                        orders,

                        asp,

                        adSpend:
                            spend,

                        revenue,

                        views,

                        clicks,

                        ctr,

                        cvr,

                        adOrders,

                        roi

                    };

                }

            )

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

    applyTrendLogic(
        results
    );

    setMonthlyPerformance(
        results
    );

    return results;

}

/* ==========================================
   TREND LOGIC
========================================== */

function applyTrendLogic(

    rows

) {

    for (

        let i = 0;
        i < rows.length;
        i++

    ) {

        const current =
            rows[i];

        const previous =
            rows[i + 1];

        if (!previous) {

            current.gmvTrend =
                'neutral';

            current.unitsTrend =
                'neutral';

            current.aspTrend =
                'neutral';

            continue;

        }

        current.gmvTrend =
            getTrend(

                current.gmv,

                previous.gmv

            );

        current.unitsTrend =
            getTrend(

                current.units,

                previous.units

            );

        current.aspTrend =
            getTrend(

                current.asp,

                previous.asp

            );

    }

}

/* ==========================================
   TREND HELPER
========================================== */

function getTrend(

    current,
    previous

) {

    if (

        current >
        previous

    ) {

        return 'up';

    }

    if (

        current <
        previous

    ) {

        return 'down';

    }

    return 'neutral';

}

/* ==========================================
   EMPTY RESULT
========================================== */

export function getEmptyMonthlyPerformance() {

    return [];

}

/* ==========================================
   SUMMARY
========================================== */

export function getMonthlyPerformanceSummary() {

    return buildMonthlyPerformance();

}