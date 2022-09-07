import React, { useCallback } from "react";
import { Image, View, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"
import { PlayerData } from "../../Models/CombinedData";
import { Icons, Jerseys, StatImages } from "../../Global/Images";
import { GetFixtureStats, GetPlayerScoreAndFixtureText } from "../../Helpers/FplAPIHelpers";
import { useAppDispatch } from "../../Store/hooks";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { Identifier } from "../../Models/FplGameweek";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";
import { PlayerStatsDisplayStyles } from "./PlayerStatsDisplayStyles";
import FixtureDifficultyDisplay from "./FixtureDifficultyDisplay";
import { AnimatedButton } from "../Controls";
import { changePlayerModalInfo } from "../../Store/modalSlice";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";

interface PlayerStatsDisplayProps {
    player: PlayerData;
    overview: FplOverview;
    teamInfo: TeamInfo;
    fixtures: FplFixture[];
    viewIndex: number;
}

const StatView = (player:PlayerData, teamInfo: TeamInfo, statIdentifier : Identifier, styles) => {
    let stat : number | undefined;

    if (!player.gameweekData) return null;

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
                                                            testID={statIdentifier} 
                                                            resizeMode="contain" 
                                                            key={index.toString()}/>)}
                </View> 
    }
}

const singleStatView = (label: string, value: number | string, theme: Theme) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: GlobalConstants.smallFont, color: theme.colors.notification, fontFamily: GlobalConstants.defaultFont, alignSelf: 'center'}}>{label}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 0}}>
                <Text style={{fontSize: GlobalConstants.smallFont * 1.2, color: theme.colors.text, fontFamily: GlobalConstants.defaultFont,
                                textAlign: 'right', alignSelf: 'flex-end'}}>{value}</Text>
            </View>
        </View>
    )
}

const PlayerStatsDisplay = ({player, overview, teamInfo, fixtures, viewIndex}: PlayerStatsDisplayProps) => {

    const theme = useTheme();
    const styles = PlayerStatsDisplayStyles(theme);

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const openPlayerModal = useCallback(() => {
        dispatch(changePlayerModalInfo(player));
        navigation.navigate('PlayerModal');
    }, [player])

    return (
        <>
        {(teamInfo.teamType !== TeamTypes.Empty) &&
        <AnimatedButton buttonFn={openPlayerModal}>
            <View testID="playerStatsDisplayButton" style={styles.container} >
                { viewIndex === 0 &&
                <>
                <View testID="statsViewContainer" style={styles.imagesContainer}>
                    <Image testID="playerStatsJersey" style={styles.jerseyImage} source={Jerseys[player.overviewData.team_code]} resizeMode="contain"/>

                    <View style={styles.allStatsContainer}>
                        { StatView(player, teamInfo, Identifier.GoalsScored, styles) }
                        { StatView(player, teamInfo, Identifier.Assists, styles) }
                        { StatView(player, teamInfo, Identifier.Saves, styles) }
                        { StatView(player, teamInfo, Identifier.OwnGoals, styles) }
                        <View style={styles.cardsContainer}>
                            { StatView(player, teamInfo, Identifier.YellowCards, styles) }
                            { StatView(player, teamInfo, Identifier.RedCards, styles) }
                        </View> 
                        {(teamInfo.teamType !== TeamTypes.Dream && player.gameweekData && player.gameweekData.stats.in_dreamteam) &&
                            <View testID="dreamTeamPlayerStats" style={styles.dreamTeamContainer}>
                                <Image testID="dreamTeamIconPlayerStats" style={styles.dreamTeamImage} source={Icons['dreamteam']} resizeMode="contain"/>
                            </View>
                        }
                        {((teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft || teamInfo.teamType === TeamTypes.Fixture) && player.overviewData.status !== 'a') &&
                        <View testID="injuryIndicatorPlayerStats" style={styles.injuredContainer}>
                            <Image style={styles.injuredImage} resizeMode="contain" testID="injuryIndicatorImagePlayerStats"
                                source={(player.overviewData.status === 'd') ? Icons['doubtful'] : Icons['out']}/>
                        </View>
                        }
                    </View> 
                </View>

                <View testID="scoreAndNameContainer" style={[styles.scoreAndNameContainer, {width: (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) ? '115%' : '95%'}]}>
                    { ((teamInfo.teamType === TeamTypes.Budget) && (player.isCaptain || player.isViceCaptain)) &&
                            <View testID="captainAndViceCaptainPlayerStats" style={[styles.captainAndViceCaptainContainer, globalStyles.modalShadow]}>
                                <Text style={styles.captainAndViceCaptainText}>{player.isCaptain ? "C" : "V"}</Text>
                            </View>
                    }
                    <View style={styles.nameContainer}>
                        <Text numberOfLines={1} style={[styles.text, styles.nameText]}>{player.overviewData.web_name}</Text>
                    </View>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.text}>{GetPlayerScoreAndFixtureText(player, teamInfo, fixtures, overview)}</Text>
                    </View>
                </View>
                </>
                }
                { (viewIndex !== 0) &&
                    <View style={[styles.playerInfoCardContainer, globalStyles.tabShadow]}>
                        <View testID="infoCardContainerPlayerStats" style={styles.infoCardContainer}>
                            {(viewIndex === 1) && 
                            <>
                                {singleStatView('Cost', '£' + (player.overviewData.now_cost / 10).toFixed(1), theme)}
                                {singleStatView('Sel.', player.overviewData.selected_by_percent + '%', theme)}
                                {singleStatView('Form', player.overviewData.form, theme)}
                            </>
                            }
                            { (viewIndex === 2) && 
                            <>
                                {singleStatView('PTS', player.overviewData.event_points, theme)}
                                {singleStatView('xPTS', player.overviewData.ep_this, theme)}
                                <Text style={styles.nextWeekText}>Next Week</Text>
                                {singleStatView('xPTS', player.overviewData.ep_next, theme)}
                            </>
                            }
                            { (viewIndex === 3) && 
                                <FixtureDifficultyDisplay overview={overview} fixtures={fixtures} player={player}/>
                            }
                        </View>
                        <View testID="infoCardNamePlayerStats" style={styles.infoCardNameContainer}>
                            <Text numberOfLines={1} style={styles.infoCardNameText}>{player.overviewData.web_name}</Text>
                        </View>
                    </View>
                }
            </View>
        </AnimatedButton>
}
        </>
    )
}

export default PlayerStatsDisplay;