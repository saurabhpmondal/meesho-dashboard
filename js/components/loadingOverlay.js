/* ==========================================
   LOADING OVERLAY
========================================== */

const OVERLAY_ID =
    'loadingOverlay';

/* ==========================================
   SHOW
========================================== */

export function showLoadingOverlay() {

    const overlay =
        document.getElementById(

            OVERLAY_ID

        );

    if (!overlay) {

        return;

    }

    overlay.style.display =
        'flex';

}

/* ==========================================
   HIDE
========================================== */

export function hideLoadingOverlay() {

    const overlay =
        document.getElementById(

            OVERLAY_ID

        );

    if (!overlay) {

        return;

    }

    overlay.style.display =
        'none';

}

/* ==========================================
   TOGGLE
========================================== */

export function toggleLoadingOverlay(

    show = true

) {

    if (show) {

        showLoadingOverlay();

        return;

    }

    hideLoadingOverlay();

}

/* ==========================================
   LOADING MESSAGE
========================================== */

export function updateLoadingMessage(

    title = 'Loading Dashboard',

    subtitle = 'Please wait...'

) {

    const card =
        document.querySelector(

            '.loading-card'

        );

    if (!card) {

        return;

    }

    card.innerHTML = `

        <div class="loader"></div>

        <h3>

            ${title}

        </h3>

        <p>

            ${subtitle}

        </p>

    `;

}