import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FplFixture } from "../Models/FplFixtures"
import { FplGameweek } from '../Models/FplGameweek'
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

    getGameekData: builder.query<FplGameweek, number|void >({
      query: (gameweek: number) => '/event/${gameweek}/live'
    })
  })
})

export const { useGetOverviewQuery, useGetFixturesQuery, useGetGameekDataQuery } = fplSlice