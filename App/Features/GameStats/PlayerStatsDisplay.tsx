import React, { useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Icons, Jerseys, StatImages } from "../../Global/Images";
import { GetFixtureStats, GetPointTotal } from "../../Helpers/FplAPIHelpers";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { Identifier } from "../../Models/FplGameweek";
import PlayerCard from "../../Modals/PlayerModal";
import { FplFixture } from "../../Models/FplFixtures";
import { openPlayerModal } from "../../Store/modalSlice";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
    teamInfo: TeamInfo;
    fixtures: FplFixture[];
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

const FixturesText = (player: PlayerData, fixtures: FplFixture[], overview: FplOverview, teamInfo: TeamInfo) => {

    var playerFixtures = fixtures.filter(fixture => (fixture.event === teamInfo.gameweek) && ((fixture.team_a === player.overviewData.team) || (fixture.team_h === player.overviewData.team)))

    return (
        <Text numberOfLines={1} style={[styles.text, {fontWeight: '400', fontSize: GlobalConstants.smallFont}]}>
            { (playerFixtures.length > 0) ? playerFixtures.map(fixture => (fixture.team_a === player.overviewData.team) ? (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)'
                                                                                          : (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)')
                            .join(', ') : "-" }
        </Text>
    )

}

const PlayerStatsDisplay = (prop: PlayerStatsDisplayProps) => {

    const dispatch = useAppDispatch();

    return (
        <>
        {prop.player.gameweekData &&
        <TouchableOpacity style={styles.container} onPress={() => dispatch(openPlayerModal(prop.player))}>
            { (prop.teamInfo.teamType !== TeamTypes.Empty) &&
            <>
            <View style={{flex:3, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Image style={{alignSelf: 'center', height: (prop.teamInfo.teamType === TeamTypes.Budget || prop.teamInfo.teamType === TeamTypes.Draft) ? '85%' : '75%'}} source={Jerseys[prop.player.overviewData.team_code]} resizeMode="contain"/>

                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: '90%', position: 'absolute'}}>
                    { StatView(prop.player, prop.teamInfo, Identifier.GoalsScored) }
                    { StatView(prop.player, prop.teamInfo, Identifier.Assists) }
                    { StatView(prop.player, prop.teamInfo, Identifier.Saves) }
                    { StatView(prop.player, prop.teamInfo, Identifier.OwnGoals) }
                    <View style={styles.cardsContainer}>
                        { StatView(prop.player, prop.teamInfo, Identifier.YellowCards) }
                        { StatView(prop.player, prop.teamInfo, Identifier.RedCards) }
                    </View> 
                    {(prop.player.gameweekData.stats.in_dreamteam && prop.teamInfo.teamType !== TeamTypes.Dream) &&
                        <View style={styles.dreamTeamContainer}>
                            <Image style={styles.dreamTeamImage} source={Icons['dreamteam']} resizeMode="contain"/>
                        </View>
                    }
                    {((prop.teamInfo.teamType === TeamTypes.Budget || prop.teamInfo.teamType === TeamTypes.Draft) && prop.player.overviewData.status !== 'a') &&
                    <View style={styles.injuredContainer}>
                        <Image style={styles.injuredImage} resizeMode="contain"
                               source={(prop.player.overviewData.status === 'd') ? Icons['doubtful'] : Icons['out']}/>
                    </View>
                    }
                    { ((prop.teamInfo.teamType === TeamTypes.Budget))

                    }
                </View> 
            </View>

            <View style={{flex: (prop.teamInfo.teamType === TeamTypes.Budget || prop.teamInfo.teamType === TeamTypes.Draft) ? 1.5 : 0.75, 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          paddingBottom: 1, 
                          width: (prop.teamInfo.teamType === TeamTypes.Budget || prop.teamInfo.teamType === TeamTypes.Draft) ? '130%' : '95%'}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: GlobalConstants.primaryColor}}>
                    <Text numberOfLines={1} style={[styles.text, {fontSize: GlobalConstants.smallFont * 1.1, fontWeight: '500', paddingLeft: 5, paddingRight: 5}]}>{prop.player.overviewData.web_name}</Text>
                </View>
                <View style={styles.captainAndViceCaptainContainer}>
                    <Text style={{alignSelf: 'center'}}>C</Text>
                </View>
                {(prop.teamInfo.teamType === TeamTypes.Budget || prop.teamInfo.teamType === TeamTypes.Draft) && 
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: GlobalConstants.secondaryColor, paddingLeft: 5, paddingRight: 5, marginTop: -0.1 }}>
                        { FixturesText(prop.player, prop.fixtures, prop.overview, prop.teamInfo)}
                    </View>
                }
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{GetPointTotal(prop.player, prop.teamInfo)}</Text>
                </View>
            </View>
            </>
            }
        </TouchableOpacity>
}
        </>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            height: '100%',
            width: GlobalConstants.width*(1/6),
            justifyContent: 'center',
            alignItems: 'center',
        },

        text: {
            flex: 1, 
            fontSize: GlobalConstants.smallFont, 
            alignSelf: 'center', 
            textAlign:'center',
            color: GlobalConstants.textPrimaryColor,
        },

        //#region Stats
        statsContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: 0,
        },

        cardsContainer: {
            flexDirection: 'row',
            position: "absolute",
            right: 10,
            top: 1,

        },

        dreamTeamContainer: {
            flexDirection: 'row',
            position: "absolute",
            left: -2,
            bottom: 0,
        },

        injuredContainer: {
            flexDirection: 'row',
            position: "absolute",
            right: 5,
            bottom: -7,
        },

        captainAndViceCaptainContainer: {
            position: 'absolute',
            height: '50%',
            aspectRatio: 1,
            top: 0,
            left: 0,
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: GlobalConstants.secondaryColor,
            borderRadius: 100
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

        dreamTeamImage: {
            height: GlobalConstants.width/20,
            width: GlobalConstants.width/20,
            marginRight: 0,
        },

        injuredImage: {
            height: GlobalConstants.width/16,
            width: GlobalConstants.width/16,
        }, 

        captainAndViceCaptainText: {
            color: GlobalConstants.textPrimaryColor,
        },
        //#endregion

        //#region Score
        scoreText: {
            fontSize: GlobalConstants.width*0.028,
            color: GlobalConstants.textPrimaryColor,   
            textAlign: 'center',
            fontWeight: '600', 
        },

        scoreContainer: {
            position: 'absolute',
            top: GlobalConstants.width/19,
            right: 0,
            height: GlobalConstants.width/20,
            aspectRatio: 1,
            backgroundColor: GlobalConstants.secondaryColor,
            color: GlobalConstants.textSecondaryColor,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
        },

        
        //#endregion
    }
);

export default PlayerStatsDisplay;