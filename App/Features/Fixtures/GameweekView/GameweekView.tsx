import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { animated } from "@react-spring/native";
import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { RootStackParams } from "../../../../App";
import { height, primaryColor, secondaryColor } from "../../../Global/GlobalConstants";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changeGameweek } from "../../../Store/teamSlice";
import { AnimatedButton } from "../../Controls";
import { styles } from "./GameweekViewStyles";

interface GameweekViewProps {
    overview: FplOverview;
}

const GameweekView = ({overview} : GameweekViewProps) => {

    const dispatch = useAppDispatch();
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const teamInfo = useAppSelector(state => state.team);
    const gameweekScrollViewRef = useRef<ScrollView>(null);

    const onGameweekButtonPress = useCallback((gameweekNumber: number) => {
        dispatch(changeGameweek(gameweekNumber));
        navigator.goBack();
    }, [])

    useEffect( function scrollToCurrentlySelectedGameweek() {

        function scroll() {
            gameweekScrollViewRef.current?.scrollTo({x: 0, y: (teamInfo.gameweek - 1) * height*0.06, animated: false});
        }

        if (Platform.OS === "ios") {
            setTimeout(scroll, 50);
        } else {
            scroll();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Gameweeks</Text>
                <ScrollView ref={gameweekScrollViewRef} style={styles.listContainer}>
                    { overview.events.map((event) => {return (
                        <AnimatedButton key={event.id} buttonFn={() => onGameweekButtonPress(event.id)}>
                            <View testID="gameweeksItem" style={[styles.gameweekItem, {backgroundColor: (teamInfo.gameweek === event.id) ? secondaryColor : primaryColor }]}>
                                <Text style={styles.text}>{event.name}</Text>
                            </View>
                        </AnimatedButton>
                    )})}
                </ScrollView>
            
            <View style={styles.bottomView}>
                <Pressable style={[styles.currentGameweekButton]} onPress={() => onGameweekButtonPress(teamInfo.liveGameweek)}>
                    <Text style={[styles.text, {fontWeight: '600'}]}>Current Gameweek</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default GameweekView;