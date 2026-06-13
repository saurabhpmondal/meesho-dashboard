/* ==========================================
   CALCULATIONS
========================================== */

/* ==========================================
   GMV
========================================== */

export function calculateGMV(

    rows = []

) {

    return rows.reduce(

        (total, row) =>

            total +

            Number(
                row.gmv || 0
            ),

        0

    );

}

/* ==========================================
   UNITS
========================================== */

export function calculateUnits(

    rows = []

) {

    return rows.reduce(

        (total, row) =>

            total +

            Number(
                row.quantity || 0
            ),

        0

    );

}

/* ==========================================
   SALES ORDERS
========================================== */

export function calculateOrders(

    rows = []

) {

    const orders =
        new Set();

    rows.forEach(

        row => {

            if (

                row.sub_order_no

            ) {

                orders.add(

                    row.sub_order_no

                );

            }

        }

    );

    return orders.size;

}

/* ==========================================
   ASP
========================================== */

export function calculateASP(

    gmv,
    units

) {

    const totalGMV =
        Number(gmv || 0);

    const totalUnits =
        Number(units || 0);

    if (

        totalUnits === 0

    ) {

        return 0;

    }

    return (

        totalGMV /
        totalUnits

    );

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
   SAFE DIVIDE
========================================== */

export function safeDivide(

    numerator,
    denominator

) {

    const top =
        Number(numerator || 0);

    const bottom =
        Number(denominator || 0);

    if (

        bottom === 0

    ) {

        return 0;

    }

    return top / bottom;

}

/* ==========================================
   GROWTH %
========================================== */

export function calculateGrowth(

    current,
    previous

) {

    const currentValue =
        Number(current || 0);

    const previousValue =
        Number(previous || 0);

    if (

        previousValue === 0

    ) {

        return 0;

    }

    return (

        (
            currentValue -
            previousValue
        ) /

        previousValue

    ) * 100;

}

/* ==========================================
   TREND
========================================== */

export function getTrend(

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
   TOP N
========================================== */

export function getTopN(

    rows = [],
    field,
    limit = 10

) {

    return [...rows]

        .sort(

            (a, b) =>

                Number(
                    b[field] || 0
                ) -

                Number(
                    a[field] || 0
                )

        )

        .slice(

            0,
            limit

        );

}