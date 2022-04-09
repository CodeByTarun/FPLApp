// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { GetPlayerGameweekDataSortedByPosition } from "../../../Helpers/FplAPIHelpers";
import { FplGameweek } from "../../../Models/FplGameweek";
import { FplOverview } from "../../../Models/FplOverview";
import { BudgetInfo, DraftInfo, TeamInfo, TeamTypes } from "../../../Store/teamSlice";
import { FplDraftGameweekPicks } from "../../../Models/FplDraftGameekPicks";
import { FplManagerGameweekPicks } from "../../../Models/FplManagerGameweekPicks";
import { FplDraftOverview } from "../../../Models/FplDraftOverview";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplDraftUserInfo } from "../../../Models/FplDraftUserInfo";
import { FplManagerInfo } from "../../../Models/FplManagerInfo";
import { PlayerData } from "../../../Models/CombinedData";
import { styles } from "./LineupStyles";
import ManagerInfoCard from "./ManagerInfoCard/ManagerInfoCard";
import PlayerStatsDisplay from "../../PlayerStatsDisplay";
import AdditionalInfoCard from "./AdditionalInfoCard";
import BonusPointView from "./BonusPointView";
import KingsOfTheGameweekView from "./KingsOfTheGameweekView";
import { cornerRadius, secondaryColor } from "../../../Global/GlobalConstants";

function CreatePlayerStatsView(players: PlayerData[], overview: FplOverview, fixtures: FplFixture[], teamInfo: TeamInfo, viewIndex: number, currentGameweek: number) {

    const playerStatsView = [];

    if (players !== null) {
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
                remainder = remainder + positionCount - numberOfPlayersAllowedInARow;
                positionCount = numberOfPlayersAllowedInARow;
            } else {
                positionCount = positionCount + remainder;
                remainder = 0;
            }

            playerStatsView.push(
                <View style={styles.playerRowContainer} key={elementType}>
                    { lineupPlayers.slice(i, i + positionCount).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} 
                                                                                                           fixtures={fixtures} teamInfo={teamInfo}
                                                                                                           viewIndex={viewIndex} currentGameweek={currentGameweek}/> })}
                </View>
            )

            i += positionCount;
            elementType += 1;
        }
    }

    return playerStatsView;
}

function CreateBenchView(players: PlayerData[], overview: FplOverview, fixtures: FplFixture[], teamInfo: DraftInfo | BudgetInfo, viewIndex: number, currentGameweek: number) {

    const playerStatsView = [];
    
    if (players) {
        playerStatsView.push(
            <View style={styles.playerRowContainer} key={5}>
                { players.slice(11, 15).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} 
                                                                                   fixtures={fixtures} teamInfo={teamInfo}
                                                                                   viewIndex={viewIndex} currentGameweek={currentGameweek}/> })}
            </View>
        )
    }

    return playerStatsView;
}

const viewIndexScenes = ["Lineup", "More Info", "Points", "Fixtures"]

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

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo, draftOverview, draftGameweekPicks, budgetGameweekPicks);
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;
    
    const [viewIndex, setViewIndex] = useState(0); 

    useEffect(function gameweekChanged() {
        setViewIndex(0);
    }, [teamInfo.gameweek, teamInfo.teamType])

    return (
        <>
        {(teamInfo.teamType !== TeamTypes.Empty && players && teamInfo.gameweek <= currentGameweek) &&
        <View style={{flex: 1}}>
            <View style={{flex: 4}}>
                <Image style={styles.field} source={require('../../../../assets/threequartersfield.jpg')}/>
                
                    
                    {(teamInfo.teamType === TeamTypes.Fixture || teamInfo.teamType === TeamTypes.Dream) ? 
                        <View style={styles.playerContainer}>
                            {CreatePlayerStatsView(players, overview, fixtures, teamInfo, viewIndex, currentGameweek)}
                        </View>
                    :
                    ((teamInfo.teamType === TeamTypes.Budget && budgetGameweekPicks) || (teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftOverview)) &&
                        <>
                            <View style={styles.playerContainer}>
                                {CreatePlayerStatsView(players, overview, fixtures, teamInfo, viewIndex, currentGameweek)}
                            </View>
                            <View style={styles.managerInfoCardContainer}>
                            {(teamInfo.teamType === TeamTypes.Budget) &&
                                <ManagerInfoCard teamInfo={teamInfo} players={players} currentGameweek={currentGameweek} budgetGameweekPicks={budgetGameweekPicks} budgetManagerInfo={budgetUserInfo}/>
                            }
                            {(teamInfo.teamType === TeamTypes.Draft) &&
                                <ManagerInfoCard teamInfo={teamInfo} players={players} currentGameweek={currentGameweek} draftManagerInfo={draftUserInfo}/>
                            }
                            </View>
                            {(teamInfo.gameweek === currentGameweek) &&
                                <AdditionalInfoCard viewIndex={viewIndex} setViewIndex={setViewIndex} viewIndexScenes={viewIndexScenes}/>
                            }
                        </>
                    }
                    
            </View>
            <View style={styles.bottomContainer}> 
    
                { (teamInfo.teamType === TeamTypes.Fixture) ? 
                    <BonusPointView overviewData={overview} fixturesData={fixtures} teamInfo={teamInfo}/>  
                : (teamInfo.teamType === TeamTypes.Dream) ? 
                    <KingsOfTheGameweekView overviewData={overview}/>
                :
                ((teamInfo.teamType === TeamTypes.Budget && budgetGameweekPicks) || (teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftOverview)) &&
                    <>
                    { CreateBenchView(players, overview, fixtures, teamInfo, viewIndex, currentGameweek) }
                    </>
                }

            </View>
        </View>
        }
        </>
    )
}

export default Lineup;






