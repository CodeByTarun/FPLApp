import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect } from "react";
import { IsThereAMatchInProgress } from "../../Helpers/FplAPIHelpers";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useGetFixturesQuery, useGetGameweekDataQuery } from "../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeGameweek } from "../../Store/teamSlice";
import Fixtures from "./Fixtures";

interface FixturesContainerProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const FixturesContainer = ({ overview, fixtures } : FixturesContainerProps) => {

    const dispatch = useAppDispatch();
    const liveGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;
    const teamInfo = useAppSelector(state => state.team);
    const gameweekData = useGetGameweekDataQuery((teamInfo.gameweek) ? teamInfo.gameweek : skipToken);
    const fixturesData = useGetFixturesQuery();

    useEffect(function getLiveGameweek() {
        if (liveGameweek) {
            dispatch(changeGameweek(liveGameweek))
          }
    }, [])

    useEffect( function refetchLiveGameweekData() {
        let refetchFixture: NodeJS.Timer;
        let refetchGameweek: NodeJS.Timer;
  
        if (teamInfo.gameweek !== undefined && fixtures !== undefined) {
          if (teamInfo.gameweek === liveGameweek && IsThereAMatchInProgress(teamInfo.gameweek, fixtures)) {
            refetchFixture = setInterval(() => fixturesData.refetch(), 30000);
            refetchGameweek = setInterval(() => gameweekData.refetch(), 30000);
          }
        }
        
        return function stopRefetchingLiveGameweekData() {
          if (refetchFixture !== undefined) {
            clearInterval(refetchFixture);
            clearInterval(refetchGameweek);
          }
        };
      }, [teamInfo.gameweek]);

    return (
        <>
        {(gameweekData.isSuccess && fixturesData.isSuccess) &&
            <Fixtures overview={overview} fixtures={fixturesData.data} gameweek={gameweekData.data}/>
        }
        </>
    )
}

export default FixturesContainer;
