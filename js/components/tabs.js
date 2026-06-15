/* ==========================================
   TABS
========================================== */

import {

    TABS

} from '../config/tabConfig.js';

import {

    renderTopStylesPage

} from '../reports/topStylesPage.js';

/* ==========================================
   ACTIVE TAB
========================================== */

let activeTab = 'dashboard';

/* ==========================================
   INIT
========================================== */

export function initializeTabs() {

    renderTabs();

    renderPage();

}

/* ==========================================
   RENDER
========================================== */

function renderTabs() {

    const container =
        document.getElementById(
            'tabsContainer'
        );

    if (!container) {

        return;

    }

    container.innerHTML =
        TABS.map(

            tab => `

                <button

                    class="app-tab ${tab.id === activeTab ? 'active' : ''}"

                    data-tab="${tab.id}"

                >

                    ${tab.label}

                </button>

            `

        ).join('');

    bindEvents();

}

/* ==========================================
   EVENTS
========================================== */

function bindEvents() {

    document

        .querySelectorAll(

            '.app-tab'

        )

        .forEach(

            button => {

                button.onclick =
                    async () => {

                        activeTab =
                            button.dataset.tab;

                        renderTabs();

                        await renderPage();

                    };

            }

        );

}

/* ==========================================
   PAGE SWITCH
========================================== */

async function renderPage() {

    const dashboard =
        document.getElementById(
            'dashboardPage'
        );

    const topStyles =
        document.getElementById(
            'topStylesPage'
        );

    if (

        dashboard

    ) {

        dashboard.style.display =
            activeTab === 'dashboard'
                ? 'block'
                : 'none';

    }

    if (

        topStyles

    ) {

        topStyles.style.display =
            activeTab === 'topStyles'
                ? 'block'
                : 'none';

    }

    if (

        activeTab === 'topStyles'

    ) {

        await renderTopStylesPage();

    }

}

/* ==========================================
   GET ACTIVE TAB
========================================== */

export function getActiveTab() {

    return activeTab;

}