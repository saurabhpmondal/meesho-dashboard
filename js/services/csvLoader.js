/* ==========================================
   CSV LOADER SERVICE
========================================== */

/* ==========================================
   LOAD CSV
========================================== */

export async function loadCSV(url) {

    try {

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(

                `Failed to load CSV: ${response.status}`

            );

        }

        const csvText = await response.text();

        return parseCSV(csvText);

    } catch (error) {

        console.error(

            'CSV Load Error:',
            error

        );

        throw error;

    }

}

/* ==========================================
   PARSE CSV
========================================== */

function parseCSV(csvText) {

    const rows = [];

    const lines = csvText
        .replace(/\r/g, '')
        .split('\n')
        .filter(line => line.trim());

    if (!lines.length) {

        return rows;

    }

    const headers = parseCSVLine(

        lines[0]

    );

    for (

        let i = 1;
        i < lines.length;
        i++

    ) {

        const values =
            parseCSVLine(

                lines[i]

            );

        const row = {};

        headers.forEach(

            (header, index) => {

                row[
                    normalizeHeader(
                        header
                    )
                ] = values[index] ?? '';

            }

        );

        rows.push(row);

    }

    return rows;

}

/* ==========================================
   PARSE SINGLE CSV LINE
========================================== */

function parseCSVLine(line) {

    const values = [];

    let current = '';

    let insideQuotes = false;

    for (

        let i = 0;
        i < line.length;
        i++

    ) {

        const char = line[i];

        if (char === '"') {

            insideQuotes = !insideQuotes;

            continue;

        }

        if (

            char === ',' &&
            !insideQuotes

        ) {

            values.push(

                current.trim()

            );

            current = '';

            continue;

        }

        current += char;

    }

    values.push(

        current.trim()

    );

    return values;

}

/* ==========================================
   NORMALIZE HEADER
========================================== */

function normalizeHeader(header) {

    return String(header || '')
        .trim()
        .toLowerCase();

}

/* ==========================================
   LOAD MULTIPLE FILES
========================================== */

export async function loadMultipleCSVs(

    sources = []

) {

    const results =
        await Promise.all(

            sources.map(

                source =>
                    loadCSV(source)

            )

        );

    return results;

}

/* ==========================================
   VALIDATE DATA
========================================== */

export function hasData(data) {

    return (

        Array.isArray(data) &&
        data.length > 0

    );

}

/* ==========================================
   ROW COUNT
========================================== */

export function getRowCount(data) {

    if (

        !Array.isArray(data)

    ) {

        return 0;

    }

    return data.length;

}

/* ==========================================
   DEBUG
========================================== */

export function previewData(

    data,
    rows = 5

) {

    console.table(

        data.slice(0, rows)

    );

}