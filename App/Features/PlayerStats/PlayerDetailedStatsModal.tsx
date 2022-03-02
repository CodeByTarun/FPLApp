import React from "react";
import { Modal, Pressable, View, StyleSheet, Image, Text } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { closePlayerDetailedStatsModal } from "../../Store/modalSlice";
import CloseButton from "../Controls/CloseButton";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "./FixtureDifficultyList";
import { template } from "@babel/core";

interface PlayerDetailedStatsModalProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerDetailedStatsModal = (props: PlayerDetailedStatsModalProps) => {

    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.modal);
    const currentGameweek = props.overview.events.filter((event) => { return event.is_current === true; })[0].id;

    return (
        <>
        { (player) && 
            <Modal animationType="fade" transparent={true} visible={player ? true : false} style={{position: 'absolute'}}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => dispatch(closePlayerDetailedStatsModal())}/>       
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { height: GlobalConstants.height * 0.5, padding: 15 }]}>
                    <Pressable style={styles.closeButton} onPressIn={() => dispatch(closePlayerDetailedStatsModal())}>
                        <View style={styles.closeButtonBackground}>
                            <Image style={{height: '50%', width: '50%'}} source={Icons["close"]} resizeMode="contain"/>
                        </View>
                    </Pressable>    
                    <View style={{flex: 1}}>
                        <View style={{flex: 7}}>

                            <View style={styles.header}>
                                <Text style={styles.titleText}>{player.web_name}</Text>
                                <View style={{flexDirection: 'row', paddingTop: 3}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.text}>£{(player.now_cost / 10).toFixed(1)}  </Text>
                                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === player.team_code)?.short_name}  </Text>
                                        <Text style={styles.text}>{props.overview.element_types.find(element => element.id === player.element_type)?.singular_name_short}  </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                        <Text style={styles.text}>{player.selected_by_percent}% owned</Text>
                                    </View>                                    
                                </View>
                            </View>

                        </View>

                        <View style={{flex: 1}}>
                            <FixtureDifficultyList isFullList={true} overview={props.overview} fixtures={props.fixtures} currentGameweek={currentGameweek} team={player.team}/>
                        </View>
                    </View>
                </View>
            </Modal>
        }
        </>
    )
}

const styles = StyleSheet.create({

    header: {
        flex: 1,
    },

    titleText: {
        fontSize: GlobalConstants.largeFont * 1.3,
        color: GlobalConstants.textPrimaryColor,
        fontWeight: 'bold',
    }, 

    text: {
        fontSize: GlobalConstants.mediumFont,
        color: GlobalConstants.textPrimaryColor,
    },

    //#region  close button
    closeButton: {
        position: 'absolute',
        zIndex: 1,
        right: -7,
        top: -7,
        height: 25,
        width: 25,
        margin: 0,
        borderRadius: 20,
    },

    closeButtonBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: GlobalConstants.secondaryColor,
        borderRadius: 20,
    },

    //#endregion
})

export default PlayerDetailedStatsModal;