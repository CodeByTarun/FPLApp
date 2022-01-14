import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Jerseys } from "../../Global/Images";
import { GetPlayerPointsForAFixture, GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";
import { useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { FixtureInfo } from "../../Store/fixtureSlice";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
}

const GoalView = (player:PlayerData, fixtureInfo: FixtureInfo) => {

    let goalsScored = player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === "goals_scored")?.value;

    if (goalsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(goalsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/goal.png')} resizeMode="contain"/>)}
            </View> 
    }
}

const AssistView = (player:PlayerData, fixtureInfo: FixtureInfo) => {

    let assistsScored = player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === "assists")?.value;

    if (assistsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(assistsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/assist.png')} resizeMode="contain"/>)}
            </View> 
    }

}

const OwnGoalsView = (player:PlayerData, fixtureInfo: FixtureInfo) => { 
    let ownGoalsScored = player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === "own_goals")?.value;

    if (ownGoalsScored === undefined) {
        return null;
    } else {

    return <View style={styles.statsContainer}>
                {[...Array(ownGoalsScored)].map(() =>  <Image style={styles.statsImage} source={require('../../../assets/stats/owngoal.png')} resizeMode="contain"/>)}
            </View> 
    }
}

const PlayerStatsDisplay = (prop: PlayerStatsDisplayProps) => {

    const fixtureInfo = useAppSelector((state) => state.fixture);

    return (
        <View style={styles.container}>
            { (fixtureInfo.fixture !== null && prop.player.gameweekData.explain.find(fixture => fixture.fixture === fixtureInfo.fixture?.id) !== undefined) &&
            <><View style={styles.imageContainer}>

                <Image style={styles.jersey} source={Jerseys[GetTeamDataFromOverviewWithFixtureTeamID(fixtureInfo.isHome ? fixtureInfo.fixture.team_h : fixtureInfo.fixture.team_a, prop.overview).code]} resizeMode="contain"/> 

                <View style={styles.allStatsContainer}>
                    { GoalView(prop.player, fixtureInfo) }
                    { AssistView(prop.player, fixtureInfo) }
                    { OwnGoalsView(prop.player, fixtureInfo) }
                    <View style={styles.cardsContainer}>
                        { (prop.player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === "yellow_cards") !== undefined) &&
                            <Image style={styles.cardImage} source={require('../../../assets/stats/yellowcard.png')} resizeMode="contain"/>
                        }
                        { (prop.player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === "red_cards") !== undefined) &&
                            <Image style={styles.cardImage} source={require('../../../assets/stats/redcard.png')} resizeMode="contain"/>
                        }
                    </View> 
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{GetPlayerPointsForAFixture(prop.player, fixtureInfo)}</Text>
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
            height: '80%',
            width: '70%',
            marginTop: 5
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
            marginTop: -1
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