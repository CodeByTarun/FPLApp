import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../App";
import { Separator } from "../../../Global/GlobalComponents";
import { height } from "../../../Global/GlobalConstants";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changeGameweek } from "../../../Store/teamSlice";
import { AnimatedButton } from "../../Controls";
import { GameweekViewStyles } from "./GameweekViewStyles";

interface GameweekViewProps {
    overview: FplOverview;
}

const GameweekView = ({overview} : GameweekViewProps) => {

    const theme = useTheme();
    const styles = GameweekViewStyles(theme);

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
            gameweekScrollViewRef.current?.scrollTo({x: 0, y: (teamInfo.gameweek - 1) * moderateVerticalScale(height * 0.06, -0.3), animated: false});
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
                        <View key={event.id}>
                            <AnimatedButton  buttonFn={() => onGameweekButtonPress(event.id)}>
                                <View testID="gameweeksItem" style={[styles.gameweekItem, {backgroundColor: (teamInfo.gameweek === event.id) ? theme.colors.background : theme.colors.primary }]}>
                                    <Text style={styles.text}>{event.name}</Text>
                                </View>
                            </AnimatedButton>
                            {Separator(theme)}
                        </View>
                    )})}
                </ScrollView>
            
            <View style={styles.bottomView}>
                <Pressable style={[styles.currentGameweekButton]} onPress={() => onGameweekButtonPress(teamInfo.liveGameweek)}>
                    <Text style={[styles.text, {textAlign: 'center'}]}>Current Gameweek</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default GameweekView;