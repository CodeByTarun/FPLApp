import React from "react";
import { View, Text } from "react-native";
import globalStyles from "../../../../Global/GlobalStyles";
import { FplFixture } from "../../../../Models/FplFixtures";
import { FplOverview } from "../../../../Models/FplOverview";
import { FixtureInfo } from "../../../../Store/teamSlice";
import { styles } from "./BonusPointViewStyles";

interface BonusPointViewProps {
    overviewData: FplOverview;
    fixturesData: FplFixture[];
    teamInfo: FixtureInfo;
}

const BonusPointView = ({overviewData, fixturesData, teamInfo} : BonusPointViewProps) => {

    let bonusPoints = fixturesData.find(fixture => fixture.id === teamInfo.fixture?.id)?.stats.find(stat => stat.identifier === 'bps');

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} testID='bonusPointsViewContainer'>
            <View style={[styles.container, globalStyles.shadow]}>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Bonus Point Leaders</Text>
                </View>
                
                { bonusPoints &&
                    <View style={{flex: 1, flexDirection: 'row'}} testID="bonusPointsView">
                        <View style={[styles.bonusPointsView, {borderRightWidth: 0.5,}]}>
                        {
                            bonusPoints.h.slice().sort((a, b) => b.value - a.value).slice(0,5).map( player => 
                                <Text key={player.element} style={styles.bonusPointsText}>{overviewData.elements.find(element => element.id === player.element)?.web_name} ({player.value})</Text>
                                )
                        }
                        </View>

                        <View style={[styles.bonusPointsView, {borderLeftWidth: 0.5,}]}>
                        {
                            bonusPoints.a.slice().sort((a, b) => b.value - a.value).slice(0,5).map( player => 
                                <Text key={player.element} style={styles.bonusPointsText}>{overviewData.elements.find(element => element.id === player.element)?.web_name} ({player.value})</Text>
                                )
                        }
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default BonusPointView;