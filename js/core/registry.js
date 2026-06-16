/* ==========================================
   DASHBOARD REGISTRY
========================================== */

import { getState } from './state.js';

/* ==========================================
   REPORT REGISTRY
========================================== */

const registry = {

    reports: new Map(),

    initialized: false

};

/* ==========================================
   REGISTER REPORT
========================================== */

export function registerReport(

    reportId,
    reportHandler

) {

    if (!reportId || !reportHandler) {

        return;

    }

    registry.reports.set(

        reportId,
        reportHandler

    );

}

/* ==========================================
   UNREGISTER REPORT
========================================== */

export function unregisterReport(

    reportId

) {

    registry.reports.delete(

        reportId

    );

}

/* ==========================================
   GET REPORT
========================================== */

export function getReport(

    reportId

) {

    return registry.reports.get(

        reportId

    );

}

/* ==========================================
   GET ALL REPORTS
========================================== */

export function getAllReports() {

    return registry.reports;

}

/* ==========================================
   INITIALIZE REGISTRY
========================================== */

export function initializeRegistry() {

    registry.initialized = true;

}

/* ==========================================
   REFRESH SINGLE REPORT
========================================== */

export async function refreshReport(

    reportId

) {

    const report = registry.reports.get(

        reportId

    );

    if (!report) {

        return;

    }

    try {

        await report.render();

    } catch (error) {

        console.error(

            `Failed to render report: ${reportId}`,
            error

        );

    }

}

/* ==========================================
   REFRESH ALL REPORTS
========================================== */

export async function refreshAllReports() {

    const reports = Array.from(

        registry.reports.values()

    );

    for (const report of reports) {

        try {

            await report.render();

        } catch (error) {

            console.error(

                'Report render failed',
                error

            );

        }

    }

}

/* ==========================================
   CLEAR REPORT OUTPUTS
========================================== */

export function clearReports() {

    const containers = [

        'dailySalesContainer',

        'monthlyPerformanceContainer',

        'topStatesContainer'

    ];

    containers.forEach(

        containerId => {

            const container = document.getElementById(

                containerId

            );

            if (!container) {

                return;

            }

            container.innerHTML = '';

        }

    );

}

/* ==========================================
   SHOW EMPTY STATES
========================================== */

export function showEmptyState(

    containerId,
    title = 'No Data Available'

) {

    const container = document.getElementById(

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
   SHOW LOADING
========================================== */

export function showLoading() {

    const overlay = document.getElementById(

        'loadingOverlay'

    );

    if (!overlay) {

        return;

    }

    overlay.style.display = 'flex';

}

/* ==========================================
   HIDE LOADING
========================================== */

export function hideLoading() {

    const overlay = document.getElementById(

        'loadingOverlay'

    );

    if (!overlay) {

        return;

    }

    overlay.style.display = 'none';

}

/* ==========================================
   UPDATE REFRESH TIMESTAMP
========================================== */

export function updateRefreshTime() {

    const element = document.getElementById(

        'lastRefresh'

    );

    if (!element) {

        return;

    }

    const now = new Date();

    element.textContent = now.toLocaleString(

        'en-IN'

    );

}

/* ==========================================
   DASHBOARD REFRESH PIPELINE
========================================== */

export async function refreshDashboard() {

    const state = getState();

    if (!state.initialized) {

        return;

    }

    try {

        showLoading();

        await refreshAllReports();

        updateRefreshTime();

    } catch (error) {

        console.error(

            'Dashboard refresh failed',
            error

        );

    } finally {

        hideLoading();

    }

}

/* ==========================================
   DEBUG
========================================== */

export function getRegistry() {

    return registry;

}