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
import { typeParameterInstantiation } from "@babel/traverse/node_modules/@babel/types";
import FixtureDifficultyList from "../PlayerStats/FixtureDifficultyList";
import globalStyles from "../../Global/GlobalStyles";
import { DifficultyColors } from "../../Global/EnumsAndDicts";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
    teamInfo: TeamInfo;
    fixtures: FplFixture[];
    viewIndex: number;
    currentGameweek: number;
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

const ScoreAndFixtureText = (player: PlayerData, fixtures: FplFixture[], overview: FplOverview, teamInfo: TeamInfo) => {

    if ((teamInfo.teamType !== TeamTypes.Budget && teamInfo.teamType !== TeamTypes.Draft)) {
        return <Text style={styles.text}>{GetPointTotal(player, teamInfo)}</Text>
    }

    var playerFixtures = fixtures.filter(fixture => (fixture.event === teamInfo.gameweek) && ((fixture.team_a === player.overviewData.team) || (fixture.team_h === player.overviewData.team)))

    if (playerFixtures.length === 0) {
        return <Text style={styles.text}>-</Text>
    } 
    else if (!playerFixtures.some(fixture => (fixture.started === false))) {
        return <Text style={styles.text}>{GetPointTotal(player, teamInfo)}</Text>
    }
    else if (playerFixtures.some(fixture => (fixture.started === true))) {
        if (playerFixtures.length === 1) {
            return <Text style={styles.text}>{GetPointTotal(player, teamInfo)}</Text>
        }
        else {
            let scoreText = GetPointTotal(player, teamInfo).toString();
            let fixtureText = playerFixtures.map(fixture => (fixture.started === false) ?  
                                                                ((fixture.team_a === player.overviewData.team) ? 
                                                                    "," + (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)' :
                                                                    "," + (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)') : '')

            return <Text style={styles.text}>{scoreText + fixtureText}</Text>
        }
    }
    else {
        return (
            <Text numberOfLines={1} style={styles.text}>
                { playerFixtures.map(fixture => ((fixture.team_a === player.overviewData.team) ? (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)'
                                                                                              : (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)'))
                                .join(', ')}
            </Text>
        )
    }  
}

const singleStatView = (label: string, value: number | string) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: GlobalConstants.smallFont, color: GlobalConstants.textSecondaryColor, 
                            fontWeight: '500', alignSelf: 'center'}}>{label}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 0}}>
                <Text style={{fontSize: GlobalConstants.smallFont * 1.2, color: GlobalConstants.textPrimaryColor, 
                                textAlign: 'right', fontWeight: '500', alignSelf: 'flex-end'}}>{value}</Text>
            </View>
        </View>
    )
}

