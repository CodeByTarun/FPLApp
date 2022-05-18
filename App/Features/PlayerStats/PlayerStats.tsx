// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats

import { animated, config, useSpring } from "@react-spring/native";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Keyboard, Animated, View } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useAppSelector } from "../../Store/hooks";
import { ScreenTypes } from "../../Store/navigationSlice";
import PlayerTable from "./PlayerTable/PlayerTable";
   
const AnimatedView = animated(View);

interface PlayerSearchProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerStats = (props: PlayerSearchProps) => {

    const navigation = useAppSelector(state => state.navigation);

    const popupSpring = useSpring({top: (navigation.screenType === ScreenTypes.PlayerStats) ? '0%' : '120%', config: { friction: 18, mass: 0.5 }});

    return (
        <AnimatedView style={[styles.container, { height: '100%', top: popupSpring.top }]}>
            <PlayerTable overview={props.overview} fixtures={props.fixtures}/>
        </AnimatedView>
    )
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 0,
        width: GlobalConstants.width,
        backgroundColor: GlobalConstants.primaryColor,
        display: 'flex',
        zIndex: 2,
        elevation: 2,
    },
});

export default PlayerStats;