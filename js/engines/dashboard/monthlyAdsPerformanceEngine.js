/* ==========================================
   MONTHLY ADS PERFORMANCE ENGINE
========================================== */

import {

    getState,
    setMonthlyAdsPerformance

} from '../../core/state.js';

export function buildMonthlyAdsPerformance() {

    const state =
        getState();

    const ads =
        state.adsData || [];

    const results =
        [...ads]

            .map(

                row => {

                    const views =
                        Number(
                            row.views || 0
                        );

                    const clicks =
                        Number(
                            row.clicks || 0
                        );

                    const orders =
                        Number(
                            row.orders || 0
                        );

                    const ctr =
                        views === 0

                            ? 0

                            : (
                                clicks /
                                views
                            ) * 100;

                    const cvr =
                        clicks === 0

                            ? 0

                            : (
                                orders /
                                clicks
                            ) * 100;

                    return {

                        month:
                            row.month,

                        year:
                            row.year,

                        monthYear:
                            row.monthYear,

                        views,

                        clicks,

                        adSpend:
                            Number(
                                row.ads_spend || 0
                            ),

                        revenue:
                            Number(
                                row.revenue || 0
                            ),

                        ctr,

                        cvr,

                        orders,

                        roi:
                            Number(
                                row.roi || 0
                            )

                    };

                }

            )

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

            )

            .slice(

                0,
                6

            );

    setMonthlyAdsPerformance(
        results
    );

    return results;

}