// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats
//TODO: think about adding a compare feature between two players?

import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Keyboard, Animated } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useAppSelector } from "../../Store/hooks";
import { ScreenTypes } from "../../Store/navigationSlice";
import PlayerTable from "./PlayerTable/PlayerTable";
   

interface PlayerSearchProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerStats = (props: PlayerSearchProps) => {

    const navigation = useAppSelector(state => state.navigation);
    const expandAnim = useRef(new Animated.Value(0)).current;

    const bottomInterpolate = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange:[(GlobalConstants.height * -1) - 100, 0]
    })

    const OpenPlayerSearchView = useCallback(() => {
        Expand();
    }, [])

    const ClosePlayerSearchView = useCallback(() => {
        Keyboard.dismiss();
        Minimize();
    }, [])

    const Expand = useCallback(() => {
        Animated.spring(expandAnim, {
            toValue: 1,
            friction: 100,
            tension: 70,
            useNativeDriver: false,
        }).start();
    }, [])
    
    const Minimize = useCallback(() => {
        Animated.spring(expandAnim, {
            toValue: 0,
            friction: 100,
            tension: 70,
            useNativeDriver: false,
        }).start();
    },[])

    useEffect( function openAndClosePlayerSearch() {
        if (navigation.screenType === ScreenTypes.PlayerStats) {
            OpenPlayerSearchView();
        } else {
            ClosePlayerSearchView();
        }
    }, [navigation])

    return (
        <Animated.View style={[styles.container, { height: '100%', bottom: bottomInterpolate }]}>
            <PlayerTable overview={props.overview} fixtures={props.fixtures}/>
        </Animated.View>
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
    },
});

export default PlayerStats;