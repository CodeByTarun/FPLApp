// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDreamTeam, TeamInfo, TeamTypes } from "../../Store/teamSlice";

const TeamSelectorHeader = (teamInfo: TeamInfo) => {

    if (teamInfo.teamType === TeamTypes.Fixture) {
        return (
        <View style={styles.switchContainer}>
                        <TeamSwitch/>
        </View>
        )
    }
    
    else if (teamInfo.teamType === TeamTypes.Dream) {
        return (
            <Text style={styles.text}>Dream Team</Text>
        ) 
    }
}

const LineupContainer = () => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();

    const [addLeagueModalVisible, setAddLeagueModalVisible] = useState(false);

    const onMyTeamButtonPress = () => {
        setAddLeagueModalVisible(true);
    }
    
    const onDreamTeamPress = () => {
        dispatch(changeToDreamTeam())
    }    

    return (
        <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={addLeagueModalVisible}>
                <View style={styles.modal}>
                    <Text>Hello</Text>
                </View>
            </Modal>
            
            <View style={styles.top}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.dreamTeamButton} onPress={onDreamTeamPress}>
                        <Image style={styles.icon} source={require('../../../assets/dreamteam.png')} resizeMode="contain"/>
                    </TouchableOpacity>

                    {TeamSelectorHeader(teamInfo)}
                    
                    <TouchableOpacity style={styles.myTeamButton} onPress={onMyTeamButtonPress}>
                        <Image style={styles.icon} source={require('../../../assets/team.png')} resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.middle}>
                <Lineup/>
            </View>
            <View style={styles.bottom}></View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        //#region Modal Styling
        modal: {
            position: 'absolute',
            top: GlobalConstants.height * 0.3,
            height: '25%',
            width: '65%',
            backgroundColor: 'red',
            alignSelf: 'center',
            borderRadius: GlobalConstants.cornerRadius,
            padding: 10,
        },
        //#endregion

        //#region Container styling
        container: {
            flex: 1,
            margin: 0,
        },

        top: {
            flex: 2,
        },

        middle: {
            flex: 14,
            width : '100%',
        },

        bottom: {
            flex: 3,
            backgroundColor: 'lightgray'
        },

        topContainer: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },

        switchContainer: {
            alignSelf: 'center',
            width: '40%'
        },

        dreamTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            left: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%',
        },

        icon: {
            width: '80%',
            height: '80%',
            alignSelf: 'center'
        },

        myTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            right: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%'   
        },

        text: {
            alignSelf: 'center',
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.width*0.045,
            fontWeight: 'bold'
        }
        //#endregion
    }
);

export default LineupContainer;