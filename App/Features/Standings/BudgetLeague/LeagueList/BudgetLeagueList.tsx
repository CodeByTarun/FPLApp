import { useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { Separator } from "../../../../Global/GlobalComponents";
import { Classic, FplManagerInfo } from "../../../../Models/FplManagerInfo";
import { AnimatedButton } from "../../../Controls";
import { StandingsStyles } from "../../StandingsStyles";

interface BudgetLeagueListProps {
    budgetUserInfo: FplManagerInfo;
    setLeagueToShow: (value: React.SetStateAction<number | null>) => void;
}


const BudgetLeagueList = ({budgetUserInfo, setLeagueToShow} : BudgetLeagueListProps) => {

    const theme = useTheme();
    const styles = StandingsStyles(theme);

    const onLeagueItemPress = useCallback((id: number) => {
        setLeagueToShow(id);
    }, [])

    const renderLeagueItem = useCallback(({item}: {item: Classic}) => {
        return (
            <AnimatedButton buttonFn={() => onLeagueItemPress(item.id)}>
                <View testID="leagueItemButton" style={{flex: 1, flexDirection: 'row', paddingTop: moderateVerticalScale(15), paddingBottom: moderateVerticalScale(15)}}>
                    <Text style={[styles.teamNameText, {paddingLeft: moderateScale(5)}]}>{item.name}</Text>
                    <Text style={[styles.leagueText, {width: '30%'}]}>{item.entry_rank}</Text>
                </View>
            </AnimatedButton>
        )}, []);

    return (
        <FlatList data={budgetUserInfo.leagues.classic.concat(budgetUserInfo.leagues.h2h)}
                    stickyHeaderIndices={[0]}
                    ItemSeparatorComponent={() => Separator(theme)}
                    keyExtractor={item => item.id.toString()}
                    testID='budgetLeagueList'
                    ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={[styles.leagueHeaderText, {flex: 1, textAlign: 'left', paddingLeft: 5}]}>League Name</Text>
                        <Text style={[styles.leagueHeaderText, {width: '30%'}]}>Rank</Text>
                    </View>
                    }
                    renderItem={renderLeagueItem}/>
    )
}

export default BudgetLeagueList;