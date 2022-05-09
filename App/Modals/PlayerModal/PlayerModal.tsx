// This will contain understat and fpl data combined in a nice playercard that will help
// ppl see how a player is performing recently as well as on the overall season

import React, { useRef } from "react";
import { Modal, Pressable, View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { StatNames } from "../../Global/EnumsAndDicts";
import globalStyles from "../../Global/GlobalStyles";
import { Emblems } from "../../Global/Images";
import { PlayerData } from "../../Models/CombinedData";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { GetScoreForLiveFixture, GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal, ModalInfo, ModalTypes, openPlayerDetailedStatsModal } from "../../Store/modalSlice";
import { AnimatedButton, CloseButton, ModalWrapper } from "../../Features/Controls";
import { styles } from "./PlayerModalStyles";

interface PlayerCardProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    modalInfo: ModalInfo;
    teamInfo: TeamInfo;
}

function AllFixturesPlayerStatsView(playerData: PlayerData, teamInfo: TeamInfo, overview: FplOverview, fixtures: FplFixture[]) {

    if (teamInfo.teamType === TeamTypes.Fixture) {

        if (teamInfo.fixture) {
            return FixturePlayerStatsView(playerData, overview, teamInfo.fixture);
        }
    }
    else if (teamInfo.teamType !== TeamTypes.Empty) {

        let game: FplFixture | undefined;

        return playerData.gameweekData.explain.map(fixture => 
            {
                game = fixtures.find(game => game.id === fixture.fixture)
                if (game) return FixturePlayerStatsView(playerData, overview, game)
            })        
    }

    return null;
}

function FixturePlayerStatsView(playerData: PlayerData, overview: FplOverview, fixture: FplFixture) {

    return (
        <View testID="fixturePlayerStatsContainer" key={fixture.id} style={styles.fixtureContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.fixtureScoreView}>
                <View style={styles.emblemView}>
                    <Image testID="homeJerseyFixturePlayerStatsView" style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_h, overview).code]} resizeMode='contain' />
                </View>
                <Text testID="scoreFixturePlayerStatsView" style={[styles.scoreText, {alignSelf: 'center'}]}>{fixture.team_h_score}  -  {fixture.team_a_score}</Text>
                <View style={styles.emblemView}>
                    <Image testID="awayJerseyFixturePlayerStatsView" style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_a, overview).code]} resizeMode='contain' />
                </View>
                
            </View>

            <View style={styles.statHeaderContainer}>
                <Text style={[styles.statText, {flex: 3}]}>Stat</Text>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.statText}>Value</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.statText}>Points</Text>
                </View>
            </View>
            {
                playerData.gameweekData.explain.find(game => game.fixture === fixture.id)?.stats.map(stat => 
                        <View key={stat.identifier} style={styles.statContainer}>
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

const PlayerModal = ({overview, fixtures, teamInfo, modalInfo}: PlayerCardProps) => {

    const dispatch = useAppDispatch();

    const playerRef = useRef(false as PlayerData | false);
    playerRef.current = (modalInfo.modalType === ModalTypes.PlayerModal) ? modalInfo.player : playerRef.current;
    const player = playerRef.current;

    const onMoreInfoPress = () => {
        if (player) {
            dispatch(openPlayerDetailedStatsModal(player.overviewData))
        }
    }

    return (
        <ModalWrapper isVisible={modalInfo.modalType === ModalTypes.PlayerModal} closeFn={() => dispatch(closeModal())} modalWidth={"75%"}>
            <View style={[styles.container]}>
                { player &&
                <>
                    <Text style={styles.titleText}>
                        {player.overviewData.first_name + " " + player.overviewData.second_name}
                    </Text>
                    <ScrollView style={{ }}>
                        { AllFixturesPlayerStatsView(player, teamInfo, overview, fixtures) }      
                    </ScrollView>
                    <AnimatedButton buttonFn={onMoreInfoPress}>
                        <View style={[styles.button]}>
                            <Text style={styles.buttonText}>More Info</Text>
                        </View>
                    </AnimatedButton>
                </>
                }
            </View>        
        </ModalWrapper>
    )
}

export default PlayerModal;