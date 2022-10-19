// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { GetPlayerGameweekDataSortedByPosition } from "../../../Helpers/FplAPIHelpers";
import { FplGameweek } from "../../../Models/FplGameweek";
import { FplOverview } from "../../../Models/FplOverview";
import { BudgetInfo, changeToEmpty, DraftInfo, TeamInfo, TeamTypes } from "../../../Store/teamSlice";
import { FplDraftGameweekPicks } from "../../../Models/FplDraftGameekPicks";
import { FplManagerGameweekPicks } from "../../../Models/FplManagerGameweekPicks";
import { FplDraftOverview } from "../../../Models/FplDraftOverview";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplDraftUserInfo } from "../../../Models/FplDraftUserInfo";
import { FplManagerInfo } from "../../../Models/FplManagerInfo";
import { PlayerData } from "../../../Models/CombinedData";
import { LineupStyles } from "./LineupStyles";
import ManagerInfoCard from "./ManagerInfoCard/ManagerInfoCard";
import PlayerStatsDisplay from "../../PlayerStatsDisplay";
import AdditionalInfoCard from "./AdditionalInfoCard";
import BonusPointView from "./BonusPointView";
import KingsOfTheGameweekView from "./KingsOfTheGameweekView";
import { animated, useTransition } from "@react-spring/native";
import globalStyles from "../../../Global/GlobalStyles";
import { useTheme } from "@react-navigation/native";
import { useAppDispatch } from "../../../Store/hooks";

const AnimatedView = animated(View);

function CreatePlayerStatsView(players: PlayerData[], overview: FplOverview, fixtures: FplFixture[], teamInfo: TeamInfo, viewIndex: number, styles) {

    try {
        const playerStatsView = [];

        if (players) {
            let i = 0;
            let elementType = 1;
            let remainder = 0;
            const numberOfPlayersAllowedInARow = 6;
            let lineupPlayers = players;

            if (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) {
                lineupPlayers = players.slice(0, 11);
            }

            while (i < lineupPlayers.length) {

                let positionCount = lineupPlayers.filter(player => player.overviewData.element_type == elementType).length;
                
                if (positionCount + remainder > numberOfPlayersAllowedInARow) {
                    remainder = remainder + (positionCount - numberOfPlayersAllowedInARow);
                    positionCount = numberOfPlayersAllowedInARow;
                } else {
                    positionCount = positionCount + remainder;
                    remainder = 0;
                }

                playerStatsView.push(
                    <View style={styles.playerRowContainer} key={elementType}>
                        { lineupPlayers.slice(i, i + positionCount).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} 
                                                                                                            fixtures={fixtures} teamInfo={teamInfo}
                                                                                                                viewIndex={viewIndex}/> })}
                    </View>
                )

                i += positionCount;
                elementType += 1;
            }
        }

        // Adds another row if no forwards have played for the team
        if (playerStatsView.length === 3) {
            playerStatsView.push(<View key={4} style={{flex: 1}}/>);
        }

        return playerStatsView;
    } 
    catch (error) {
        return <></>
    }
}

function CreateBenchView(players: PlayerData[], overview: FplOverview, fixtures: FplFixture[], teamInfo: DraftInfo | BudgetInfo, viewIndex: number, styles) {

    try {
        const playerStatsView = [];
        
        if (players) {
            playerStatsView.push(
                <View style={[styles.playerRowContainer, {paddingBottom: 2}]} key={5}>
                    { players.slice(11, 15).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} 
                                                                                    fixtures={fixtures} teamInfo={teamInfo}
                                                                                    viewIndex={viewIndex}/> })}
                </View>
            )
        }

        return playerStatsView;
    }
    catch (error) {
        return <></>
    }
}

const viewIndexScenes = ["Lineup", "More Info", "Points", "Fixtures"];

interface LineupProps {
    overview: FplOverview;
    teamInfo: TeamInfo;
    fixtures: FplFixture[];
    gameweek: FplGameweek;
    draftGameweekPicks? : FplDraftGameweekPicks;
    draftOverview? : FplDraftOverview;
    budgetGameweekPicks? : FplManagerGameweekPicks;
    draftUserInfo? : FplDraftUserInfo;
    budgetUserInfo? : FplManagerInfo;
}

