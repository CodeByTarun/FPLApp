import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { height, primaryColor, secondaryColor } from "../../../Global/GlobalConstants";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changeGameweek } from "../../../Store/teamSlice";
import { styles } from "./GameweekViewStyles";


interface GameweekViewProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    liveGameweek: number;
    overview: FplOverview;
}

const GameweekView = ({isVisible, setIsVisible, liveGameweek, overview} : GameweekViewProps) => {

    const dispatch = useAppDispatch();
    const teamInfo = useAppSelector(state => state.team);
    const gameweekScrollViewRef = useRef<ScrollView>(null);

    const onGameweekButtonPress = useCallback((gameweekNumber: number) => {
        dispatch(changeGameweek(gameweekNumber));
        setIsVisible(false);
    },[])

    useEffect( function scrollToCurrentlySelectedGameweek() {

        function scroll() {
            gameweekScrollViewRef.current?.scrollTo({x: 0, y: (teamInfo.gameweek - 1) * height*0.06, animated: false});
        }

        if (isVisible === true) {
            if (Platform.OS === "ios") {
                setTimeout(scroll, 50);
            } else {
                scroll();
            }
        }
    }, [isVisible]);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Gameweeks</Text>
            <View style={styles.listContainer}>
                <ScrollView ref={gameweekScrollViewRef} style={{ flex: 1}}>
                    { overview.events.map((event) => {return (
                        <Pressable testID="gameweeksItem" key={event.id} style={[styles.gameweekItem, {backgroundColor: (teamInfo.gameweek === event.id) ? secondaryColor : primaryColor }]} onPress={() => onGameweekButtonPress(event.id)}>
                            <Text style={styles.text}>{event.name}</Text>
                        </Pressable>
                    )})}
                </ScrollView>
            </View>
            
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Pressable style={[styles.currentGameweekButton]} onPress={() => onGameweekButtonPress(liveGameweek)}>
                    <Text style={[styles.text, {fontWeight: '600'}]}>Current Gameweek</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default GameweekView;