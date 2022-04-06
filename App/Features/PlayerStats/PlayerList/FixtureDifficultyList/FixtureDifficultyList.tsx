import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { DifficultyColors } from "../../../../Global/EnumsAndDicts";
import { FplFixture } from "../../../../Models/FplFixtures";
import { FplOverview } from "../../../../Models/FplOverview";
import { styles } from "./FixtureDifficultyListStyles";

interface FixtureDifficultyListProps {
    team: number;
    fixtures: FplFixture[];
    overview: FplOverview;
    isFullList: boolean;
    currentGameweek: number;
}

const FixtureDifficultyList = React.memo((props: FixtureDifficultyListProps) => {

    const [fixtureList, setFixtureList] = useState([] as FplFixture[]);

    useEffect(() => {
        setFixtureList(props.fixtures.filter((fixture) => (fixture.team_a === props.team || fixture.team_h === props.team) && (fixture.event && fixture.event >= props.currentGameweek + 1)))
    }, [])

    const renderItem = useCallback(({item}: {item: FplFixture}) => {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>GW {item.event}</Text>
                <Text style={styles.text}>{item.team_a === props.team ? props.overview.teams.find(team => team.id === item.team_h)?.short_name + '(A)' : props.overview.teams.find(team => team.id === item.team_a)?.short_name + '(H)'}</Text>
                <View style={[styles.fixtureDifficultyIndicator, {borderBottomColor: DifficultyColors[item.team_a === props.team ? item.team_a_difficulty : item.team_h_difficulty]}]}/>
            </View>
        )}, []);

    const keyExtractor = useCallback((fixture: FplFixture) => fixture.id.toString(), []);

    return (
        <FlatList data= {props.isFullList ? fixtureList : fixtureList.slice(0, 3) }
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  horizontal={true}
                  style={{flex: 1}}/>
    )
});

export default FixtureDifficultyList;