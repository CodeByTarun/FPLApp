import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { mediumFont, secondaryColor, textPrimaryColor } from "../../Global/GlobalConstants";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useGetGameweekDataQuery, useGetDraftGameweekPicksQuery, useGetDraftOverviewQuery, useGetDraftUserInfoQuery, useGetDraftLeagueInfoQuery, useGetBudgetGameweekPicksQuery, useGetBudgetUserInfoQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import { TeamTypes } from "../../Store/teamSlice";
import LineupView from "./LineupView";

interface LineupViewQueriesContainerProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const LineupViewQueriesContainer = ({overview, fixtures} : LineupViewQueriesContainerProps) => {

    const teamInfo = useAppSelector((state) => state.team);

    const gameweek = useGetGameweekDataQuery((teamInfo.teamType !== TeamTypes.Empty) ? teamInfo.gameweek : skipToken);
    
    const draftGameweek = useGetDraftGameweekPicksQuery((teamInfo.teamType === TeamTypes.Draft) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const draftUserInfo = useGetDraftUserInfoQuery((teamInfo.teamType === TeamTypes.Draft) ? teamInfo.info.id : skipToken );
    const draftLeagueInfo = useGetDraftLeagueInfoQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken);

    const budgetGameweek = useGetBudgetGameweekPicksQuery((teamInfo.teamType === TeamTypes.Budget) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const budgetUserInfo = useGetBudgetUserInfoQuery((teamInfo.teamType === TeamTypes.Budget) ? teamInfo.info.id : skipToken);

    return (
        <>
        { ((teamInfo.teamType === TeamTypes.Draft && draftGameweek.isError) || (teamInfo.teamType === TeamTypes.Budget && budgetGameweek.isError)) ?
        <View style={{flex: 1, justifyContent: 'center' }}>
            <Text style={{alignSelf: 'center', fontSize: mediumFont, color: textPrimaryColor, width: '60%', textAlign: 'center'}}>This team does not exist or has no gameweek data.</Text>
        </View> 
        :
        <LineupView overview={overview} fixtures={fixtures} gameweek={gameweek.data} teamInfo={teamInfo} draftGameweekPicks={draftGameweek.data}
                    draftOverview={draftOverview.data} draftUserInfo={draftUserInfo.data} draftLeagueInfo={draftLeagueInfo.data} 
                    budgetGameweekPicks={budgetGameweek.data} budgetUserInfo={budgetUserInfo.data}/>
        }
        </>
    )
}

export default LineupViewQueriesContainer;