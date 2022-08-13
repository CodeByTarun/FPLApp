import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { height } from "../../../Global/GlobalConstants";
import { FplManagerInfo } from "../../../Models/FplManagerInfo";
import { useGetBudgetLeagueInfoQuery } from "../../../Store/fplSlice";
import { AnimatedButton, LoadingIndicator } from "../../Controls";
import { styles } from "../StandingsStyles";
import BudgetLeagueList from "./LeagueList/BudgetLeagueList";
import BudgetLeagueStandings from "./LeagueStandings/BudgetLeagueStandings";

interface BudgetLeagueProps {
    budgetUserInfo: FplManagerInfo;
}

const BudgetLeague = ({budgetUserInfo} : BudgetLeagueProps) => {

    const [leagueToShow, setLeagueToShow] = useState(null as number | null);

    const budgetLeagueInfo = useGetBudgetLeagueInfoQuery(leagueToShow ? leagueToShow : skipToken);

    return (
        <View style={{height: '100%', width: '100%'}}>
            <Text style={styles.titleText} numberOfLines={1}>{leagueToShow ? (budgetLeagueInfo.isSuccess ? budgetLeagueInfo.data.league.name : "")  : 'Leagues'}</Text>
            { leagueToShow && 
                <View testID="backButtonStandings" style={{position: 'absolute', left: moderateScale(5), top: moderateVerticalScale(5)}}>
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
                    <BudgetLeagueStandings budgetLeagueInfo={budgetLeagueInfo.data}/>
                    :
                    <View style={{height: height * 0.5, justifyContent: 'center', alignContent: 'center'}}>
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