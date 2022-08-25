import { Theme, useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { FixturesMap } from "../../../../App";
import { FplBaseDataContext } from "../../../AppContext";
import FixtureDifficultyList from "../../../Features/PlayerStats/PlayerListContainer/PlayerList/FixtureDifficultyList";
import { mediumFont, smallFont } from "../../../Global/GlobalConstants";
import { useAppSelector } from "../../../Store/hooks";

const TeamFixtureDifficulty = () => {

    const theme = useTheme();
    const styles = TeamFixtureDifficultyStyles(theme);

    const { fixtureLists, overview } = useContext(FplBaseDataContext);
    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    // function for sorting teams from easiest difficulty for next five fixtures to hardest
    let sortedByDifficultyOverNext5FixturesTeamIds = Object.keys(fixtureLists).sort((teamA, teamB) => {
        let teamAAverageDifficulty = getAverageFixutreDifficultyOverNext4Games(Number(teamA), fixtureLists, liveGameweek);
        let teamBAverageDifficulty = getAverageFixutreDifficultyOverNext4Games(Number(teamB), fixtureLists, liveGameweek);

        return teamAAverageDifficulty - teamBAverageDifficulty
    });

    let fixturesfive = fixtureLists[13].slice(0, 4);
    let then = fixturesfive.reduce((previousValue, fixture) => previousValue + ((fixture.team_a === 13) ? fixture.team_h_difficulty : fixture.team_a_difficulty) , 0);
                    
    console.log(fixtureLists[13])
    console.log(fixturesfive);
    console.log(then);



    console.log("13   " + getAverageFixutreDifficultyOverNext4Games(13, fixtureLists, liveGameweek));

    return (
        <View style={styles.container}>
            <ScrollView style={styles.outerScrollView}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}} onStartShouldSetResponder={() => true}>

                    <View style={styles.teamsContainer}>
                        {
                            sortedByDifficultyOverNext5FixturesTeamIds.map(teamId => {
                                return (
                                    <View key={teamId} style={styles.teamContainer}>
                                        <Text style={styles.teamText}>{overview.teams.find(team => team.id === Number(teamId))?.short_name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <View style={styles.fdrContainer}>
                        {
                            sortedByDifficultyOverNext5FixturesTeamIds.map(teamId => {
                                return (
                                    <View key={teamId} style={styles.difficultyContainer}>
                                        <FixtureDifficultyList team={Number(teamId)} isFullList={false} numberOfFixturesToShow={4}/>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <Text style={styles.infoText}>*Sorted by average difficulty over next 4 fixtures</Text>
        </View>
    )
}

export default React.memo(TeamFixtureDifficulty);

const TeamFixtureDifficultyStyles = (theme: Theme) => StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
    },

    outerScrollView: {
    },

    innerScrollView: {
        flexDirection: 'row',
    },

    teamsContainer: {
        borderRightColor: theme.colors.background,
        borderRightWidth: moderateScale(1),
        paddingRight: moderateScale(5),
        marginRight: moderateScale(5),
    },

    teamContainer: {
        height: moderateVerticalScale(40, 0.3),
        justifyContent: 'center'
    },

    teamText: {
        fontSize: mediumFont * 0.9,
        color: theme.colors.text,
        fontWeight: '500',
        alignSelf: 'center',
        paddingBottom: moderateVerticalScale(5)
    },

    fdrContainer: {
        flexDirection: 'column',
    },

    difficultyContainer: {
        height: moderateVerticalScale(40, 0.3),
    },

    infoText: {
        fontSize: smallFont,
        color: theme.colors.text,
        marginTop: 10,
        width: '100%',
        textAlign: 'center'
    }

})

function getAverageFixutreDifficultyOverNext4Games(teamId: number, fixtureLists: FixturesMap, liveGameweek: number) : number {

    return fixtureLists[teamId].slice(0, 4)
                               .reduce((previousValue, fixture) => previousValue + ((fixture.team_a !== teamId) ? fixture.team_h_difficulty : fixture.team_a_difficulty) , 0) / 4;
}