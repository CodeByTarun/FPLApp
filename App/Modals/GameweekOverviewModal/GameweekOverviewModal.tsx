import { useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import React, { useContext, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { FplBaseDataContext } from "../../AppContext";
import { ModalWrapper } from "../../Features/Controls";
import globalStyles from "../../Global/GlobalStyles";
import { useAppSelector } from "../../Store/hooks";
import { GameweekOverviewModalStyles } from "./GameweekOverviewModalStyles";
import GameweekSummary from "./GameweekSummary";

const AnimatedView = animated(View);

const GameweekOverviewModal = () => {

    const theme = useTheme();
    const styles = GameweekOverviewModalStyles(theme);
    const gameweek = useAppSelector(state => state.team.gameweek);
    const {TeamFixtureDifficultyView} = useContext(FplBaseDataContext);
     
    const [view, setView] = useState(1);

    const sliderSpring = useSpring({left: view === 1 ? '0%' : '50%'})
    const viewSpring = useSpring({gameweekLeft: view === 1 ? '0%' : '-120%', teamFDRLeft: view === 1 ? '120%' : '0%'});

    return (

        <ModalWrapper modalHeight={moderateVerticalScale(435, 0.45)} modalWidth={moderateScale(300, 0.5)}>
            <View style={styles.modalView}>

                <Text style={styles.titleText}>Overview</Text>

                <Pressable testID="overviewSwitch" style={styles.sliderContainer} onPress={(() => setView(view === 1 ? 2 : 1))}>
                    <AnimatedView style={[styles.slider, globalStyles.shadow, {left: sliderSpring.left}]}/>
                    <View style={styles.sliderPartContainer}>
                        <Text style={styles.sliderText}>Gameweek {gameweek}</Text>
                    </View>
                    <View style={styles.sliderPartContainer}>
                        <Text style={styles.sliderText}>Team FDRs</Text>
                    </View>
                </Pressable>

                <View style={styles.viewContainer}>
                    <AnimatedView style={{height: '100%', width: '100%', position: 'absolute', left: viewSpring.gameweekLeft}}>
                        <GameweekSummary/>
                    </AnimatedView>
                    
                    <AnimatedView style={{height: '100%', width: '100%', position: 'absolute', left: viewSpring.teamFDRLeft}}>
                        { TeamFixtureDifficultyView }
                    </AnimatedView>
                </View>
                
            </View>
        </ModalWrapper>        
    )
}

export default GameweekOverviewModal;