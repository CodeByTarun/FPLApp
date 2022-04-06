import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Icons, Jerseys, StatImages } from "../../Global/Images";
import { GetFixtureStats, GetPointTotal } from "../../Helpers/FplAPIHelpers";
import { useAppDispatch } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { Identifier } from "../../Models/FplGameweek";
import { FplFixture } from "../../Models/FplFixtures";
import { openPlayerModal } from "../../Store/modalSlice";
import globalStyles from "../../Global/GlobalStyles";
import { DifficultyColors } from "../../Global/EnumsAndDicts";
import { styles } from "./PlayerStatsDisplayStyles";
import FixtureDifficultyDisplay from "./FixtureDifficultyDisplay";

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
                                                                    " " + (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)' :
                                                                    " " + (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)') : '')

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
            <View style={styles.imagesContainer}>
                <Image style={styles.jerseyImage} source={Jerseys[player.overviewData.team_code]} resizeMode="contain"/>

                <View style={styles.allStatsContainer}>
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

            <View style={[styles.scoreAndNameContainer, {width: (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) ? '130%' : '95%'}]}>
                <View style={styles.nameContainer}>
                    <Text numberOfLines={1} style={[styles.text, styles.nameText]}>{player.overviewData.web_name}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    { ScoreAndFixtureText(player, fixtures, overview, teamInfo)}
                </View>
            </View>
            </>
            }
            { (viewIndex !== 0) &&
                <View style={[styles.playerInfoCardContainer, globalStyles.tabShadow]}>
                    <View style={styles.infoCardContainer}>
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
                            <Text style={styles.nextWeekText}>Next Week</Text>
                            {singleStatView('xPTS', player.overviewData.ep_next)}
                        </>
                        }
                        { (viewIndex === 3) && 
                            <FixtureDifficultyDisplay overview={overview} fixtures={fixtures} player={player} currentGameweek={currentGameweek}/>
                        }
                    </View>
                    <View style={styles.infoCardNameContainer}>
                        <Text numberOfLines={1} style={styles.infoCardNameText}>{player.overviewData.web_name}</Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
}
        </>
    )
}

export default PlayerStatsDisplay;