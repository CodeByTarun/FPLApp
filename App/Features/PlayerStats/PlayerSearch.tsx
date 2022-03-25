// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats!!
//TODO: think about adding a compare feature between two players?
//TODO: also this way might not be the best since you cant filter by most pts, xg, assits, position

import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Keyboard, Animated } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";
import PlayerTable from "./PlayerTable";
   

interface PlayerSearchProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerSearch = (props: PlayerSearchProps) => {
    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);
    const expandAnim = useRef(new Animated.Value(0)).current;

    const bottomInterpolate = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange:[(GlobalConstants.height * -1) - 100, 0]
    })

    const OpenPlayerSearch = useCallback(() => {
        Expand();
    }, [])

    const ClosePlayerSearch = useCallback(() => {
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
            OpenPlayerSearch();
        } else {
            ClosePlayerSearch();
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

export default PlayerSearch;