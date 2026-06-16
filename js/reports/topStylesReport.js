/* ==========================================
   TOP STYLES REPORT
========================================== */

import {

    getTopStyles

} from '../core/state.js';

import {

    formatCurrency

} from '../utils/formatters.js';

/* ==========================================
   RENDER REPORT
========================================== */

export function renderTopStylesReport() {

    const container =
        document.getElementById(

            'topStylesContainer'

        );

    if (!container) {

        return;

    }

    const data =
        getTopStyles();

    if (!data.length) {

        container.innerHTML = `

            <div
                style="
                    padding:24px;
                    text-align:center;
                "
            >

                No styles found

            </div>

        `;

        return;

    }

    container.innerHTML = `

        <table
            class="report-table"
        >

            <thead>

                <tr>

                    <th>
                        Rank
                    </th>

                    <th>
                        ERP SKU
                    </th>

                    <th>
                        ERP Launch Date
                    </th>

                    <th>
                        ERP Status
                    </th>

                    <th>
                        Sold Units
                    </th>

                    <th>
                        GMV
                    </th>

                    <th>
                        DRR
                    </th>

                </tr>

            </thead>

            <tbody>

                ${data

                    .map(

                        row => `

                            <tr>

                                <td>

                                    ${row.rank}

                                </td>

                                <td>

                                    ${row.erpsku}

                                </td>

                                <td>

                                    ${row.erp_launch_date || ''}

                                </td>

                                <td>

                                    ${row.erp_status || ''}

                                </td>

                                <td>

                                    ${Number(

                                        row.soldUnits || 0

                                    ).toLocaleString(

                                        'en-IN'

                                    )}

                                </td>

                                <td>

                                    ${formatCurrency(

                                        row.gmv || 0

                                    )}

                                </td>

                                <td>

                                    ${Number(

                                        row.drr || 0

                                    ).toFixed(2)}

                                </td>

                            </tr>

                        `

                    )

                    .join('')}

            </tbody>

        </table>

    `;

}

/* ==========================================
   CLEAR
========================================== */

export function clearTopStylesReport() {

    const container =
        document.getElementById(

            'topStylesContainer'

        );

    if (!container) {

        return;

    }

    container.innerHTML = '';

}