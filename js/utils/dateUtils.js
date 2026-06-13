/* ==========================================
   DATE UTILITIES
========================================== */

const MONTH_NAMES = [

    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'

];

/* ==========================================
   SALES NORMALIZATION
========================================== */

export function normalizeSalesData(

    data = []

) {

    return data.map(

        row => {

            const normalizedDate =
                convertUSDateToISO(

                    row.order_date

                );

            const date =
                new Date(

                    normalizedDate

                );

            const month =
                date.getMonth() + 1;

            const year =
                date.getFullYear();

            return {

                ...row,

                orderDate:
                    normalizedDate,

                year,

                month,

                monthName:
                    MONTH_NAMES[
                        month - 1
                    ],

                monthYear:
                    `${MONTH_NAMES[
                        month - 1
                    ]} ${year}`,

                quantity:
                    Number(
                        row.quantity || 0
                    ),

                gmv:
                    Number(
                        sanitizeNumber(
                            row[
                                'supplier_listed_price_(incl._gst_+_commission)'
                            ]
                        )
                    )

            };

        }

    );

}

/* ==========================================
   ADS NORMALIZATION
========================================== */

export function normalizeAdsData(

    data = []

) {

    return data.map(

        row => {

            const month =
                Number(
                    row.month || 0
                );

            const year =
                Number(
                    row.year || 0
                );

            return {

                ...row,

                month,

                year,

                monthName:
                    MONTH_NAMES[
                        month - 1
                    ],

                monthYear:
                    `${MONTH_NAMES[
                        month - 1
                    ]} ${year}`,

                ads_spend:
                    Number(
                        sanitizeNumber(
                            row.ads_spend
                        )
                    ),

                revenue:
                    Number(
                        sanitizeNumber(
                            row.revenue
                        )
                    ),

                views:
                    Number(
                        sanitizeNumber(
                            row.views
                        )
                    ),

                clicks:
                    Number(
                        sanitizeNumber(
                            row.clicks
                        )
                    ),

                orders:
                    Number(
                        sanitizeNumber(
                            row.orders
                        )
                    ),

                roi:
                    Number(
                        sanitizeNumber(
                            row.roi
                        )
                    )

            };

        }

    );

}

/* ==========================================
   US DATE → ISO
========================================== */

export function convertUSDateToISO(

    value

) {

    if (!value) {

        return '';

    }

    const parts =
        value
            .trim()
            .split('/');

    if (

        parts.length !== 3

    ) {

        return '';

    }

    const month =
        String(parts[0])
            .padStart(2, '0');

    const day =
        String(parts[1])
            .padStart(2, '0');

    const year =
        parts[2];

    return `${year}-${month}-${day}`;

}

/* ==========================================
   ISO DATE DISPLAY
========================================== */

export function formatDate(

    isoDate

) {

    if (!isoDate) {

        return '';

    }

    const date =
        new Date(
            isoDate
        );

    return date.toLocaleDateString(

        'en-IN',

        {

            day: '2-digit',

            month: 'short',

            year: 'numeric'

        }

    );

}

/* ==========================================
   GET LATEST MONTH/YEAR
========================================== */

export function getLatestMonthYear(

    salesData = []

) {

    if (

        !salesData.length

    ) {

        return null;

    }

    const sorted =
        [...salesData]

            .sort(

                (a, b) => {

                    const aKey =
                        (a.year * 100) +
                        a.month;

                    const bKey =
                        (b.year * 100) +
                        b.month;

                    return bKey - aKey;

                }

            );

    return {

        month:
            sorted[0].month,

        year:
            sorted[0].year,

        monthName:
            sorted[0].monthName

    };

}

/* ==========================================
   DATE RANGE FILTER
========================================== */

export function isDateInRange(

    date,

    fromDate,

    toDate

) {

    if (

        !fromDate &&
        !toDate

    ) {

        return true;

    }

    const current =
        new Date(date);

    if (

        fromDate &&
        current <
        new Date(fromDate)

    ) {

        return false;

    }

    if (

        toDate &&
        current >
        new Date(toDate)

    ) {

        return false;

    }

    return true;

}

/* ==========================================
   SANITIZE NUMBER
========================================== */

export function sanitizeNumber(

    value

) {

    if (

        value === null ||
        value === undefined

    ) {

        return 0;

    }

    return String(value)

        .replace(/,/g, '')

        .replace(/₹/g, '')

        .trim();

}

/* ==========================================
   MONTH NAME
========================================== */

export function getMonthName(

    month

) {

    return MONTH_NAMES[
        month - 1
    ] || '';

}

/* ==========================================
   MONTH KEY
========================================== */

export function getMonthKey(

    month,
    year

) {

    return `${year}-${String(
        month
    ).padStart(2, '0')}`;

}