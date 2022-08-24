import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { FlatList, View, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../../App";
import { Separator } from "../../../../Global/GlobalComponents";
import { FplBudgetLeagueInfo, Result } from "../../../../Models/FplBudgetLeagueInfo";
import { useAppDispatch } from "../../../../Store/hooks";
import { changeToBudgetTeam } from "../../../../Store/teamSlice";
import { AnimatedButton } from "../../../Controls";
import StandingsHeader from "../../StandingsHeader";
import { StandingsStyles } from "../../StandingsStyles";

interface BudgetLeagueStandingsProps {
    budgetLeagueInfo: FplBudgetLeagueInfo;
}

const BudgetLeagueStandings = ({budgetLeagueInfo} : BudgetLeagueStandingsProps) => {
    
    const theme = useTheme();
    const styles = StandingsStyles(theme);

    const dispatch = useAppDispatch();
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const onLeagueEntryItemPress = useCallback((id: number, name: string) => {
        dispatch(changeToBudgetTeam({id: id, name: name, isDraftTeam: false, isFavourite: false}));
        navigator.goBack();
    }, [])

    const renderLeagueEntryItem = useCallback(({item}: {item: Result}) => {
        return (
            <AnimatedButton buttonFn={() => onLeagueEntryItemPress(item.entry, item.entry_name)}>
                <View testID="leagueEntryItemButton" style={styles.standingsButtonContainer}>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.rank}</Text>
                    <View style={{flex: 3, paddingLeft: moderateScale(5)}}>
                        <Text numberOfLines={1} style={styles.teamNameText}>{item.entry_name}</Text>
                        <Text numberOfLines={1} style={styles.managerNameText}>{item.player_name}</Text>
                    </View>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.event_total}</Text>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.total}</Text> 
                </View>
            </AnimatedButton>
        )
    }, [])

    return(
        <FlatList data={budgetLeagueInfo.standings.results}
                  stickyHeaderIndices={[0]}
                  ItemSeparatorComponent={ () => Separator(theme) }
                  keyExtractor={item => item.id.toString()}
                  ListHeaderComponent={ StandingsHeader }
                  renderItem={renderLeagueEntryItem}
                  testID='budgetLeagueStandingsList'/>
    )

}

export default BudgetLeagueStandings;