/* ==========================================
   TABS
========================================== */

import {

    TABS

} from '../config/tabConfig.js';

/* ==========================================
   ACTIVE TAB
========================================== */

let activeTab = 'dashboard';

/* ==========================================
   INIT
========================================== */

export function initializeTabs() {

    renderTabs();

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
                    () => {

                        activeTab =
                            button.dataset.tab;

                        renderTabs();

                        renderPage();

                    };

            }

        );

}

/* ==========================================
   PAGE SWITCH
========================================== */

function renderPage() {

    const dashboard =
        document.getElementById(
            'dashboardPage'
        );

    const topStyles =
        document.getElementById(
            'topStylesPage'
        );

    dashboard.style.display =
        activeTab === 'dashboard'
            ? 'block'
            : 'none';

    topStyles.style.display =
        activeTab === 'topStyles'
            ? 'block'
            : 'none';

}

/* ==========================================
   GET ACTIVE TAB
========================================== */

export function getActiveTab() {

    return activeTab;

}