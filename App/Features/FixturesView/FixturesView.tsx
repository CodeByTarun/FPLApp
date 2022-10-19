import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { animated, useSpring } from "@react-spring/native";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { timezone } from "expo-localization";
import moment from "moment-timezone";
import React, { useCallback, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import globalStyles from "../../Global/GlobalStyles";
import { SortFixtures } from "../../Helpers/FplAPIHelpers";
import { FplFixture } from "../../Models/FplFixtures";
import { useGetGameweekDataQuery } from "../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeMutableView } from "../../Store/modalSlice";
import { goToFixturesScreen, goToMainScreen, ScreenTypes } from "../../Store/navigationSlice";
import { changeGameweek } from "../../Store/teamSlice";
import { AnimatedButton } from "../Controls";
import GameweekView from "../Fixtures/GameweekView";
import FixtureGroup from "./FixtureGroup/FixtureGroup";
import FixtureRow from "./FixtureRow";
import { FixturesViewStyles } from "./FixturesViewStyles";

const AnimatedView = animated(View);
const AnimatedPressable = animated(Pressable);

const FixturesView = () => {

    const theme = useTheme();
    const styles = FixturesViewStyles(theme);

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);
    const {overview, fixtures} = useContext(FplBaseDataContext);
    const gameweek = useAppSelector(state => state.team.gameweek);
    const liveGameweek = useAppSelector(state => state.team.liveGameweek);
    const gameweekData = useGetGameweekDataQuery((gameweek) ? gameweek : skipToken);

    const groupedFixtures = fixtures ? getGroupedFixtures(fixtures, gameweek) : undefined;

    const popupSpring = useSpring({top: (navigation.screenType === ScreenTypes.Fixtures) ? '0%' : '120%', config: { friction: 18, mass: 0.5 }});

    const onCloseButtonPress = useCallback(() => {
        if (navigation.screenType === ScreenTypes.Fixtures) {
          if (gameweek > liveGameweek) {
            dispatch(changeGameweek(liveGameweek));
          }
          setTimeout(() => dispatch(goToMainScreen()), 100);
        } else {
          dispatch(goToFixturesScreen());
        } 
      }, [navigation, gameweek]);

    const gameweekButton = useCallback(() => {
    if (overview) {
        dispatch(changeMutableView({view: <GameweekView overview={overview}/>, width: moderateScale(275)}));

        navigator.navigate('MutableModal');
    }
    }, [gameweek, overview]);

    const [gameweekButtonAnimatedStyle, gameweekButtonAnimatedApi] = useSpring(() => ({ scale: 1 }));

    const onGamweekButtonPress = () => {
        gameweekButtonAnimatedApi.start({
          to: [
            { scale: 0.95 },
            { scale: 1 }
          ],
          config: {duration: 100},
        });
        gameweekButton();
    }

    return (
        <AnimatedView style={[styles.container, {top: popupSpring.top}]}>
            { overview && fixtures && 
                <View style={{flex: 1}}>

                    <View style={[styles.topBar, globalStyles.bottomShadow, {zIndex: 10}]}>
                        
                        <AnimatedPressable testID={'gameweekButton'} style={[styles.gameweekButton, { transform: [{ scale: gameweekButtonAnimatedStyle.scale }]}]} onPress={onGamweekButtonPress}>
                            <Text style={styles.gameweekText}> Gameweek {gameweek}  </Text>
                            <Text style={styles.gameweekDropDownSymbol}>◣</Text>
                        </AnimatedPressable>
                    </View>
                    <View style={styles.middle}>
                        { (gameweekData.data !== undefined && ( fixtures.filter((fixture) => { return fixture.event == (gameweek !== 0 ? gameweek : 1)}).length > 0 )) ?
                            <ScrollView showsVerticalScrollIndicator={false} 
                                        style={styles.scrollView} 
                                        testID='fixturesViewScrollView'>

                                { groupedFixtures && Object.keys(groupedFixtures).map((dateKey) => {
                                    return <FixtureGroup key={dateKey} fixtureList={groupedFixtures[dateKey]} overview={overview} gameweekData={gameweekData.data} date={dateKey}/>
                                }) }

                            </ScrollView> 
                            :
                            <View style={styles.noFixturesView}>
                                <Text style={styles.noFixturesText}>No fixtures this gameweek.</Text>
                            </View> 
                        }
                    </View>
                    <View style={[styles.bottomBar, styles.shadow]}>
                        <View style={styles.tabBarWidth}>
                            <View style={{flex: 1}}>
                                <AnimatedButton buttonFn={() => dispatch(changeGameweek(gameweek - 1))} disabled={(gameweek <= 1)}>
                                    <View style={styles.buttonContainer}>
                                    <Text style={styles.text}>Prev</Text>
                                    </View>
                                </AnimatedButton>
                            </View>
                            {VerticalSeparator(theme)}
                            <View style={{flex: 1}}>
                                <AnimatedButton buttonFn={() => dispatch(changeGameweek(gameweek + 1))} disabled={(gameweek >= 38)}>
                                    <View style={styles.buttonContainer}>
                                        <Text style={styles.text}>Next</Text>
                                    </View>
                                </AnimatedButton>
                            </View>
                        </View>
                        <View style={{position: 'absolute', right: moderateScale(15), height: '100%'}}>
                                <AnimatedButton buttonFn={onCloseButtonPress}>
                                    <View style={styles.buttonContainer}>
                                        <Text style={[styles.text, styles.closeText]}>Close</Text>
                                    </View>
                                </AnimatedButton>
                            </View>
                    </View>
                </View>
            }
        </AnimatedView>
    )

}

export default FixturesView;

function getGroupedFixtures(fixtures: FplFixture[], gameweek: number) {

    const groups = fixtures.filter((fixture) => { return fixture.event == (gameweek !== 0 ? gameweek : 1) }).reduce((groups, fixture) => {
                        const date = moment(fixture.kickoff_time).tz(timezone).format('dddd, MMM D');
                        const group = (groups[date] || []);
                        group.push(fixture);
                        groups[date] = group;
                        return groups;
                    }, {} as {[key: string] : FplFixture[]});
    
    return groups;
}