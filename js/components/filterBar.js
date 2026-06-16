/* ==========================================
   FILTER BAR COMPONENT
========================================== */

import {

    getFilters,
    updateFilters

} from '../core/state.js';

import {

    refreshDashboard

} from '../registry.js';

/* ==========================================
   INIT FILTER BAR
========================================== */

export function initializeFilterBar() {

    bindMonthFilter();

    bindYearFilter();

    bindFromDate();

    bindToDate();

    bindSearch();

}

/* ==========================================
   MONTH FILTER
========================================== */

function bindMonthFilter() {

    const element =
        document.getElementById(

            'monthFilter'

        );

    if (!element) {

        return;

    }

    element.addEventListener(

        'change',

        async event => {

            updateFilters({

                month:
                    event.target.value

            });

            await refreshDashboard();

        }

    );

}

/* ==========================================
   YEAR FILTER
========================================== */

function bindYearFilter() {

    const element =
        document.getElementById(

            'yearFilter'

        );

    if (!element) {

        return;

    }

    element.addEventListener(

        'change',

        async event => {

            updateFilters({

                year:
                    event.target.value

            });

            await refreshDashboard();

        }

    );

}

/* ==========================================
   FROM DATE
========================================== */

function bindFromDate() {

    const element =
        document.getElementById(

            'fromDate'

        );

    if (!element) {

        return;

    }

    element.addEventListener(

        'change',

        async event => {

            updateFilters({

                fromDate:
                    event.target.value

            });

            await refreshDashboard();

        }

    );

}

/* ==========================================
   TO DATE
========================================== */

function bindToDate() {

    const element =
        document.getElementById(

            'toDate'

        );

    if (!element) {

        return;

    }

    element.addEventListener(

        'change',

        async event => {

            updateFilters({

                toDate:
                    event.target.value

            });

            await refreshDashboard();

        }

    );

}

/* ==========================================
   SEARCH
========================================== */

function bindSearch() {

    const element =
        document.getElementById(

            'globalSearch'

        );

    if (!element) {

        return;

    }

    element.addEventListener(

        'input',

        debounce(

            async event => {

                updateFilters({

                    search:
                        event.target.value
                            .trim()

                });

                await refreshDashboard();

            },

            300

        )

    );

}

/* ==========================================
   SET FILTER VALUES
========================================== */

export function syncFiltersToUI() {

    const filters =
        getFilters();

    const month =
        document.getElementById(
            'monthFilter'
        );

    const year =
        document.getElementById(
            'yearFilter'
        );

    const fromDate =
        document.getElementById(
            'fromDate'
        );

    const toDate =
        document.getElementById(
            'toDate'
        );

    const search =
        document.getElementById(
            'globalSearch'
        );

    if (month) {

        month.value =
            filters.month;

    }

    if (year) {

        year.value =
            filters.year;

    }

    if (fromDate) {

        fromDate.value =
            filters.fromDate;

    }

    if (toDate) {

        toDate.value =
            filters.toDate;

    }

    if (search) {

        search.value =
            filters.search;

    }

}

/* ==========================================
   RESET FILTERS
========================================== */

export function clearFilters() {

    updateFilters({

        month: 'all',

        year: 'all',

        fromDate: '',

        toDate: '',

        search: ''

    });

    syncFiltersToUI();

}

/* ==========================================
   DEBOUNCE
========================================== */

function debounce(

    callback,
    delay = 300

) {

    let timer;

    return (...args) => {

        clearTimeout(
            timer
        );

        timer =
            setTimeout(

                () => {

                    callback(
                        ...args
                    );

                },

                delay

            );

    };

}