/* ==========================================
   TOP STATES ENGINE
========================================== */

import {

    getState,
    setTopStates

} from '../../core/state.js';

/* ==========================================
   BUILD TOP STATES
========================================== */

export function buildTopStates() {

    const state =
        getState();

    const sales =
        state.filteredSalesData || [];

    const stateMap =
        new Map();

    sales.forEach(

        row => {

            const stateName =
                String(

                    row.customer_state ||
                    'Unknown'

                ).trim();

            if (

                !stateMap.has(
                    stateName
                )

            ) {

                stateMap.set(

                    stateName,

                    {

                        state:
                            stateName,

                        gmv: 0,

                        units: 0,

                        orders:
                            new Set()

                    }

                );

            }

            const record =
                stateMap.get(
                    stateName
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

            stateMap.values()

        )

            .map(

                row => ({

                    state:
                        row.state,

                    gmv:
                        row.gmv,

                    units:
                        row.units,

                    orders:
                        row.orders.size

                })

            )

            .sort(

                (a, b) =>

                    b.gmv -
                    a.gmv

            )

            .slice(

                0,
                10

            );

    setTopStates(
        results
    );

    return results;

}

/* ==========================================
   EMPTY RESULT
========================================== */

export function getEmptyTopStates() {

    return [];

}

/* ==========================================
   SUMMARY
========================================== */

export function getTopStatesSummary() {

    return buildTopStates();

}