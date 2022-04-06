import React from "react";
import { View } from "react-native";
import { FplBudgetLeagueInfo } from "../../Models/FplBudgetLeagueInfo";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import BudgetLeague from "./BudgetLeague";
import DraftLeague from "./DraftLeague";

interface StandingsProps {
    teamInfo: TeamInfo;
    draftLeagueInfo?: FplDraftLeagueInfo;
    budgetUserInfo?: FplManagerInfo;
    setModalVisibility: (value: React.SetStateAction<boolean>) => void;
}

const Standings = ({teamInfo, draftLeagueInfo, budgetUserInfo, setModalVisibility} : StandingsProps) => {
    return (
        <View style={{flex: 1}}>
            {(teamInfo.teamType == TeamTypes.Draft && draftLeagueInfo) &&
                <DraftLeague draftLeagueInfo={draftLeagueInfo} setModalVisibility={setModalVisibility}/>
            }
            {(teamInfo.teamType === TeamTypes.Budget && budgetUserInfo) && 
                <BudgetLeague budgetUserInfo={budgetUserInfo} setModalVisibility={setModalVisibility}/>
            }
        </View>
    )
}

export default Standings;