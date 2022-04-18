import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FplManagerInfo } from "../../../Models/FplManagerInfo";
import { useGetBudgetLeagueInfoQuery } from "../../../Store/fplSlice";
import { styles } from "../StandingsStyles";
import BudgetLeagueList from "./LeagueList/BudgetLeagueList";
import BudgetLeagueStandings from "./LeagueStandings/BudgetLeagueStandings";

interface BudgetLeagueProps {
    budgetUserInfo: FplManagerInfo;
    setModalVisibility: (value: React.SetStateAction<boolean>) => void;
}

const BudgetLeague = ({budgetUserInfo, setModalVisibility} : BudgetLeagueProps) => {

    const [leagueToShow, setLeagueToShow] = useState(null as number | null);

    const budgetLeagueInfo = useGetBudgetLeagueInfoQuery(leagueToShow ? leagueToShow : skipToken);

    return (
        <View style={{flex: 1, padding: 5, paddingTop: 10, paddingBottom: 10}}>
            <Text style={styles.titleText} numberOfLines={1}>{leagueToShow ? (budgetLeagueInfo.isSuccess ? budgetLeagueInfo.data.league.name : "")  : 'Leagues'}</Text>
            { leagueToShow && 
                <TouchableOpacity testID="backButtonStandings" style={{position: 'absolute', left: 10, top: 10}} onPress={() => setLeagueToShow(null)}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            }
            { leagueToShow === null ? 
                <BudgetLeagueList budgetUserInfo={budgetUserInfo} setLeagueToShow={setLeagueToShow}/>
                :
                <>
                {budgetLeagueInfo.isSuccess &&
                    <BudgetLeagueStandings budgetLeagueInfo={budgetLeagueInfo.data} setModalVisibility={setModalVisibility}/>
                }
                </>
            }
        </View>
    )
}   

export default BudgetLeague;