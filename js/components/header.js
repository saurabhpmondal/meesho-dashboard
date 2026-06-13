/* ==========================================
   HEADER COMPONENT
========================================== */

export function updateLastRefresh() {

    const element =
        document.getElementById(
            'lastRefresh'
        );

    if (!element) {

        return;

    }

    const now =
        new Date();

    element.textContent =
        now.toLocaleString(

            'en-IN',

            {

                day: '2-digit',

                month: 'short',

                year: 'numeric',

                hour: '2-digit',

                minute: '2-digit'

            }

        );

}

/* ==========================================
   APP TITLE
========================================== */

export function setAppTitle(

    title

) {

    const element =
        document.querySelector(

            '.app-title'

        );

    if (!element) {

        return;

    }

    element.textContent =
        title;

}

/* ==========================================
   APP SUBTITLE
========================================== */

export function setAppSubtitle(

    subtitle

) {

    const element =
        document.querySelector(

            '.app-subtitle'

        );

    if (!element) {

        return;

    }

    element.textContent =
        subtitle;

}

/* ==========================================
   SHOW HEADER LOADING
========================================== */

export function showHeaderLoading() {

    const element =
        document.getElementById(
            'lastRefresh'
        );

    if (!element) {

        return;

    }

    element.textContent =
        'Loading...';

}