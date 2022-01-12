import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Player } from "../../Models/FplGameweek";

interface PlayerStatsDisplayProps {
    player: PlayerData;
}

const PlayerStatsDisplay = (prop: PlayerStatsDisplayProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image style={styles.jersey} source={require('../../../assets/jerseys/8.png')} resizeMode="contain"/> 

                <View style={styles.allStatsContainer}>
                    <View style={styles.statsContainer}>
                        <Image style={styles.statsImage} source={require('../../../assets/stats/goal.png')} resizeMode="contain"/>
                    </View> 
                    <View style={styles.statsContainer}>
                        <Image style={styles.statsImage} source={require('../../../assets/stats/assist.png')} resizeMode="contain"/>
                    </View> 
                    <View style={styles.cardsContainer}>
                        <Image style={styles.cardImage} source={require('../../../assets/stats/yellowcard.png')} resizeMode="contain"/>
                        <Image style={styles.cardImage} source={require('../../../assets/stats/redcard.png')} resizeMode="contain"/>
                    </View> 
                </View>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{prop.player.gameweekData.stats.total_points}</Text>
                </View>   

            </View>
            <Text style={styles.text}>{prop.player.overviewData.web_name}</Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            padding: 5,
            height: '100%',
            width: GlobalConstants.width/6,
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
            height: '100%',
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
            justifyContent: 'flex-start'
        },

        cardsContainer: {
            flexDirection: 'row',
            position: "absolute",
            right: 15,
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
            right: 5,
            bottom: 0

        },
        //#endregion
        
        text: {
            fontSize: GlobalConstants.width*0.025,
            textAlign: 'center',
            backgroundColor: GlobalConstants.secondayColor,
            color: GlobalConstants.textPrimaryColor,
            padding: 2,
            marginTop: 2,
            borderRadius: 3,
            overflow: 'hidden'            
        }
    }
);

export default PlayerStatsDisplay;