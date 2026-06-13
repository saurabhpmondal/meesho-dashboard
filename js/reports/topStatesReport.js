/* ==========================================
   TOP STATES REPORT
========================================== */

import {

    getState

} from '../core/state.js';

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

export const topStatesReport = {

    async render() {

        renderTopStatesReport();

    }

};

/* ==========================================
   RENDER REPORT
========================================== */

export function renderTopStatesReport() {

    const container =
        document.getElementById(

            'topStatesContainer'

        );

    if (!container) {

        return;

    }

    const state =
        getState();

    const rows =
        state.topStates || [];

    if (!rows.length) {

        showEmptyState(

            'topStatesContainer',

            'No State Data Available'

        );

        return;

    }

    container.innerHTML = `

        <table class="report-table">

            <thead>

                <tr>

                    <th>Rank</th>

                    <th>State</th>

                    <th>GMV</th>

                    <th>Units</th>

                    <th>Orders</th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(

                    (row, index) => `

                        <tr>

                            <td>

                                ${index + 1}

                            </td>

                            <td>

                                ${row.state}

                            </td>

                            <td>

                                ${formatCurrency(

                                    row.gmv

                                )}

                            </td>

                            <td>

                                ${formatUnits(

                                    row.units

                                )}

                            </td>

                            <td>

                                ${formatUnits(

                                    row.orders

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
   CLEAR REPORT
========================================== */

export function clearTopStatesReport() {

    const container =
        document.getElementById(

            'topStatesContainer'

        );

    if (!container) {

        return;

    }

    container.innerHTML = '';

}