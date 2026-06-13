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

                        </div>

                    `;

                }

            )

            .join('');

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

        <div class="kpi-card kpi-gmv">

            <div class="kpi-label">

                Loading...

            </div>

            <div class="kpi-value">

                ...

            </div>

        </div>

        <div class="kpi-card kpi-units">

            <div class="kpi-label">

                Loading...

            </div>

            <div class="kpi-value">

                ...

            </div>

        </div>

        <div class="kpi-card kpi-asp">

            <div class="kpi-label">

                Loading...

            </div>

            <div class="kpi-value">

                ...

            </div>

        </div>

        <div class="kpi-card kpi-spend">

            <div class="kpi-label">

                Loading...

            </div>

            <div class="kpi-value">

                ...

            </div>

        </div>

        <div class="kpi-card kpi-roi">

            <div class="kpi-label">

                Loading...

            </div>

            <div class="kpi-value">

                ...

            </div>

        </div>

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

    container.innerHTML = `

        <div class="kpi-card kpi-gmv">
            <div class="kpi-label">GMV</div>
            <div class="kpi-value">₹0</div>
        </div>

        <div class="kpi-card kpi-units">
            <div class="kpi-label">Units</div>
            <div class="kpi-value">0</div>
        </div>

        <div class="kpi-card kpi-asp">
            <div class="kpi-label">ASP</div>
            <div class="kpi-value">₹0</div>
        </div>

        <div class="kpi-card kpi-spend">
            <div class="kpi-label">Ad Spend</div>
            <div class="kpi-value">₹0</div>
        </div>

        <div class="kpi-card kpi-roi">
            <div class="kpi-label">ROI</div>
            <div class="kpi-value">0x</div>
        </div>

    `;

}