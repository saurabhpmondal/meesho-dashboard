/* ==========================================
   DAILY SALES ENGINE
========================================== */

import {

    getState,
    setDailySales

} from '../../core/state.js';

/* ==========================================
   BUILD DAILY SALES
========================================== */

export function buildDailySales() {

    const state =
        getState();

    const sales =
        state.filteredSalesData || [];

    const grouped =
        new Map();

    sales.forEach(

        row => {

            const date =
                row.orderDate;

            if (!date) {

                return;

            }

            if (

                !grouped.has(
                    date
                )

            ) {

                grouped.set(

                    date,

                    {

                        date,

                        gmv: 0,

                        units: 0,

                        orders: new Set()

                    }

                );

            }

            const record =
                grouped.get(
                    date
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

    const results =
        Array.from(

            grouped.values()

        )

            .map(

                row => {

                    const asp =
                        row.units === 0

                            ? 0

                            : row.gmv /
                              row.units;

                    return {

                        date:
                            row.date,

                        gmv:
                            row.gmv,

                        units:
                            row.units,

                        orders:
                            row.orders.size,

                        asp

                    };

                }

            )

            /* ==========================
               OLDEST → NEWEST
            ========================== */

            .sort(

                (a, b) =>

                    new Date(
                        a.date
                    ).getTime()

                    -

                    new Date(
                        b.date
                    ).getTime()

            );

    applyTrendLogic(
        results
    );

    setDailySales(
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
            rows[i - 1];

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

export function getEmptyDailySales() {

    return [];

}

/* ==========================================
   SUMMARY
========================================== */

export function getDailySalesSummary() {

    return buildDailySales();

}