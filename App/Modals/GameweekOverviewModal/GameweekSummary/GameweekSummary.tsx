import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../App";
import { FplBaseDataContext } from "../../../AppContext";
import { AnimatedButton } from "../../../Features/Controls";
import { cornerRadius, mediumFont, largeFont } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import UserTeamInfo from "../../../Helpers/FplDataStorageService";
import { Event, PlayerOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../Store/modalSlice";
import { changeToBudgetTeam } from "../../../Store/teamSlice";

const CategoryLeaders: {[key: string]: [string, string]} = {
    'Most Selected' : ['selected_by_percent', 'most_selected'],
    'Most Transferred' : ['transfers_in_event', 'most_transferred_in'],
    'Top Player' : ['','top_element'],
    'Most Captained' : ['','most_captained'],
    'Most Vice Captained' : ['','most_vice_captained'],
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
        
        let stat = CategoryLeaders[category][1];

        let event = overview.events.find(event => event.id === teamInfo.gameweek);



        if (event) {

            let playerId = event[stat as keyof Event];

            return (
                <View style={styles.playerItemContainer}>
                    <Text>{category}</Text>
                </View>
            )
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
                    PlayerItem(category)
                }) }
                {/* <View style={styles.playerContainerRow}>
                    <PlayerView overview={overview} header={'Most Selected'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_selected}/>
                    <PlayerView overview={overview} header={'Most Transferred'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_transferred_in}/>
                    <PlayerView overview={overview} header={'Top Player'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.top_element}/>
                </View>
                <View style={styles.playerContainerRow}>
                    <PlayerView overview={overview} header={'Most Captained'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_captained}/>
                    <PlayerView overview={overview} header={'Most Vice Captained'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_vice_captained}/>
                </View> */}
            </View>
        </View>
    )
}

export default GameweekSummary;

const GameweekSummaryStyles = (theme: Theme) => StyleSheet.create({
    pointsView: {
        flexDirection: 'row', 
        paddingBottom: moderateVerticalScale(10)
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
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center'
    },

    scoreText: {
        fontSize: largeFont,
        color: theme.colors.text,
        paddingTop: moderateVerticalScale(3),
        fontWeight: '500', 
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: -moderateVerticalScale(2),
    },

    playerContainer: {
        flex: 1,
        backgroundColor: 'red'
    },

    playerItemContainer: {
        flexDirection: 'row',
        paddingTop: verticalScale(7),
        paddingBottom: verticalScale(7),
        paddingLeft: moderateScale(5),
        width: '100%',
        height: moderateVerticalScale(50, 0.3)
    }
});