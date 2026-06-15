/* ==========================================
   TOP STYLES REPORT
========================================== */

import {

    getTopStyles,
    getFilters

} from '../core/state.js';

import {

    formatCurrency

} from '../utils/formatters.js';

import {

    buildTopStyles,
    getTopStylesExportData

} from '../engines/dashboard/topStylesEngine.js';

/* ==========================================
   LOCAL STATE
========================================== */

let rankBy = 'units';

let showCount = 20;

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

    const fullData =
        getTopStyles();

    if (!fullData.length) {

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

    const data =
        fullData.slice(

            0,

            showCount

        );

    container.innerHTML = `

        <div
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                padding:16px 20px;
                border-bottom:1px solid #e5e7eb;
                gap:12px;
                flex-wrap:wrap;
            "
        >

            <div
                style="
                    display:flex;
                    gap:16px;
                    align-items:center;
                    flex-wrap:wrap;
                "
            >

                <div>

                    <label
                        style="
                            font-size:12px;
                            margin-right:8px;
                        "
                    >

                        Rank By

                    </label>

                    <select
                        id="topStylesRankBy"
                    >

                        <option
                            value="units"
                            ${rankBy === 'units'
                                ? 'selected'
                                : ''}
                        >

                            Units Sold

                        </option>

                        <option
                            value="gmv"
                            ${rankBy === 'gmv'
                                ? 'selected'
                                : ''}
                        >

                            GMV

                        </option>

                    </select>

                </div>

                <div>

                    <label
                        style="
                            font-size:12px;
                            margin-right:8px;
                        "
                    >

                        Show

                    </label>

                    <select
                        id="topStylesShow"
                    >

                        <option
                            value="20"
                            ${showCount === 20
                                ? 'selected'
                                : ''}
                        >

                            20

                        </option>

                        <option
                            value="50"
                            ${showCount === 50
                                ? 'selected'
                                : ''}
                        >

                            50

                        </option>

                        <option
                            value="100"
                            ${showCount === 100
                                ? 'selected'
                                : ''}
                        >

                            100

                        </option>

                    </select>

                </div>

            </div>

            <button

                id="exportTopStylesBtn"

                style="
                    padding:8px 14px;
                    border:none;
                    border-radius:6px;
                    cursor:pointer;
                    font-weight:600;
                "

            >

                Export Full Dataset

            </button>

        </div>

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

    bindEvents();

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents() {

    const rankDropdown =
        document.getElementById(

            'topStylesRankBy'

        );

    const showDropdown =
        document.getElementById(

            'topStylesShow'

        );

    const exportBtn =
        document.getElementById(

            'exportTopStylesBtn'

        );

    if (

        rankDropdown

    ) {

        rankDropdown.onchange =
            () => {

                rankBy =
                    rankDropdown.value;

                buildTopStyles(
                    rankBy
                );

                renderTopStylesReport();

            };

    }

    if (

        showDropdown

    ) {

        showDropdown.onchange =
            () => {

                showCount =
                    Number(

                        showDropdown.value

                    );

                renderTopStylesReport();

            };

    }

    if (

        exportBtn

    ) {

        exportBtn.onclick =
            exportCSV;

    }

}

/* ==========================================
   EXPORT CSV
========================================== */

function exportCSV() {

    const filters =
        getFilters();

    const exportData =
        getTopStylesExportData(

            rankBy

        );

    if (

        !exportData.length

    ) {

        return;

    }

    const rows = [

        [

            'Rank',

            'ERP SKU',

            'ERP Launch Date',

            'ERP Status',

            'Sold Units',

            'GMV',

            'DRR'

        ]

    ];

    exportData.forEach(

        row => {

            rows.push([

                row.rank,

                row.erpsku,

                row.erp_launch_date,

                row.erp_status,

                row.soldUnits,

                row.gmv,

                row.drr.toFixed(2)

            ]);

        }

    );

    const csv =
        rows

            .map(

                row =>

                    row.join(',')

            )

            .join('\n');

    const blob =
        new Blob(

            [csv],

            {

                type:
                    'text/csv;charset=utf-8;'

            }

        );

    const link =
        document.createElement(

            'a'

        );

    const month =
        filters.month;

    const year =
        filters.year;

    link.href =
        URL.createObjectURL(

            blob

        );

    link.download =
        `top-styles-${month}-${year}.csv`;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

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