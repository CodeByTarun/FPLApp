import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Jerseys } from "../../Global/Images";
import { GetFixturePlayerData, GetPlayerPointsForAFixture, GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";
import { useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { FixtureInfo, TeamInfo, TeamTypes } from "../../Store/teamSlice";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
}

function GetFixtureStats(player: PlayerData, fixtureInfo: FixtureInfo, identifier: string) {
    return player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === identifier)?.value;
}

const GoalView = (player:PlayerData, teamInfo: TeamInfo) => {

    let goalsScored : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        goalsScored = GetFixtureStats(player, teamInfo, "goals_scored")
    } else {
        goalsScored = player.gameweekData.stats.assists;
    }

    if (goalsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(goalsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/goal.png')} resizeMode="contain"/>)}
            </View> 
    }
}

const AssistView = (player:PlayerData, teamInfo: TeamInfo) => {

    let assistsScored : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        assistsScored = GetFixtureStats(player, teamInfo, "assists")
    } else {
        assistsScored = player.gameweekData.stats.goals_scored;
    }

    if (assistsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(assistsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/assist.png')} resizeMode="contain"/>)}
            </View> 
    }

}

const OwnGoalsView = (player:PlayerData, teamInfo: TeamInfo) => { 
    
    let ownGoalsScored : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        ownGoalsScored = GetFixtureStats(player, teamInfo, "own_goals")
    } else {
        ownGoalsScored = player.gameweekData.stats.own_goals;
    }

    if (ownGoalsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(ownGoalsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/owngoal.png')} resizeMode="contain"/>)}
            </View> 
    }
}

const SavesView = (player:PlayerData, teamInfo: TeamInfo) => { 
    
    let saves : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        saves = GetFixtureStats(player, teamInfo, "saves")
    } else {
        saves = player.gameweekData.stats.saves;
    }

    if (saves === undefined) {
        return null;
    } else {

        saves = Math.floor(saves / 3);

        return <View style={styles.statsContainer}>
                    {[...Array(saves)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/penaltysave.png')} resizeMode="contain"/>)}
                </View> 
    }
}

const YellowCardView = (player: PlayerData, teamInfo: TeamInfo) => {
    let yellowCards : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        yellowCards = GetFixtureStats(player, teamInfo, "yellow_cards")
    } else {
        yellowCards = player.gameweekData.stats.yellow_cards;
    }

    if (yellowCards === undefined) {
        return null;
    } else {

        return  <>{[...Array(yellowCards)].map(() =>  <Image style={styles.cardImage} source={require('../../../assets/stats/yellowcard.png')} resizeMode="contain"/>)}</>
    }
}

const RedCardView = (player: PlayerData, teamInfo: TeamInfo) => {
    let redCards : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        redCards = GetFixtureStats(player, teamInfo, "red_cards")
    } else {
        redCards = player.gameweekData.stats.red_cards;
    }

    if (redCards === undefined) {
        return null;
    } else {

        return  <>{[...Array(redCards)].map(() => <Image style={styles.cardImage} source={require('../../../assets/stats/redcard.png')} resizeMode="contain"/>)}</>
    }
}

function GetPointTotal(player: PlayerData, teamInfo: TeamInfo): number {
    
    if (teamInfo.teamType === TeamTypes.Fixture) {
        return GetPlayerPointsForAFixture(player, teamInfo);
    } else {
        return player.gameweekData.stats.total_points;
    }
}

const PlayerStatsDisplay = (prop: PlayerStatsDisplayProps) => {

    const teamInfo = useAppSelector((state) => state.team);

    return (
        <View style={styles.container}>
            { (teamInfo.teamType !== TeamTypes.Empty) &&
            <><View style={styles.imageContainer}>

                <Image style={styles.jersey} source={Jerseys[prop.player.overviewData.team_code]} resizeMode="contain"/> 

                <View style={styles.allStatsContainer}>
                    { GoalView(prop.player, teamInfo) }
                    { AssistView(prop.player, teamInfo) }
                    { SavesView(prop.player, teamInfo) }
                    { OwnGoalsView(prop.player, teamInfo) }
                    <View style={styles.cardsContainer}>
                        { YellowCardView(prop.player, teamInfo) }
                        { RedCardView(prop.player, teamInfo) }
                    </View> 
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{GetPointTotal(prop.player, teamInfo)}</Text>
                </View>   

            </View>
            <Text style={styles.text}>{prop.player.overviewData.web_name}</Text></>
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            padding: 5,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },

        imageContainer: {
            height: '75%',
            width: GlobalConstants.width/6,
            flex:1,
            alignItems: 'center',
        },

        jersey: {
            position: 'absolute',
            alignSelf: 'center',
            height: '75%',
            width: '70%',
            marginTop: 8
        },

        //#region Stats
        allStatsContainer: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: "100%",
            height: "100%",
        },

        statsContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: 6,
        },

        cardsContainer: {
            flexDirection: 'row',
            position: "absolute",
            right: 18,
            top: -1,

        },

        statsImage: {
            height: GlobalConstants.width/26,
            width: GlobalConstants.width/26,
            marginRight: -8,
        },

        cardImage: {
            height: GlobalConstants.width/20,
            width: GlobalConstants.width/20,
            marginRight: -13,
            marginTop: -1,
            transform: [{ rotate: "337deg" }]
        },
        //#endregion

        //#region Score
        scoreText: {
            fontSize: GlobalConstants.width*0.03,
            position: "absolute",
            overflow: 'hidden',
        },

        scoreContainer: {
            height: GlobalConstants.width/24,
            width: GlobalConstants.width/24,
            borderRadius: GlobalConstants.width/24/2,
            backgroundColor: GlobalConstants.tertiaryColor,
            color: GlobalConstants.textSecondaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 7,
            bottom: 0

        },
        //#endregion
        
        text: {
            fontSize: GlobalConstants.width*0.025,
            textAlign: 'center',
            height: "20%",
            backgroundColor: GlobalConstants.secondayColor,
            color: GlobalConstants.textPrimaryColor,
            padding: 2,
            marginTop: 2,    
        }
    }
);

export default PlayerStatsDisplay;