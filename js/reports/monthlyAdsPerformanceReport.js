/* ==========================================
   MONTHLY ADS PERFORMANCE REPORT
========================================== */

import {

    getState

} from '../core/state.js';

import {

    formatCurrency,
    formatUnits,
    formatPercent

} from '../utils/formatters.js';

export const monthlyAdsPerformanceReport = {

    async render() {

        renderMonthlyAdsPerformanceReport();

    }

};

export function renderMonthlyAdsPerformanceReport() {

    const container =
        document.getElementById(

            'monthlyAdsPerformanceContainer'

        );

    if (!container) {

        return;

    }

    const rows =
        getState()
            .monthlyAdsPerformance || [];

    container.innerHTML = `

        <table class="report-table">

            <thead>

                <tr>

                    <th>Month-Year</th>

                    <th>Views</th>

                    <th>Clicks</th>

                    <th>Ads Spend</th>

                    <th>Revenue</th>

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

                            <td>${row.monthYear}</td>

                            <td>${formatUnits(row.views)}</td>

                            <td>${formatUnits(row.clicks)}</td>

                            <td>${formatCurrency(row.adSpend)}</td>

                            <td>${formatCurrency(row.revenue)}</td>

                            <td>${formatPercent(row.ctr)}</td>

                            <td>${formatPercent(row.cvr)}</td>

                            <td>${formatUnits(row.orders)}</td>

                            <td>${Number(row.roi).toFixed(2)}x</td>

                        </tr>

                    `

                ).join('')}

            </tbody>

        </table>

    `;

}