import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { FplManagerInfo } from "../../../Models/FplManagerInfo";
import { useGetBudgetLeagueInfoQuery } from "../../../Store/fplSlice";
import { AnimatedButton, LoadingIndicator } from "../../Controls";
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
        <View style={{flex: 1, padding: 5}}>
            <Text style={styles.titleText} numberOfLines={1}>{leagueToShow ? (budgetLeagueInfo.isSuccess ? budgetLeagueInfo.data.league.name : "")  : 'Leagues'}</Text>
            { leagueToShow && 
                <View testID="backButtonStandings" style={{position: 'absolute', left: 10, top: 10}}>
                    <AnimatedButton buttonFn={() => setLeagueToShow(null)}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </AnimatedButton>
                </View>
            }
            { leagueToShow === null ? 
                <BudgetLeagueList budgetUserInfo={budgetUserInfo} setLeagueToShow={setLeagueToShow}/>
                :
                <>
                {budgetLeagueInfo.isSuccess ?
                    <BudgetLeagueStandings budgetLeagueInfo={budgetLeagueInfo.data} setModalVisibility={setModalVisibility}/>
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                        <View style={{height: '20%', width: '20%', alignSelf: 'center'}}>
                            <LoadingIndicator/>
                        </View>
                    </View>
                }
                </>
            }
        </View>
    )
}   

export default BudgetLeague;