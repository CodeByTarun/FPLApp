// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats!!
//TODO: think about adding a compare feature between two players?
//TODO: also this way might not be the best since you cant filter by most pts, xg, assits, position

import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Text, Keyboard, Animated, ScrollView, FlatList, ListRenderItem } from "react-native";
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
    const [playerSearchText, setPlayerSearchText] = useState('')
    const expandAnim = useRef(new Animated.Value(0)).current;

    const bottomInterpolate = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange:[(GlobalConstants.height * -1) - 100, 0]
    })

    const OpenPlayerSearch = useCallback(() => {
        Expand();
    }, [])

    const ClosePlayerSearch = useCallback(() => {
        setPlayerSearchText('');
        Keyboard.dismiss();
        Minimize();
    }, [])

    const Expand = useCallback(() => {
        Animated.spring(expandAnim, {
            toValue: 1,
            friction: 8,
            useNativeDriver: false
        }).start();
    }, [])
    
    const Minimize = useCallback(() => {
        Animated.spring(expandAnim, {
            toValue: 0,
            friction: 10,
            useNativeDriver: false
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
            <View style={styles.searchContainer}>
                <View style={styles.searchBoxContainer}>
                    <TextInput style={styles.searchbox} 
                               value={playerSearchText}
                               onChangeText={text => setPlayerSearchText(text)}
                               onFocus={OpenPlayerSearch} 
                               placeholder="Search player..." 
                               placeholderTextColor={'white'}/>
                </View>
                
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', marginRight: 7}} onPress={() => dispatch(goToMainScreen())}>
                    <Text style={{ alignSelf: 'center', color: GlobalConstants.textPrimaryColor }}>Cancel</Text>
                </TouchableOpacity>
                
            </View>

            <PlayerTable overview={props.overview} fixtures={props.fixtures} playerSearchText={playerSearchText}/>
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

    //#region  search styling

    searchContainer: {
        height: GlobalConstants.height * 1/13,
        flexDirection: 'row',
        marginBottom: 5,
    },

    searchBoxContainer: {
        flex: 1,
        margin: 7,
        padding: 7,
        backgroundColor: GlobalConstants.secondaryColor,
        flexDirection: 'row',
        borderRadius: GlobalConstants.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: 'white'
    },

    //#endregion

    

});

export default PlayerSearch;