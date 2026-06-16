/* ==========================================
   TOP STYLES ENGINE
========================================== */

import {

    getState,
    setTopStyles

} from '../../core/state.js';

/* ==========================================
   BUILD TOP STYLES
========================================== */

export function buildTopStyles() {

    const state =
        getState();

    const sales =
        state.filteredSalesData || [];

    const master =
        state.masterData || [];

    const searchText =
        String(

            state.filters?.search || ''

        )

            .trim()

            .toLowerCase();

    const skuMap =
        new Map();

    master.forEach(

        row => {

            const sellerSku =
                String(

                    row.sellersku || ''

                )

                    .trim()

                    .toUpperCase();

            if (!sellerSku) {

                return;

            }

            skuMap.set(

                sellerSku,

                row

            );

        }

    );

    const grouped =
        new Map();

    sales.forEach(

        row => {

            const sellerSku =
                String(

                    row.sku || ''

                )

                    .trim()

                    .toUpperCase();

            const masterRow =
                skuMap.get(
                    sellerSku
                );

            if (!masterRow) {

                return;

            }

            const erpSku =
                masterRow.erpsku ||
                sellerSku;

            if (

                !grouped.has(
                    erpSku
                )

            ) {

                grouped.set(

                    erpSku,

                    {

                        erpsku:
                            erpSku,

                        erp_launch_date:
                            masterRow.erp_launch_date || '',

                        erp_status:
                            masterRow.erp_status || '',

                        soldUnits: 0,

                        gmv: 0

                    }

                );

            }

            const item =
                grouped.get(
                    erpSku
                );

            item.soldUnits +=
                Number(
                    row.quantity || 0
                );

            item.gmv +=
                Number(
                    row.gmv || 0
                );

        }

    );

    const latestDate =
        getLatestSalesDate(
            sales
        );

    const latestDay =
        latestDate
            ? new Date(
                  latestDate
              ).getDate()
            : 1;

    let rows =
        Array.from(

            grouped.values()

        )

            .map(

                row => ({

                    ...row,

                    drr:

                        latestDay > 0

                            ? row.soldUnits /
                              latestDay

                            : 0

                })

            )

            .sort(

                (a, b) =>

                    b.soldUnits -

                    a.soldUnits

            )

            .map(

                (row, index) => ({

                    ...row,

                    rank:
                        index + 1

                })

            );

    /* ==========================
       SEARCH AFTER RANKING
    ========================== */

    if (

        searchText

    ) {

        rows =
            rows.filter(

                row =>

                    String(

                        row.erpsku

                    )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

                    ||

                    String(

                        row.erp_status

                    )

                        .toLowerCase()

                        .includes(

                            searchText

                        )

            );

    }

    setTopStyles(
        rows
    );

    return rows;

}

/* ==========================================
   LATEST SALES DATE
========================================== */

function getLatestSalesDate(

    sales

) {

    if (

        !sales.length

    ) {

        return null;

    }

    const sorted =
        [...sales]

            .sort(

                (a, b) =>

                    new Date(
                        b.orderDate
                    ) -

                    new Date(
                        a.orderDate
                    )

            );

    return sorted[0]
        .orderDate;

}