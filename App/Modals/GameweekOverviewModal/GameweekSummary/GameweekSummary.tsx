import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../App";
import { FplBaseDataContext } from "../../../AppContext";
import { AnimatedButton } from "../../../Features/Controls";
import PlayerListInfo from "../../../Features/PlayerStats/PlayerListContainer/PlayerList/PlayerListInfo";
import { Separator } from "../../../Global/GlobalComponents";
import { cornerRadius, mediumFont, largeFont, semiBoldFont, defaultFont } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import UserTeamInfo from "../../../Helpers/FplDataStorageService";
import { Event, PlayerOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../Store/modalSlice";
import { changeToBudgetTeam } from "../../../Store/teamSlice";

const CategoryLeaders: {[key: string]: string} = {
    'Most Selected' : 'most_selected',
    'Most Transferred' : 'most_transferred_in',
    'Top Player' : 'top_element',
    'Most Captained' : 'most_captained',
    'Most Vice Captained' : 'most_vice_captained',
}

interface GameweekLeader {
    category: 'string',
    stat: 'string',
    player: PlayerOverview,
}

const GameweekSummary = () => {

    const theme = useTheme();
    const styles = GameweekSummaryStyles(theme);

    const { overview } = useContext(FplBaseDataContext);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const teamInfo = useAppSelector(state => state.team);

    const openHighestScoringTeam = () => {
        if (overview) {
            dispatch(changeToBudgetTeam({id: overview.events.find(event => event.id === teamInfo.gameweek)?.highest_scoring_entry, name: 'Top Team', isDraftTeam: false, isFavourite: false} as UserTeamInfo));
            navigation.goBack();
        }
    }

    const openPlayerStatsModal = useCallback((id: number) => {
        let player = overview.elements.find(element => element.id === id);
        if (player) {
            dispatch(changePlayerOverviewInfo(player));
            navigation.navigate('PlayerDetailedStatsModal');
        }
    }, [overview])

    const PlayerItem = (category: string) => {
        
        let event = overview.events.find(event => event.id === teamInfo.gameweek);
        if (event) {
            let playerId = event[CategoryLeaders[category] as keyof Event];
            if (typeof playerId === 'number') {

                let playerOverview = overview.elements.find(player => player.id === playerId);

                if (playerOverview) {
                    return (
                        <AnimatedButton key={category} buttonFn={() => openPlayerStatsModal(playerId as number)} >
                            <View testID="playerItemButton" style={[styles.playerItemContainer, { borderBottomWidth: moderateVerticalScale(1), borderBottomColor: category === 'Most Vice Captained' ? theme.colors.primary : theme.colors.background }]}>
                                <Text style={styles.playerItemText}>{category}</Text>
                                <View style={styles.playerInfoContainer}>
                                    <PlayerListInfo overview={overview} player={playerOverview}/>
                                </View>
                            </View>
                        </AnimatedButton>
                    )
                }
            }
        }

        return null;
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.pointsView}>
                <View style={styles.pointsContainer}>
                    <Text style ={styles.headerText}>Average Points</Text>
                    <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.average_entry_score}</Text>
                </View>
                <View style={styles.pointsContainer}>
                    <AnimatedButton buttonFn={openHighestScoringTeam}>
                        <View style={[styles.highestPointsButton, globalStyles.shadow]}>
                            <Text style={styles.headerText}>Highest Points</Text>
                            <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.highest_score}</Text>
                        </View>
                    </AnimatedButton>
                </View>
            </View>
            

            <View style={styles.playerContainer}>
                { Object.keys(CategoryLeaders).map(category => {
                    return PlayerItem(category);
                }) }
            </View>
        </View>
    )
}

export default GameweekSummary;

const GameweekSummaryStyles = (theme: Theme) => StyleSheet.create({
    pointsView: {
        flexDirection: 'row', 
        paddingBottom: moderateVerticalScale(10),
        marginTop: moderateVerticalScale(2)
    },

    pointsContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    highestPointsButton :{
        backgroundColor: theme.colors.card, 
        paddingLeft: moderateScale(7), 
        paddingRight: moderateScale(7), 
        paddingTop: moderateVerticalScale(7),
        paddingBottom: moderateVerticalScale(7),
        borderRadius: cornerRadius
    },

    headerText: {
        fontSize: mediumFont * 0.9,
        color: theme.colors.border,
        fontFamily: semiBoldFont,
        alignSelf: 'center',
        textAlign: 'center'
    },

    scoreText: {
        fontSize: largeFont,
        color: theme.colors.text,
        paddingTop: moderateVerticalScale(3),
        fontFamily: defaultFont,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: -moderateVerticalScale(2),
    },

    playerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    playerItemContainer: {
        flexDirection: 'row',
        paddingTop: verticalScale(7),
        paddingBottom: verticalScale(7),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        width: moderateScale(275),
        height: moderateVerticalScale(45, 0.7),
    },

    playerItemText: {
        flex: 1,
        alignSelf: 'center',
        fontSize: mediumFont,
        color: theme.colors.text,
        fontFamily: defaultFont,
    },

    playerInfoContainer: {
        height: '100%',
        width: moderateScale(120, 0.2),
    }

});