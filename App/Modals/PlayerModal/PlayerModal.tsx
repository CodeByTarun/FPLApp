// This will contain understat and fpl data combined in a nice playercard that will help
// ppl see how a player is performing recently as well as on the overall season

import React, { useContext } from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { StatNames } from "../../Global/EnumsAndDicts";
import { Emblems } from "../../Global/Images";
import { PlayerData } from "../../Models/CombinedData";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { AnimatedButton, ModalWrapper } from "../../Features/Controls";
import { styles } from "./PlayerModalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { height } from "../../Global/GlobalConstants";
import { changePlayerOverviewInfo } from "../../Store/modalSlice";

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

const PlayerModal = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { overview, fixtures } = useContext(FplBaseDataContext);

    const teamInfo = useAppSelector(state => state.team);
    const modalInfo = useAppSelector(state => state.modal);

    const player = modalInfo.playerData;

    const onMoreInfoPress = () => {
        if (player) {
            dispatch(changePlayerOverviewInfo(player.overviewData));
            navigation.navigate('PlayerDetailedStatsModal');
        }
    }

    return (
        <ModalWrapper modalWidth={"75%"} maxHeight={height * 0.6}>
            <View style={[styles.container]}>
                { player && overview && fixtures &&
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