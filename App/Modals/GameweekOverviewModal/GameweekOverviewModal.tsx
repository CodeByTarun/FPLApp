import { useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { ModalWrapper } from "../../Features/Controls";
import globalStyles from "../../Global/GlobalStyles";
import { PlayerOverview } from "../../Models/FplOverview";
import { useAppSelector } from "../../Store/hooks";
import { GameweekOverviewModalStyles } from "./GameweekOverviewModalStyles";
import GameweekSummary from "./GameweekSummary";

const AnimatedView = animated(View);

const GameweekOverviewModal = () => {

    const theme = useTheme();
    const styles = GameweekOverviewModalStyles(theme);
    const gameweek = useAppSelector(state => state.team.gameweek);
     
    const [view, setView] = useState(1);

    const sliderSpring = useSpring({left: view === 1 ? '0%' : '50%'})

    return (

        <ModalWrapper modalHeight={'60%'} modalWidth={'70%'}>
            <View style={styles.modalView}>

                <Text style={styles.titleText}>Overview</Text>

                <Pressable style={styles.sliderContainer} onPress={(() => setView(view === 1 ? 2 : 1))}>
                    <AnimatedView style={[styles.slider, globalStyles.shadow, {left: sliderSpring.left}]}/>
                    <View style={styles.sliderPartContainer}>
                        <Text style={styles.sliderText}>Gameweek {gameweek}</Text>
                    </View>
                    <View style={styles.sliderPartContainer}>
                        <Text style={styles.sliderText}>Team FDRs</Text>
                    </View>
                </Pressable>

                <View style={styles.viewContainer}>
                    {view === 1 && 
                        <GameweekSummary/>
                    }
                    {view === 2 && 
                        <></>
                    }
                </View>
                
            </View>
        </ModalWrapper>        
    )
}

export default GameweekOverviewModal;