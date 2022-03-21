// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDreamTeam, TeamInfo, TeamTypes } from "../../Store/teamSlice";
import TeamModal from "../../Modals/TeamModal";
import CustomButton from "../Controls/CustomButton";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { openTeamModal } from "../../Store/modalSlice";

const TeamSelectorHeader = (teamInfo: TeamInfo, overview: FplOverview, fixtures: FplFixture[]) => {

    if (teamInfo.teamType === TeamTypes.Fixture) {
        return (
        <View style={{alignSelf: 'center', height: '90%', width: '65%'}}>
            <TeamSwitch overview={overview} fixtures={fixtures}/>
        </View>
        )
    }
    else if (teamInfo.teamType === TeamTypes.Dream) {
        return (
            <Text style={styles.text}>Dream Team</Text>
        ) 
    }
    else if (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) 
        return (
            <Text style={styles.text}>{teamInfo.info.name}</Text>
        )
}

interface LineupContainerProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const LineupContainer = (props: LineupContainerProps) => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();

    const onMyTeamButtonPress = () => {
        dispatch(openTeamModal())
    }
    
    const onDreamTeamPress = () => {
        dispatch(changeToDreamTeam())
    }    

    const onPlayerSearchPress = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.controlsContainer}>

                    <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'dreamteam'} buttonFunction={onDreamTeamPress}/>
                        </View>
                    </View>

                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                        {TeamSelectorHeader(teamInfo, props.overview, props.fixtures)}
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 5 }}>
                        <View style={[styles.buttonContainer, {height: '60%', marginTop: 4}]}>
                            <CustomButton image={'playersearch'} buttonFunction={onPlayerSearchPress}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'team'} buttonFunction={onMyTeamButtonPress}/>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.middle}>
                <Lineup/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        //#region Container styling
        container: {
            flex: 1,
            margin: 0,
        },

        top: {
            height: GlobalConstants.height* 0.075,
        },

        middle: {
            flex: 9,
            width : '100%',
        },

        controlsContainer: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },

        buttonContainer: {
            height: '70%',
            aspectRatio: 1,
            margin: 3
        },

        switchContainer: {
            alignSelf: 'center',
            height: '100%',
            width: '100%',
        },

        icon: {
            width: '80%',
            height: '80%',
            alignSelf: 'center'
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
