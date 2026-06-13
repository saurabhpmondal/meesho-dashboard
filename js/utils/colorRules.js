/* ==========================================
   COLOR RULES
========================================== */

/* ==========================================
   TREND CLASS
========================================== */

export function getTrendClass(

    trend

) {

    switch (trend) {

        case 'up':

            return 'trend-up';

        case 'down':

            return 'trend-down';

        default:

            return 'trend-neutral';

    }

}

/* ==========================================
   TREND LABEL
========================================== */

export function getTrendLabel(

    trend

) {

    switch (trend) {

        case 'up':

            return 'Increase';

        case 'down':

            return 'Decrease';

        default:

            return 'No Change';

    }

}

/* ==========================================
   VALUE COMPARISON
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
   INLINE STYLE
========================================== */

export function getTrendColor(

    trend

) {

    switch (trend) {

        case 'up':

            return '#16a34a';

        case 'down':

            return '#dc2626';

        default:

            return '#64748b';

    }

}

/* ==========================================
   KPI STATUS
========================================== */

export function getKPIStatus(

    current,
    previous

) {

    const trend =
        getTrend(

            current,
            previous

        );

    return {

        trend,

        className:
            getTrendClass(
                trend
            ),

        label:
            getTrendLabel(
                trend
            ),

        color:
            getTrendColor(
                trend
            )

    };

}

/* ==========================================
   POSITIVE VALUE
========================================== */

export function isPositive(

    value

) {

    return Number(

        value || 0

    ) > 0;

}

/* ==========================================
   NEGATIVE VALUE
========================================== */

export function isNegative(

    value

) {

    return Number(

        value || 0

    ) < 0;

}

/* ==========================================
   ZERO VALUE
========================================== */

export function isZero(

    value

) {

    return Number(

        value || 0

    ) === 0;

}

/* ==========================================
   KPI COLOR HELPERS
========================================== */

export function getKPIColor(

    value

) {

    if (

        isPositive(
            value
        )

    ) {

        return '#16a34a';

    }

    if (

        isNegative(
            value
        )

    ) {

        return '#dc2626';

    }

    return '#64748b';

}