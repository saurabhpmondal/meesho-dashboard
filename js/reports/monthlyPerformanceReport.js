/* ==========================================
   MONTHLY PERFORMANCE REPORT
========================================== */

import {

    getState

} from '../core/state.js';

import {

    formatCurrency,
    formatUnits,
    formatPercent

} from '../utils/formatters.js';

import {

    showEmptyState

} from '../core/registry.js';

/* ==========================================
   REPORT OBJECT
========================================== */

export const monthlyPerformanceReport = {

    async render() {

        renderMonthlyPerformanceReport();

    }

};

/* ==========================================
   RENDER REPORT
========================================== */

export function renderMonthlyPerformanceReport() {

    const container =
        document.getElementById(

            'monthlyPerformanceContainer'

        );

    if (!container) {

        return;

    }

    const state =
        getState();

    const rows =
        state.monthlyPerformance || [];

    if (!rows.length) {

        showEmptyState(

            'monthlyPerformanceContainer',

            'No Monthly Performance Data'

        );

        return;

    }

    container.innerHTML = `

        <table class="report-table">

            <thead>

                <tr>

                    <th>Month</th>

                    <th>GMV</th>

                    <th>Units</th>

                    <th>ASP</th>

                    <th>Ad Spend</th>

                    <th>Views</th>

                    <th>Clicks</th>

                    <th>CTR</th>

                    <th>CVR</th>

                    <th>Orders</th>

                    <th>ROI</th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(

                    row => `

                        <tr>

                            <td>

                                ${row.monthYear}

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

                            <td>

                                ${formatCurrency(

                                    row.adSpend

                                )}

                            </td>

                            <td>

                                ${formatUnits(

                                    row.views

                                )}

                            </td>

                            <td>

                                ${formatUnits(

                                    row.clicks

                                )}

                            </td>

                            <td>

                                ${formatPercent(

                                    row.ctr

                                )}

                            </td>

                            <td>

                                ${formatPercent(

                                    row.cvr

                                )}

                            </td>

                            <td>

                                ${formatUnits(

                                    row.orders

                                )}

                            </td>

                            <td>

                                ${Number(

                                    row.roi || 0

                                ).toFixed(2)}x

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