const PlayerStatsDisplay = ({player, overview, teamInfo, fixtures, viewIndex, currentGameweek}: PlayerStatsDisplayProps) => {

    const dispatch = useAppDispatch();

    return (
        <>
        {(player.gameweekData && teamInfo.teamType !== TeamTypes.Empty) &&
        <TouchableOpacity style={styles.container} onPress={() => dispatch(openPlayerModal(player))}>
            { viewIndex === 0 &&
            <>
            <View style={{flex:3, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <Image style={{alignSelf: 'center', height: '85%'}} source={Jerseys[player.overviewData.team_code]} resizeMode="contain"/>

                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', width: '90%', height: '90%', position: 'absolute'}}>
                    { StatView(player, teamInfo, Identifier.GoalsScored) }
                    { StatView(player, teamInfo, Identifier.Assists) }
                    { StatView(player, teamInfo, Identifier.Saves) }
                    { StatView(player, teamInfo, Identifier.OwnGoals) }
                    <View style={styles.cardsContainer}>
                        { StatView(player, teamInfo, Identifier.YellowCards) }
                        { StatView(player, teamInfo, Identifier.RedCards) }
                    </View> 
                    {(player.gameweekData.stats.in_dreamteam && teamInfo.teamType !== TeamTypes.Dream) &&
                        <View style={styles.dreamTeamContainer}>
                            <Image style={styles.dreamTeamImage} source={Icons['dreamteam']} resizeMode="contain"/>
                        </View>
                    }
                    {((teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) && player.overviewData.status !== 'a') &&
                    <View style={styles.injuredContainer}>
                        <Image style={styles.injuredImage} resizeMode="contain"
                               source={(player.overviewData.status === 'd') ? Icons['doubtful'] : Icons['out']}/>
                    </View>
                    }
                    { ((teamInfo.teamType === TeamTypes.Budget) && (player.isCaptain || player.isViceCaptain)) &&
                    <View style={styles.captainAndViceCaptainContainer}>
                        <Text style={styles.captainAndViceCaptainText}>{player.isCaptain ? "C" : "V"}</Text>
                    </View>
                    }
                </View> 
            </View>

            <View style={{flex: 1.5, 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          paddingBottom: 1, 
                          width: (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) ? '130%' : '95%'}}>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: GlobalConstants.primaryColor}}>
                    <Text numberOfLines={1} style={[styles.text, {fontWeight: '500', paddingLeft: 5, paddingRight: 5}]}>{player.overviewData.web_name}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: GlobalConstants.secondaryColor, paddingLeft: 5, paddingRight: 5, marginTop: -0.1 }}>
                    { ScoreAndFixtureText(player, fixtures, overview, teamInfo)}
                </View>
            </View>
            </>
            }
            { (viewIndex !== 0) &&
                <View style={[{height: '95%', width: '110%', margin: 10, backgroundColor: GlobalConstants.primaryColor, 
                              borderRadius: GlobalConstants.cornerRadius}, globalStyles.tabShadow]}>
                    <View style={{flex: 4, padding: 3}}>
                        {(viewIndex === 1) && 
                        <>
                            {singleStatView('Cost', '£' + (player.overviewData.now_cost / 10).toFixed(1))}
                            {singleStatView('Sel.', player.overviewData.selected_by_percent + '%')}
                            {singleStatView('Form', player.overviewData.form)}
                        </>
                        }
                        { (viewIndex === 2) && 
                        <>
                            {singleStatView('PTS', player.overviewData.event_points)}
                            {singleStatView('xPTS', player.overviewData.ep_this)}
                            <Text style={{color: GlobalConstants.textSecondaryColor, fontSize: GlobalConstants.smallFont*0.9,
                                          fontWeight: '400', alignSelf: 'center', paddingTop: 0}}>Next Week</Text>
                            {singleStatView('xPTS', player.overviewData.ep_next)}
                        </>
                        }
                        { (viewIndex === 3) && 
                        <>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[styles.fixtureViewText, {color: GlobalConstants.textSecondaryColor, fontWeight: '600'}]}>GW</Text>
                            <Text style={[styles.fixtureViewText, {flex: 2, color: GlobalConstants.textSecondaryColor, fontWeight: '600'}]}>Opp</Text>
                        </View>
                        { fixtures.filter((fixture) => (fixture.team_a === player.overviewData.team || fixture.team_h === player.overviewData.team) && 
                                                       (fixture.event && fixture.event >= currentGameweek + 1)).slice(0,5).map(fixture => {
                                                           return (
                                                               <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'row', marginTop: -1,
                                                                             backgroundColor: DifficultyColors[fixture.team_a === player.overviewData.team ? fixture.team_a_difficulty : fixture.team_h_difficulty]}}
                                                                     key={fixture.id}>
                                                                   <Text style={styles.fixtureViewText}>{fixture.event}</Text>
                                                                   <Text style={[styles.fixtureViewText, {flex: 2}]}>{fixture.team_a === player.overviewData.team ? overview.teams.find(team => team.id === fixture.team_h)?.short_name + '(A)' : 
                                                                                                                                            overview.teams.find(team => team.id === fixture.team_a)?.short_name + '(H)'}</Text>
                                                               </View>
                                                           )
                                                       })}
                        </>
                        }
                    </View>
                    <View style={{flex: 1, backgroundColor: GlobalConstants.secondaryColor, alignItems: 'center', justifyContent: 'center',
                                  borderBottomRightRadius: GlobalConstants.cornerRadius, borderBottomLeftRadius: GlobalConstants.cornerRadius}}>
                        <Text numberOfLines={1} style={{fontWeight: '600', paddingLeft: 5, paddingRight: 5, 
                                                        fontSize: GlobalConstants.smallFont * 1.1, textAlign: 'center',
                                                        color: GlobalConstants.textPrimaryColor}}>{player.overviewData.web_name}</Text>
                    </View>
                </View>
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
            fontSize: GlobalConstants.smallFont* 1.1,
            fontWeight: '700', 
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
            zIndex: 1,
        },

        injuredContainer: {
            flexDirection: 'row',
            position: "absolute",
            right: 5,
            bottom: -7,
        },

        captainAndViceCaptainContainer: {
            position: 'absolute',
            height: '30%',
            aspectRatio: 1,
            bottom: 0,
            right: -10,
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: GlobalConstants.primaryColor,
            borderRadius: 100
        },

        statsImage: {
            aspectRatio: 1,
            width: GlobalConstants.width/26,
            marginRight: -8,
        },

        cardImage: {
            aspectRatio: 1,
            width: GlobalConstants.width/24,
            marginRight: -10,
            marginTop: 0,
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
            alignSelf: 'center',
            fontSize: GlobalConstants.smallFont * 1.3,
            fontWeight: '800',
            textAlign: 'center'
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
        
        detailedStatsText: { 
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.smallFont * 0.9,
            textAlign: 'center'
        },

        fixtureViewText: {
            fontSize: GlobalConstants.smallFont * 0.9, 
            color: 'black', 
            fontWeight: '400', 
            alignSelf: 'center',
            flex: 1,
            textAlign:'center'
        },
    }
);

export default PlayerStatsDisplay;