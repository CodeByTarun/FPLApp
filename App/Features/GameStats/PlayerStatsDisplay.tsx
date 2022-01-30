import React from "react";
import { Image, View, StyleSheet, Text, Falsy, ImageStyle, RecursiveArray, RegisteredStyle } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Jerseys, StatImages } from "../../Global/Images";
import { GetFixtureStats, GetPointTotal } from "../../Helpers/FplAPIHelpers";
import { useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { Identifier } from "../../Models/FplGameweek";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
}

const StatView = (player:PlayerData, teamInfo: TeamInfo, statIdentifier : Identifier) => {
    let stat : number | undefined;

    if (teamInfo.teamType === TeamTypes.Fixture) {
        stat = GetFixtureStats(player, teamInfo, statIdentifier)
    } else {
        stat = player.gameweekData.stats[statIdentifier];
    }

    if (!stat) {
        return null;
    } else {

        if (statIdentifier === Identifier.Saves) {
            stat = Math.floor(stat / 3);
        }

        return <View style={styles.statsContainer}>
                {[...Array(stat)].map((i, index) =>  <Image style={(statIdentifier === Identifier.YellowCards || statIdentifier === Identifier.RedCards) ? styles.cardImage : styles.statsImage} 
                                                            source={StatImages[statIdentifier]} 
                                                            resizeMode="contain" 
                                                            key={index.toString()}/>)}
                </View> 
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
                    { StatView(prop.player, teamInfo, Identifier.GoalsScored) }
                    { StatView(prop.player, teamInfo, Identifier.Assists) }
                    { StatView(prop.player, teamInfo, Identifier.Saves) }
                    { StatView(prop.player, teamInfo, Identifier.OwnGoals) }
                    <View style={styles.cardsContainer}>
                        { StatView(prop.player, teamInfo, Identifier.YellowCards) }
                        { StatView(prop.player, teamInfo, Identifier.RedCards) }
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