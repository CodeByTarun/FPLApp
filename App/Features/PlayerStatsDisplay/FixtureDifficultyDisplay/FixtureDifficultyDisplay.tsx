import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { DifficultyColors } from "../../../Global/EnumsAndDicts";
import { PlayerData } from "../../../Models/CombinedData";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppSelector } from "../../../Store/hooks";
import { FixtureDifficultyDisplayStyles } from "./FixtureDifficultyDisplayStyles";

interface FixtureDifficultyDisplayProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    player: PlayerData;
}

const FixtureDifficultyDisplay = ({overview, fixtures, player} : FixtureDifficultyDisplayProps) => {

    const theme = useTheme();
    const styles = FixtureDifficultyDisplayStyles(theme);

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.fixtureDifficultyText}>GW</Text>
                <Text style={[styles.fixtureDifficultyText, {flex: 2}]}>Opp</Text>
            </View>
            { fixtures.filter((fixture) => (fixture.team_a === player.overviewData.team || fixture.team_h === player.overviewData.team) && 
                                            (fixture.event && fixture.event >= liveGameweek + 1)).slice(0,5).map(fixture => {
                                                return (
                                                    <View testID="fixtureDifficultyPlayerStatsView" style={[styles.fixtureDifficultyContainer, { backgroundColor: DifficultyColors[fixture.team_a === player.overviewData.team ? fixture.team_a_difficulty : fixture.team_h_difficulty]}]}
                                                            key={fixture.id}>
                                                        <Text style={styles.fixtureViewText}>{fixture.event}</Text>
                                                        <Text style={[styles.fixtureViewText, {flex: 2}]}>{fixture.team_a === player.overviewData.team ? overview.teams.find(team => team.id === fixture.team_h)?.short_name + '(A)' : 
                                                                                                                                overview.teams.find(team => team.id === fixture.team_a)?.short_name + '(H)'}</Text>
                                                    </View>
                                                )
                                            })}
        </View>
    )

}

export default FixtureDifficultyDisplay;