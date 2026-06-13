/* ==========================================
   SEARCH SERVICE
========================================== */

import {

    SEARCH_FIELDS

} from '../config/appConfig.js';

/* ==========================================
   SEARCH DATASET
========================================== */

export function searchData(

    data = [],
    searchText = ''

) {

    const search =
        String(

            searchText || ''

        )

            .trim()

            .toLowerCase();

    if (!search) {

        return data;

    }

    return data.filter(

        row => {

            return SEARCH_FIELDS.some(

                field => {

                    const value =
                        row[field];

                    if (

                        value === undefined ||
                        value === null

                    ) {

                        return false;

                    }

                    return String(

                        value

                    )

                        .toLowerCase()

                        .includes(

                            search

                        );

                }

            );

        }

    );

}

/* ==========================================
   SEARCH SINGLE ROW
========================================== */

export function matchesSearch(

    row,
    searchText

) {

    const search =
        String(

            searchText || ''

        )

            .trim()

            .toLowerCase();

    if (!search) {

        return true;

    }

    return SEARCH_FIELDS.some(

        field => {

            const value =
                row[field];

            if (

                value === undefined ||
                value === null

            ) {

                return false;

            }

            return String(

                value

            )

                .toLowerCase()

                .includes(

                    search

                );

        }

    );

}

/* ==========================================
   SEARCH COUNT
========================================== */

export function getSearchResultCount(

    data = [],
    searchText = ''

) {

    return searchData(

        data,
        searchText

    ).length;

}