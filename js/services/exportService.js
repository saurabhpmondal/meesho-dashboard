/* ==========================================
   EXPORT SERVICE
========================================== */

/* ==========================================
   DOWNLOAD CSV
========================================== */

export function exportCSV(

    filename,
    rows

) {

    if (

        !rows ||
        !rows.length

    ) {

        alert(

            'No data available to export.'

        );

        return;

    }

    const headers =
        Object.keys(

            rows[0]

        );

    const csv = [

        headers.join(','),

        ...rows.map(

            row =>

                headers.map(

                    header =>

                        escapeCSV(

                            row[header]

                        )

                ).join(',')

        )

    ].join('\n');

    downloadFile(

        csv,

        filename,

        'text/csv'

    );

}

/* ==========================================
   DOWNLOAD JSON
========================================== */

export function exportJSON(

    filename,
    data

) {

    const json =
        JSON.stringify(

            data,

            null,

            2

        );

    downloadFile(

        json,

        filename,

        'application/json'

    );

}

/* ==========================================
   DOWNLOAD FILE
========================================== */

function downloadFile(

    content,
    filename,
    mimeType

) {

    const blob =
        new Blob(

            [content],

            {

                type:
                    mimeType

            }

        );

    const url =
        URL.createObjectURL(

            blob

        );

    const link =
        document.createElement(

            'a'

        );

    link.href =
        url;

    link.download =
        filename;

    document.body.appendChild(

        link

    );

    link.click();

    document.body.removeChild(

        link

    );

    URL.revokeObjectURL(

        url

    );

}

/* ==========================================
   ESCAPE CSV
========================================== */

function escapeCSV(

    value

) {

    if (

        value === null ||
        value === undefined

    ) {

        return '';

    }

    const stringValue =
        String(value);

    if (

        stringValue.includes(',') ||

        stringValue.includes('"') ||

        stringValue.includes('\n')

    ) {

        return `"${stringValue.replace(

            /"/g,

            '""'

        )}"`;

    }

    return stringValue;

}