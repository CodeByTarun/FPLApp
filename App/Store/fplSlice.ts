import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FplDraftGameweekPicks } from '../Models/FplDraftGameekPicks';
import { FplDraftLeagueInfo } from '../Models/FplDraftLeagueInfo';
import { FplDraftUserInfo } from '../Models/FplDraftUserInfo';
import { FplDreamTeam } from '../Models/FplDreamTeam';
import { FplFixture } from "../Models/FplFixtures"
import { FplGameweek } from '../Models/FplGameweek'
import { FplManagerGameweekPicks } from '../Models/FplManagerGameweekPicks';
import { FplManagerInfo } from '../Models/FplManagerInfo';
import { FplOverview } from '../Models/FplOverview'

export const fplSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://fantasy.premierleague.com/api' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    getOverview: builder.query<FplOverview, void>({
      query: () => '/bootstrap-static/'
    }),

    getFixtures: builder.query<FplFixture[], void>({
      query: () => '/fixtures'
    }),

    getGameweekData: builder.query<FplGameweek, number>({
      query: (gameweek: number) => `/event/${gameweek}/live`
    }),

    getGameweekDreamTeam: builder.query<FplDreamTeam, number>({
      query: (gameweek:number) => `/dreamteam/${gameweek}`
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

    getManagerInfo: builder.query<FplManagerInfo, number>({
      query: (managerId: number) => `https://fantasy.premierleague.com/api/entry/${managerId}/`
    }),

    getManagerGameweekPicks: builder.query<FplManagerGameweekPicks, { managerId: number, gameweek: number }>({
      query: ({managerId, gameweek}) => `https://fantasy.premierleague.com/api/entry/${managerId}/event/${gameweek}/picks/`
    })
  })
})

export const { useGetOverviewQuery, useGetFixturesQuery, useGetGameweekDataQuery, useGetGameweekDreamTeamQuery, useGetDraftUserInfoQuery,
               useGetDraftLeagueInfoQuery, useGetDraftGameweekPicksQuery, useGetManagerInfoQuery, useGetManagerGameweekPicksQuery } = fplSlice