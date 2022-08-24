// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats

import { Theme, useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FplBaseDataContext } from "../../AppContext";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useAppSelector } from "../../Store/hooks";
import { ScreenTypes } from "../../Store/navigationSlice";
import PlayerTable from "./PlayerTable/PlayerTable";
   
const AnimatedView = animated(View);

const PlayerStats = () => {

    const theme = useTheme();
    const styles =  PlayerStatsStyles(theme);

    const navigation = useAppSelector(state => state.navigation);
    const {overview, fixtures} = useContext(FplBaseDataContext);

    const popupSpring = useSpring({top: (navigation.screenType === ScreenTypes.PlayerStats) ? '0%' : '120%', config: { friction: 18, mass: 0.5 }});

    return (
        <AnimatedView style={[styles.container, { height: '100%', top: popupSpring.top }]}>
            { overview && fixtures && 
                <PlayerTable overview={overview} fixtures={fixtures}/>
            }
        </AnimatedView>
    )
}

const PlayerStatsStyles = (theme: Theme) => StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        width: GlobalConstants.width,
        backgroundColor: theme.colors.primary,
        display: 'flex',
        zIndex: 2,
        elevation: 20,
    },
});

export default PlayerStats;