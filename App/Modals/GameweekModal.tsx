import React, { useCallback, useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Pressable, ScrollView, Text } from "react-native";
import CloseButton from "../Features/Controls/CloseButton";
import globalStyles from "../Global/GlobalStyles";
import { FplFixture } from "../Models/FplFixtures";
import { FplOverview } from "../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { closeModal, ModalInfo, ModalTypes } from "../Store/modalSlice";
import * as GlobalConstants from "../Global/GlobalConstants";
import { changeGameweek } from "../Store/teamSlice";
import { updateShorthandPropertyAssignment } from "typescript";

interface GameweekModalProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    isVisible: boolean,
}

const GameweekModal = ({overview, isVisible} : GameweekModalProps) => {

    const dispatch = useAppDispatch();
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;
    const teamInfo = useAppSelector(state => state.team);
    const gameweekScrollViewRef = useRef<ScrollView>(null);

    const onGameweekButtonPress = useCallback((gameweekNumber: number) => {
        dispatch(changeGameweek(gameweekNumber));
        dispatch(closeModal());
    },[])

    useEffect( function scrollToCurrentlySelectedGameweek() {

        function scroll() {
            gameweekScrollViewRef.current?.scrollTo({x: 0, y: (teamInfo.gameweek - 1) * GlobalConstants.height*0.06, animated: false});
        }

        if (isVisible === true) {
            setTimeout(scroll, 50);
        }
    }, [isVisible]);

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible}>
             <Pressable style={globalStyles.modalBackground} onPress={() => dispatch(closeModal())}/>
             <View style={[globalStyles.modalView, globalStyles.modalShadow, { height: GlobalConstants.height * 0.6, top: GlobalConstants.height*0.4 / 3 }]}>
                    <CloseButton closeFunction={() => dispatch(closeModal())}/>
                    <Text style={{fontSize: GlobalConstants.largeFont, color: GlobalConstants.textPrimaryColor, alignSelf: 'center', padding: 10, fontWeight: '700', textAlign: 'center'}}>Gameweeks</Text>
                    <View style={{flex: 4, marginTop: 10, marginLeft: -10, marginRight: -10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: GlobalConstants.secondaryColor}}>
                        <ScrollView ref={gameweekScrollViewRef} style={{ flex: 1}}>
                            { overview.events.map((event) => {return (
                                <Pressable key={event.id} style={[styles.gameweekItem, {backgroundColor: (teamInfo.gameweek === event.id) ? GlobalConstants.secondaryColor : GlobalConstants.primaryColor }]} onPress={() => onGameweekButtonPress(event.id)}>
                                    <Text style={styles.text}>{event.name}</Text>
                                </Pressable>
                            )})}
                        </ScrollView>
                    </View>
                    
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Pressable style={[styles.currentGameweekButton, globalStyles.shadow]} onPress={() => onGameweekButtonPress(currentGameweek)}>
                            <Text style={[styles.text, {fontWeight: '600'}]}>Current Gameweek</Text>
                        </Pressable>
                    </View>
                    
                            
                </View>    
        </Modal>
    )
    
}

const styles = StyleSheet.create({

    gameweekItem: {
        borderBottomColor: GlobalConstants.secondaryColor,
        borderBottomWidth: 1,
        height: GlobalConstants.height*0.06,
        justifyContent: 'center',
        paddingLeft: 10,
    },

    text: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
    },

    currentGameweekButton: {
        alignSelf: 'center', 
        backgroundColor: GlobalConstants.secondaryColor, 
        borderRadius: GlobalConstants.cornerRadius, 
        padding: 10
    }

});

export default GameweekModal;
