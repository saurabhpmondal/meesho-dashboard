/* ==========================================
   DAILY SALES REPORT
========================================== */

import {

    getState

} from '../core/state.js';

import {

    formatDate

} from '../utils/dateUtils.js';

import {

    formatCurrency,
    formatUnits

} from '../utils/formatters.js';

import {

    showEmptyState

} from '../core/registry.js';

/* ==========================================
   REPORT OBJECT
========================================== */

export const dailySalesReport = {

    async render() {

        renderDailySalesReport();

    }

};

/* ==========================================
   RENDER REPORT
========================================== */

export function renderDailySalesReport() {

    const container =
        document.getElementById(

            'dailySalesContainer'

        );

    if (!container) {

        return;

    }

    const state =
        getState();

    const rows =
        state.dailySales || [];

    if (!rows.length) {

        showEmptyState(

            'dailySalesContainer',
            'No Daily Sales Data'

        );

        return;

    }

    container.innerHTML = `

        <table class="report-table">

            <thead>

                <tr>

                    <th>Date</th>

                    <th>GMV</th>

                    <th>Units</th>

                    <th>ASP</th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(

                    row => `

                        <tr>

                            <td>

                                ${formatDate(

                                    row.date

                                )}

                            </td>

                            <td class="${getTrendClass(

                                row.gmvTrend

                            )}">

                                ${formatCurrency(

                                    row.gmv

                                )}

                            </td>

                            <td class="${getTrendClass(

                                row.unitsTrend

                            )}">

                                ${formatUnits(

                                    row.units

                                )}

                            </td>

                            <td class="${getTrendClass(

                                row.aspTrend

                            )}">

                                ${formatCurrency(

                                    row.asp,

                                    2

                                )}

                            </td>

                        </tr>

                    `

                ).join('')}

            </tbody>

        </table>

    `;

}

/* ==========================================
   TREND CLASS
========================================== */

function getTrendClass(

    trend

) {

    switch (trend) {

        case 'up':

            return 'trend-up';

        case 'down':

            return 'trend-down';

        default:

            return 'trend-neutral';

    }

}