const Lineup = ({overview, teamInfo, fixtures, gameweek, draftGameweekPicks, draftOverview, budgetGameweekPicks, budgetUserInfo, draftUserInfo} : LineupProps) => {

    const theme = useTheme();
    const styles = LineupStyles(theme);

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo, draftOverview, draftGameweekPicks, budgetGameweekPicks);

    const [viewIndex, setViewIndex] = useState(0); 

    useEffect(function gameweekChanged() {
        if (viewIndex !== 0) {
            setViewIndex(0);
        }
        
        
    }, [teamInfo.gameweek, teamInfo.teamType])

    const bonusPointsViewTransition = useTransition((teamInfo.teamType === TeamTypes.Fixture), {
        from: { top: '100%' },
        enter: { top: '0%' },
    });

    const kingsOfTheGameweekViewTransition = useTransition((teamInfo.teamType === TeamTypes.Dream), {
        from: { top: '100%' },
        enter: { top: '0%' },
    });

    const cardTransition = useTransition(((teamInfo.teamType === TeamTypes.Budget) || (teamInfo.teamType === TeamTypes.Draft)), {
        from: { bottom: '100%' },
        enter: { bottom: '0%' },
        initial: {bottom: '100%'}
    });

    return (
        <>
        {(teamInfo.teamType !== TeamTypes.Empty && players) &&
        <View style={{flex: 1}}>
            <View style={styles.topContainer}>
                <View style={styles.fieldContainer}>
                    <Image style={styles.field} source={theme.dark ? require('../../../../assets/fielddark.jpg') : require('../../../../assets/field.jpg')} resizeMode={'contain'}/>
                </View>
                    { players &&
                        <View testID="fixtureOrDreamTeamPlayersStatsView" style={styles.playerContainer}>
                            {CreatePlayerStatsView(players, overview, fixtures, teamInfo, viewIndex, styles)}
                        </View>
                    }
                    {((teamInfo.teamType === TeamTypes.Budget && budgetGameweekPicks) || 
                      (teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftOverview)) && 
                       players &&
                        <>
                            <View style={styles.managerInfoCardContainer}>
                                { cardTransition((animatedStyles) => (teamInfo.teamType === TeamTypes.Budget) &&
                                    <AnimatedView style={[{height: '100%', width: '100%', bottom: animatedStyles.bottom}]}>
                                        <ManagerInfoCard teamInfo={teamInfo} players={players} budgetGameweekPicks={budgetGameweekPicks} budgetManagerInfo={budgetUserInfo}/>
                                    </AnimatedView>
                                )}
                                { cardTransition((animatedStyles) => (teamInfo.teamType === TeamTypes.Draft) &&
                                    <AnimatedView style={[{height: '100%', width: '100%', bottom: animatedStyles.bottom}]}>
                                        <ManagerInfoCard teamInfo={teamInfo} players={players} draftManagerInfo={draftUserInfo}/>
                                    </AnimatedView>
                                )}
                            </View>
                            <View style={styles.additionalInfoCardContainer}>
                            { cardTransition((animatedStyles) => (teamInfo.gameweek === teamInfo.liveGameweek) &&
                                <AnimatedView style={[{height: '100%', width: '100%', bottom: animatedStyles.bottom}]}>
                                    <AdditionalInfoCard viewIndex={viewIndex} setViewIndex={setViewIndex} viewIndexScenes={viewIndexScenes}/>
                                </AnimatedView>

                            )}
                            </View>
                        </>
                    }
                    
            </View>
            <View style={styles.bottomContainer}> 
    
                { bonusPointsViewTransition((animatedStyles) => (teamInfo.teamType === TeamTypes.Fixture)  && 
                    <AnimatedView style={[{height: '100%', width: '100%', top: animatedStyles.top}]}>
                        {teamInfo.fixture?.started ?
                        <BonusPointView overviewData={overview} fixturesData={fixtures} teamInfo={teamInfo}/> :
                        <View style={[globalStyles.shadow, styles.unstartedFixtureView]}>
                            <Text style={styles.unstartedFixtureViewText} >Most Played 11 with Total Points</Text>
                        </View>
                        } 
                    </AnimatedView>
                )} 
                { kingsOfTheGameweekViewTransition((animatedStyles) => (teamInfo.teamType === TeamTypes.Dream) && 
                    <AnimatedView style={[{height: '100%', width: '100%', top: animatedStyles.top}]}>
                        <KingsOfTheGameweekView overviewData={overview}/>
                    </AnimatedView>
                )}
                {((teamInfo.teamType === TeamTypes.Budget && budgetGameweekPicks) || (teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftOverview)) && players &&
                    <>
                    { CreateBenchView(players, overview, fixtures, teamInfo, viewIndex, styles) }
                    </>
                }

            </View>
        </View>
        }
        </>
    )
}

export default Lineup;