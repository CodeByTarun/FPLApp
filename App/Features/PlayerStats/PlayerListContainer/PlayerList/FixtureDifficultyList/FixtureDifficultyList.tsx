import { useTheme } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { FplBaseDataContext } from "../../../../../AppContext";
import { DifficultyColors } from "../../../../../Global/EnumsAndDicts";
import { FplFixture } from "../../../../../Models/FplFixtures";
import { FixtureDifficultyListStyles } from "./FixtureDifficultyListStyles";

interface FixtureDifficultyListProps {
    team: number;
    isFullList: boolean;
}

const FixtureDifficultyList = React.memo(({team, isFullList}: FixtureDifficultyListProps) => {

    const theme = useTheme();
    const styles = FixtureDifficultyListStyles(theme);

    const { fixtureLists, overview } = useContext(FplBaseDataContext);

    const renderItem = useCallback((item: FplFixture) => {
        return (
            <View key={item.id.toString()} testID="fixtureDifficultyItem" style={[styles.container]} onStartShouldSetResponder={() => isFullList ? true : false}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>GW {item.event}</Text>
                <Text style={styles.text}>{item.team_a === team ? overview.teams.find(team => team.id === item.team_h)?.short_name + '(A)' : overview.teams.find(team => team.id === item.team_a)?.short_name + '(H)'}</Text>
                <View style={[styles.fixtureDifficultyIndicator, {borderBottomColor: DifficultyColors[item.team_a === team ? item.team_a_difficulty : item.team_h_difficulty]}]}/>
            </View>
        )}, []);

    return (
        <View style={{flexDirection: 'row', height: '100%'}}>
            { (isFullList ? fixtureLists[team] : fixtureLists[team].slice(0, 3)).map(fixture => renderItem(fixture))}
        </View>
    )
});

export default FixtureDifficultyList;

FixtureDifficultyList.displayName = 'FixtureDifficultyList';