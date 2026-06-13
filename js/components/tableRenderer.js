/* ==========================================
   TABLE RENDERER
========================================== */

/* ==========================================
   RENDER TABLE
========================================== */

export function renderTable(

    containerId,
    columns,
    rows

) {

    const container =
        document.getElementById(

            containerId

        );

    if (!container) {

        return;

    }

    if (

        !rows ||
        !rows.length

    ) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-title">

                    No Data Available

                </div>

                <div class="empty-state-description">

                    No records found for selected filters

                </div>

            </div>

        `;

        return;

    }

    container.innerHTML = `

        <table class="report-table">

            <thead>

                <tr>

                    ${columns.map(

                        column => `

                            <th>

                                ${column.label}

                            </th>

                        `

                    ).join('')}

                </tr>

            </thead>

            <tbody>

                ${rows.map(

                    row => renderRow(

                        columns,
                        row

                    )

                ).join('')}

            </tbody>

        </table>

    `;

}

/* ==========================================
   RENDER ROW
========================================== */

function renderRow(

    columns,
    row

) {

    return `

        <tr>

            ${columns.map(

                column => {

                    const value =
                        typeof column.render === 'function'

                            ? column.render(
                                row
                            )

                            : row[
                                column.key
                            ];

                    const className =
                        typeof column.className === 'function'

                            ? column.className(
                                row
                            )

                            : (

                                column.className ||
                                ''

                            );

                    return `

                        <td class="${className}">

                            ${value ?? ''}

                        </td>

                    `;

                }

            ).join('')}

        </tr>

    `;

}

/* ==========================================
   CLEAR TABLE
========================================== */

export function clearTable(

    containerId

) {

    const container =
        document.getElementById(

            containerId

        );

    if (!container) {

        return;

    }

    container.innerHTML = '';

}

/* ==========================================
   LOADING TABLE
========================================== */

export function showTableLoading(

    containerId

) {

    const container =
        document.getElementById(

            containerId

        );

    if (!container) {

        return;

    }

    container.innerHTML = `

        <div class="report-placeholder">

            Loading...

        </div>

    `;

}

/* ==========================================
   EMPTY TABLE
========================================== */

export function showEmptyTable(

    containerId,
    title = 'No Data Available'

) {

    const container =
        document.getElementById(

            containerId

        );

    if (!container) {

        return;

    }

    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-state-title">

                ${title}

            </div>

            <div class="empty-state-description">

                No records found for selected filters

            </div>

        </div>

    `;

}

/* ==========================================
   TABLE COLUMN HELPER
========================================== */

export function createColumn(

    key,
    label,
    options = {}

) {

    return {

        key,

        label,

        ...options

    };

}