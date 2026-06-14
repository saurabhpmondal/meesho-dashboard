/* ==========================================
   KPI CARDS COMPONENT
========================================== */

import {

    KPI_CONFIG

} from '../config/appConfig.js';

import {

    getKPIs

} from '../core/state.js';

import {

    formatKPIValue

} from '../utils/formatters.js';

/* ==========================================
   RENDER KPI CARDS
========================================== */

export function renderKPICards() {

    const container =
        document.getElementById(

            'kpiCards'

        );

    if (!container) {

        return;

    }

    const kpis =
        getKPIs();

    container.innerHTML =
        KPI_CONFIG

            .map(

                config => {

                    const value =
                        kpis[
                            config.key
                        ];

                    const growth =
                        getGrowthValue(

                            config.key,

                            kpis

                        );

                    const growthHtml =
                        buildGrowthHTML(

                            growth

                        );

                    return `

                        <div class="kpi-card ${config.className}">

                            <div class="kpi-label">

                                ${config.label}

                            </div>

                            <div class="kpi-value">

                                ${formatKPIValue(

                                    config.key,

                                    value

                                )}

                            </div>

                            ${growthHtml}

                        </div>

                    `;

                }

            )

            .join('');

}

/* ==========================================
   KPI GROWTH MAPPING
========================================== */

function getGrowthValue(

    key,
    kpis

) {

    const map = {

        gmv:
            kpis.gmvGrowth,

        units:
            kpis.unitsGrowth,

        asp:
            kpis.aspGrowth,

        adSpend:
            kpis.adSpendGrowth,

        roi:
            kpis.roiGrowth

    };

    return map[key];

}

/* ==========================================
   BUILD GROWTH HTML
========================================== */

function buildGrowthHTML(

    growth

) {

    if (

        growth === undefined ||

        growth === null

    ) {

        return '';

    }

    if (

        growth === 'NEW'

    ) {

        return `

            <div class="kpi-growth growth-up">

                ▲ NEW

            </div>

            <div class="kpi-growth-note">

                vs previous month

            </div>

        `;

    }

    const numericGrowth =
        Number(growth);

    if (

        numericGrowth > 0

    ) {

        return `

            <div class="kpi-growth growth-up">

                ▲ ${numericGrowth.toFixed(1)}%

            </div>

            <div class="kpi-growth-note">

                vs previous month

            </div>

        `;

    }

    if (

        numericGrowth < 0

    ) {

        return `

            <div class="kpi-growth growth-down">

                ▼ ${Math.abs(

                    numericGrowth

                ).toFixed(1)}%

            </div>

            <div class="kpi-growth-note">

                vs previous month

            </div>

        `;

    }

    return `

        <div class="kpi-growth growth-neutral">

            ■ 0.0%

        </div>

        <div class="kpi-growth-note">

            vs previous month

        </div>

    `;

}

/* ==========================================
   CLEAR KPI CARDS
========================================== */

export function clearKPICards() {

    const container =
        document.getElementById(

            'kpiCards'

        );

    if (!container) {

        return;

    }

    container.innerHTML = '';

}

/* ==========================================
   LOADING KPIs
========================================== */

export function showKPILoading() {

    const container =
        document.getElementById(

            'kpiCards'

        );

    if (!container) {

        return;

    }

    container.innerHTML = `

        <div class="kpi-card">Loading...</div>

        <div class="kpi-card">Loading...</div>

        <div class="kpi-card">Loading...</div>

        <div class="kpi-card">Loading...</div>

        <div class="kpi-card">Loading...</div>

    `;

}

/* ==========================================
   EMPTY KPI STATE
========================================== */

export function showEmptyKPIs() {

    const container =
        document.getElementById(

            'kpiCards'

        );

    if (!container) {

        return;

    }

    container.innerHTML = '';

}