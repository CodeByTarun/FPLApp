import { useTheme } from "@react-navigation/native";
import moment from "moment-timezone";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { Separator } from "../../../Global/GlobalComponents";
import globalStyles from "../../../Global/GlobalStyles";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplGameweek } from "../../../Models/FplGameweek";
import { FplOverview } from "../../../Models/FplOverview";
import FixtureRow from "../FixtureRow";
import { FixtureGroupStyle } from "./FixtureGroupStyle";

interface FixtureGroupProps {
    fixtureList: FplFixture[],
    overview: FplOverview,
    gameweekData: FplGameweek, 
    date: string,
}

moment().calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd, MMM D',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd, MMM D',
    sameElse: 'dddd, MMM D'
});

const FixtureGroup = ({fixtureList, overview, gameweekData, date} : FixtureGroupProps) => {

    const theme = useTheme();
    const style = FixtureGroupStyle(theme);

    const setDate = useCallback(() => {
        return moment(fixtureList[0].kickoff_time).calendar({
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd, MMM D',
                    lastDay: '[Yesterday]',
                    lastWeek: 'dddd, MMM D',
                    sameElse: 'dddd, MMM D'
                });
    }, [date])

    return (
        <View style={[style.container, globalStyles.shadow]}>
            <View style={style.dateContainer}>
                <Text style={style.text}>{setDate()}</Text>
            </View>
            {fixtureList && 
                fixtureList.map((fixture) =>
                { return (
                    <View key={fixture.id}>
                        <FixtureRow fixture={fixture} overview={overview} gameweekData={gameweekData}/>
                        {fixtureList.at(-1) !== fixture && Separator(theme)}
                    </View>
                )})
            }
        </View>
    )

}

export default FixtureGroup;