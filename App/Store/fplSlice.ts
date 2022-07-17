import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FplBudgetLeagueInfo } from '../Models/FplBudgetLeagueInfo';
import { FplDraftGameweekPicks } from '../Models/FplDraftGameekPicks';
import { FplDraftLeagueInfo } from '../Models/FplDraftLeagueInfo';
import { FplDraftLeaguePlayerStatuses } from '../Models/FplDraftLeaguePlayerStatuses';
import { FplDraftOverview } from '../Models/FplDraftOverview';
import { FplDraftUserInfo } from '../Models/FplDraftUserInfo';
import { FplFixture } from "../Models/FplFixtures";
import { FplGameweek } from '../Models/FplGameweek';
import { FplManagerGameweekPicks } from '../Models/FplManagerGameweekPicks';
import { FplManagerInfo } from '../Models/FplManagerInfo';
import { FplOverview } from '../Models/FplOverview';
import { FplPlayerSummary } from '../Models/FplPlayerSummary';

export const fplSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://fantasy.premierleague.com/api',
                              prepareHeaders: (headers, { getState }) => {
                                headers.set("User-Agent", "Mozilla/5.0")
                                return headers
                              }}),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    getOverview: builder.query<FplOverview, void>({
      query: () => '/bootstrap-static/'
    }),

    getFixtures: builder.query<FplFixture[], void>({
      query: () => '/fixtures/',
    }),

    getGameweekData: builder.query<FplGameweek, number>({
      query: (gameweek: number) => `/event/${gameweek}/live/`
    }),

    getPlayerSummary: builder.query<FplPlayerSummary, number>({
      query: (playerId: number) => `https://fantasy.premierleague.com/api/element-summary/${playerId}/`
    }),

    getDraftOverview: builder.query<FplDraftOverview, void>({
      query: () => 'https://draft.premierleague.com/api/bootstrap-static'
    }),

    getDraftUserInfo: builder.query<FplDraftUserInfo, number>({
      query: (entryId: number) => `https://draft.premierleague.com/api/entry/${entryId}/public`
    }),

    getDraftLeagueInfo: builder.query<FplDraftLeagueInfo, number>({
      query: (leagueId: number) => `https://draft.premierleague.com/api/league/${leagueId}/details`
    }),

    getDraftGameweekPicks: builder.query<FplDraftGameweekPicks, { entryId: number, gameweek: number }>({
      query: ({entryId, gameweek}) => `https://draft.premierleague.com/api/entry/${entryId}/event/${gameweek}`
    }),

    getDraftLeaguePlayerStatuses: builder.query<FplDraftLeaguePlayerStatuses, number>({
      query: (leagueId: number) => `https://draft.premierleague.com/api/league/${leagueId}/element-status`
    }),

    getBudgetGameweekPicks: builder.query<FplManagerGameweekPicks, { entryId: number, gameweek: number }>({
      query: ({entryId, gameweek}) => `https://fantasy.premierleague.com/api/entry/${entryId}/event/${gameweek}/picks/`
    }),

    getBudgetUserInfo: builder.query<FplManagerInfo, number>({
      query: (entryId: number) => `https://fantasy.premierleague.com/api/entry/${entryId}/`
    }),

    getBudgetLeagueInfo: builder.query<FplBudgetLeagueInfo, number>({
      query: (leagueId: number) => `https://fantasy.premierleague.com/api/leagues-classic/${leagueId}/standings/?page_new_entries=1&page_standings=1&phase=1`
    }),
  })
})

export const { useGetOverviewQuery, useGetFixturesQuery, useGetGameweekDataQuery, useGetDraftUserInfoQuery, useGetPlayerSummaryQuery,
               useGetDraftOverviewQuery, useGetDraftLeagueInfoQuery, useGetDraftGameweekPicksQuery, useGetDraftLeaguePlayerStatusesQuery,
               useGetBudgetLeagueInfoQuery, useGetBudgetGameweekPicksQuery, useGetBudgetUserInfoQuery } = fplSlice