// This will contain understat and fpl data combined in a nice playercard that will help
// ppl see how a player is performing recently as well as on the overall season

import React from "react";
import { Modal, Pressable, View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { StatNames } from "../../Global/Enums";
import globalStyles from "../../Global/GlobalStyles";
import { Emblems, Icons } from "../../Global/Images";
import { PlayerData } from "../../Models/CombinedData";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";

interface PlayerCardProps {
    player: PlayerData;
    teamInfo: TeamInfo;
    overview: FplOverview;
    isVisible: boolean;
    isVisibleFunction : (value: React.SetStateAction<boolean>) => void;
}

function FixturePlayerStatsView(playerData: PlayerData, teamInfo: TeamInfo, overview: FplOverview) {

    if (teamInfo.teamType === TeamTypes.Fixture) {

        let fixtureId = teamInfo.fixture?.id;

        if (teamInfo.fixture) {
            return (
                <View style={{ alignItems: 'center', marginTop: 15, marginBottom: 5}}>
                    <View style={styles.fixtureScoreView}>
                        <View style={styles.emblemView}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_h, overview).code]} resizeMode='contain' />
                        </View>
                        <Text style={[styles.scoreText, {alignSelf: 'center'}]}>{teamInfo.fixture.team_h_score}  -  {teamInfo.fixture.team_a_score}</Text>
                        <View style={styles.emblemView}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_a, overview).code]} resizeMode='contain' />
                        </View>
                        
                    </View>

                    <View style={{flexDirection: 'row', borderColor: 'lightgray', borderBottomWidth: 1, padding: 5}}>
                        <Text style={[styles.statText, {flex: 3}]}>Stat</Text>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.statText}>Value</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={styles.statText}>Points</Text>
                        </View>
                    </View>
                    {
                        playerData.gameweekData.explain.find(game => game.fixture === fixtureId)?.stats.map(stat => 
                                <View key={stat.identifier} style={{flexDirection: 'row', padding: 5}}>
                                    <Text style={[styles.statText, {flex: 3}]}>{StatNames[stat.identifier]}</Text>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <Text style={styles.statText}>{stat.value}</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <Text style={styles.statText}>{stat.points}</Text>
                                    </View>
                                </View>
                            )
                    }
                </View>
            )
        }
    }
    return null;
    
}

const PlayerCard = (props: PlayerCardProps) => {

    return (
        <Modal animationType="fade" transparent={true} visible={props.isVisible}>
            <Pressable style={globalStyles.modalBackground} onPressIn={() => props.isVisibleFunction(false)}/>

            <View style={[globalStyles.modalView, globalStyles.modalShadow, { maxHeight: GlobalConstants.height }]}>
                <Pressable style={globalStyles.closeButton} onPressIn={() => props.isVisibleFunction(false)}>
                    <Image style={{height: '100%', width: '100%'}} source={Icons["close"]} resizeMode="contain"/>
                </Pressable> 
                <ScrollView style={{ flex: 1 }}>
                    { FixturePlayerStatsView(props.player, props.teamInfo, props.overview) }      
                </ScrollView>
                         
            </View>            
        </Modal>
    )
}

const styles = StyleSheet.create(
    {
        fixtureView: {

        },

        statText: {
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.mediumFont,
        },

        fixtureScoreView: {
            flexDirection: 'row', 
            width: '75%', 
            alignSelf: 'center', 
            height: GlobalConstants.height*0.05, 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 10,
        },

        scoreText: {
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.largeFont,
            marginLeft: 5,
            marginRight: 5,
        },

        emblemView: {
            width:'25%',
        },

        emblems: {
            resizeMode: 'contain',
            alignSelf:'center',
            height: '100%',
            width: '100%',
         },

    }
)

export default PlayerCard;