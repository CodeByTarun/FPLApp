import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect } from "react";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useGetGameweekDataQuery } from "../../Store/fplSlice";
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

    useEffect(function getLiveGameweek() {
        if (liveGameweek) {
            dispatch(changeGameweek(liveGameweek))
          }
    }, [])

    return (
        <>
        {gameweekData.isSuccess && 
            <Fixtures overview={overview} fixtures={fixtures} gameweek={gameweekData.data}/>
        }
        </>
    )
}

export default FixturesContainer;
