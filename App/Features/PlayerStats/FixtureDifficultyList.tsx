import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { DifficultyColors } from "../../Global/EnumsAndDicts";

interface FixtureDifficultyListProps {
    team: number;
    fixtures: FplFixture[];
    overview: FplOverview;
    isFullList: boolean;
    currentGameweek: number;
}

const FixtureDifficultyList = (props: FixtureDifficultyListProps) => {

    const [fixtureList, setFixtureList] = useState([] as FplFixture[]);

    useEffect(() => {
        setFixtureList(props.fixtures.filter((fixture) => (fixture.team_a === props.team || fixture.team_h === props.team) && (fixture.event && fixture.event >= props.currentGameweek + 1)))
    }, [])

    return (
        <FlatList data= {props.isFullList ? fixtureList : fixtureList.slice(0, 3) }
                  keyExtractor={fixture => fixture.id.toString()}
                  renderItem={ ({item}) =>
                    <View style={[styles.container, { backgroundColor: DifficultyColors[item.team_a === props.team ? item.team_a_difficulty : item.team_h_difficulty] }]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>GW {item.event}</Text>
                        <Text style={styles.text}>{item.team_a === props.team ? props.overview.teams.find(team => team.id === item.team_h)?.short_name + '(A)' : props.overview.teams.find(team => team.id === item.team_a)?.short_name + '(H)'}</Text>
                    </View>
                  }
                  horizontal={true}
                  style={{flex: 1}}/>
    )
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: GlobalConstants.width* 0.132
    },

    text: {
        fontSize: GlobalConstants.smallFont*1
    }

})

export default FixtureDifficultyList;