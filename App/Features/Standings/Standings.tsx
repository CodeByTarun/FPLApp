import React from "react";
import { View } from "react-native";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import BudgetLeague from "./BudgetLeague";
import DraftLeague from "./DraftLeague";

interface StandingsProps {
    teamInfo: TeamInfo;
    draftLeagueInfo?: FplDraftLeagueInfo;
    budgetUserInfo?: FplManagerInfo;
}

const Standings = ({teamInfo, draftLeagueInfo, budgetUserInfo} : StandingsProps) => {
    return (
        <View style={{width: '100%', maxHeight: '70%'}}>
            {(teamInfo.teamType == TeamTypes.Draft && draftLeagueInfo) &&
                <DraftLeague draftLeagueInfo={draftLeagueInfo}/>
            }
            {(teamInfo.teamType === TeamTypes.Budget && budgetUserInfo) && 
                <BudgetLeague budgetUserInfo={budgetUserInfo}/>
            }
        </View>
    )
}

export default Standings;