/* ==========================================
   FORMATTERS
========================================== */

/* ==========================================
   NUMBER
========================================== */

export function formatNumber(

    value,
    decimals = 0

) {

    const number =
        Number(value || 0);

    return number.toLocaleString(

        'en-IN',

        {

            minimumFractionDigits:
                decimals,

            maximumFractionDigits:
                decimals

        }

    );

}

/* ==========================================
   CURRENCY
========================================== */

export function formatCurrency(

    value,
    decimals = 0

) {

    const number =
        Number(value || 0);

    return `₹${number.toLocaleString(

        'en-IN',

        {

            minimumFractionDigits:
                decimals,

            maximumFractionDigits:
                decimals

        }

    )}`;

}

/* ==========================================
   ASP
========================================== */

export function formatASP(

    value

) {

    return formatCurrency(

        value,
        2

    );

}

/* ==========================================
   PERCENT
========================================== */

export function formatPercent(

    value,
    decimals = 2

) {

    const number =
        Number(value || 0);

    return `${number.toFixed(

        decimals

    )}%`;

}

/* ==========================================
   CTR
========================================== */

export function calculateCTR(

    clicks,
    views

) {

    const totalClicks =
        Number(clicks || 0);

    const totalViews =
        Number(views || 0);

    if (

        totalViews === 0

    ) {

        return 0;

    }

    return (

        totalClicks /
        totalViews

    ) * 100;

}

/* ==========================================
   CVR
========================================== */

export function calculateCVR(

    orders,
    clicks

) {

    const totalOrders =
        Number(orders || 0);

    const totalClicks =
        Number(clicks || 0);

    if (

        totalClicks === 0

    ) {

        return 0;

    }

    return (

        totalOrders /
        totalClicks

    ) * 100;

}

/* ==========================================
   ROI
========================================== */

export function calculateROI(

    revenue,
    spend

) {

    const totalRevenue =
        Number(revenue || 0);

    const totalSpend =
        Number(spend || 0);

    if (

        totalSpend === 0

    ) {

        return 0;

    }

    return (

        totalRevenue /
        totalSpend

    );

}

/* ==========================================
   GMV
========================================== */

export function formatGMV(

    value

) {

    return formatCurrency(

        value,
        0

    );

}

/* ==========================================
   UNITS
========================================== */

export function formatUnits(

    value

) {

    return formatNumber(

        value,
        0

    );

}

/* ==========================================
   ORDERS
========================================== */

export function formatOrders(

    value

) {

    return formatNumber(

        value,
        0

    );

}

/* ==========================================
   KPI VALUE
========================================== */

export function formatKPIValue(

    key,
    value

) {

    switch (key) {

        case 'gmv':

            return formatGMV(

                value

            );

        case 'units':

            return formatUnits(

                value

            );

        case 'orders':

            return formatOrders(

                value

            );

        case 'asp':

            return formatASP(

                value

            );

        case 'adSpend':

            return formatCurrency(

                value

            );

        case 'revenue':

            return formatCurrency(

                value

            );

        case 'roi':

            return `${Number(

                value || 0

            ).toFixed(2)}x`;

        case 'ctr':

            return formatPercent(

                value

            );

        case 'cvr':

            return formatPercent(

                value

            );

        default:

            return formatNumber(

                value

            );

    }

}

/* ==========================================
   SAFE NUMBER
========================================== */

export function toNumber(

    value

) {

    const parsed =
        Number(value);

    return Number.isNaN(

        parsed

    )

        ? 0

        : parsed;

}

/* ==========================================
   TREND FORMAT
========================================== */

export function formatTrend(

    current,
    previous

) {

    const currentValue =
        Number(current || 0);

    const previousValue =
        Number(previous || 0);

    if (

        currentValue >
        previousValue

    ) {

        return 'up';

    }

    if (

        currentValue <
        previousValue

    ) {

        return 'down';

    }

    return 'neutral';

}

/* ==========================================
   COMPACT NUMBER
========================================== */

export function formatCompact(

    value

) {

    const number =
        Number(value || 0);

    return number.toLocaleString(

        'en',

        {

            notation: 'compact',

            maximumFractionDigits: 1

        }

    );

}