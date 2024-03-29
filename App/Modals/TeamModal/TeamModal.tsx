import React, { useCallback, useEffect, useReducer, useState } from "react";
import { View, Image, Text, ScrollView, TextInput } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Icons } from "../../Global/Images";
import UserTeamInfo, { changeFavouriteUserTeam, getAllUserTeamInfo, removeUserTeamInfo, addUserTeamInfo, editUserTeamInfo } from "../../Helpers/FplDataStorageService";
import { useAppDispatch } from "../../Store/hooks";
import { changeToBudgetTeam, changeToDraftTeam } from "../../Store/teamSlice";
import Checkbox from "expo-checkbox";
import { AnimatedButton, ModalWrapper } from "../../Features/Controls";
import { TemaModalStyles } from "./TeamModalStyles";
import { userTeamReducer, userTeamInitialState, UserTeamActionKind } from "./UserTeamReducer";
import { Separator } from "../../Global/GlobalComponents";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { moderateScale } from "react-native-size-matters";

// interface TeamModalProps {
//     modalInfo: ModalInfo,
// }

const TeamModal = () => {

    const theme = useTheme();
    const styles = TemaModalStyles(theme);

    const [userTeams, setUserTeams] = useState([] as UserTeamInfo[] | undefined);
    const [confirmIsDisabled, setConfirmIsDisabled] = useState(true)
    const [teamFormOpen, setTeamFormOpen] = useState(false);
    const [userTeamState, userTeamDispatch] = useReducer(userTeamReducer, userTeamInitialState);

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    useEffect( function initialSetup() {
        async function getTeams() {
            setUserTeams(await getAllUserTeamInfo());
        }
        getTeams();
    },[]);

    useEffect( function checkIfTeamInfoValid() {
        setConfirmIsDisabled((userTeamState.error !== null || 
                             ((userTeamState.userTeam.name) ? (userTeamState.userTeam.name === "") : true) ||
                             ((userTeamState.userTeam.id) ? false : true)));

    }, [userTeamState])

    const addTeam = useCallback(async() => {

        await addUserTeamInfo(userTeamState.userTeam)
        setUserTeams(await getAllUserTeamInfo());

        userTeamDispatch({ type: UserTeamActionKind.Reset })
        setTeamFormOpen(false);
    }, [userTeamState]);

    const openEditTeam = useCallback((teamEditing: UserTeamInfo) => {
        setTeamFormOpen(true);
        userTeamDispatch({ type: UserTeamActionKind.SetTeamEditing, value: teamEditing})
    }, []);

    const editTeam = useCallback(async() => {
        if (userTeamState.teamEditing) {
            if (userTeamState.userTeam.id !== userTeamState.teamEditing?.id) {
                await removeUserTeamInfo(userTeamState.teamEditing)
                await addUserTeamInfo(userTeamState.userTeam)
            } else {
                await editUserTeamInfo(userTeamState.userTeam)
            }
            setUserTeams(await getAllUserTeamInfo());
            userTeamDispatch({ type: UserTeamActionKind.Reset })
            setTeamFormOpen(false)
        }
    }, [userTeamState]);

    const removeATeam = useCallback(async() => {

        if (userTeamState.teamEditing) {
            await removeUserTeamInfo(userTeamState.teamEditing);
            setUserTeams(await getAllUserTeamInfo());
        }
        userTeamDispatch({ type: UserTeamActionKind.Reset })
        setTeamFormOpen(false)
    }, [userTeamState]);

    const favouriteATeam = useCallback(async(userTeamInfo: UserTeamInfo) => {

        await changeFavouriteUserTeam(userTeamInfo);
        setUserTeams(await getAllUserTeamInfo());
    }, [userTeamState]);

    const closeForm = useCallback(() => {
        userTeamDispatch({ type: UserTeamActionKind.Reset });
        setTeamFormOpen(false);
    }, []);

    const selectedATeam = useCallback((teamSelected: UserTeamInfo) => {
        if (teamSelected.isDraftTeam === true) {
            dispatch(changeToDraftTeam(teamSelected))
        } 
        else {
            dispatch(changeToBudgetTeam(teamSelected))
        }
        setTimeout(navigation.goBack, 200);
    }, []);

    return (
        <ModalWrapper modalHeight={"50%"} modalWidth={moderateScale(GlobalConstants.width * 0.76, -0.2)}>
            <Text style={[styles.titleText]}>{(teamFormOpen) ? (userTeamState.teamEditing) ? "Edit Team" : "Add Team" : "My Teams"}</Text>

            { (teamFormOpen) ?
                <View style={styles.modalAddTeamView}>
                    
                    <View style={styles.textInputContainer}>
                        <TextInput style={[styles.text, styles.textInput]} 
                                placeholder="Team Name" 
                                placeholderTextColor={'lightgray'}
                                returnKeyType="done"
                                maxLength={20}
                                spellCheck={false}
                                value={ userTeamState.userTeam.name }
                                onChangeText={ text => userTeamDispatch({ type: UserTeamActionKind.ChangeName, value: text, data: userTeams })}/>
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput style={[styles.text, styles.textInput]} 
                                placeholder="Manager ID" 
                                placeholderTextColor={'lightgray'}
                                keyboardType="numeric"
                                returnKeyType="done"
                                maxLength={9}
                                value={ (userTeamState.userTeam.id) ? userTeamState.userTeam.id.toString() : '' }
                                onChangeText={ text => userTeamDispatch({ type: UserTeamActionKind.ChangeID, value: text, data: userTeams })}/>
                    </View>

                    <View style={styles.checkBoxContainer}>
                        <Text style={[styles.text, {paddingLeft: moderateScale(5), flex: 1,}]}>Draft team?</Text>
                        <Checkbox color={userTeamState.userTeam.isDraftTeam ? GlobalConstants.fieldColor : GlobalConstants.lightColor} 
                                value={ userTeamState.userTeam.isDraftTeam } 
                                onValueChange={ value => userTeamDispatch({ type: UserTeamActionKind.IsDraft, value: value, data: userTeams })}/>
                    </View>
                    
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <Text style={[styles.text, {color: GlobalConstants.redColor, padding: moderateScale(5)}]}>{ userTeamState.error }</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AnimatedButton buttonFn={(userTeamState.teamEditing) ? removeATeam : closeForm}>
                                <View style={[styles.formButton, {backgroundColor: GlobalConstants.redColor}]}>
                                    <Text style={{alignSelf:'center'}}>{(userTeamState.teamEditing) ? 'Delete' : 'Back'}</Text>
                                </View>
                            </AnimatedButton>
                        </View>                         

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AnimatedButton buttonFn={(userTeamState.teamEditing) ? editTeam : addTeam} disabled={confirmIsDisabled}>
                                <View style={[styles.formButton]}>
                                    <Text style={{alignSelf:'center'}}>Confirm</Text>
                                </View>
                            </AnimatedButton>
                        </View>
                    </View>

                </View> : 
                <>
                <ScrollView style={styles.modalTeamList}>
                    <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
                        {Separator(theme)}
                        { (userTeams && userTeams.length > 0) &&
                            userTeams.map((team) => 
                                <View key={team.id}>
                                    <View style={styles.modalListRow}>
                                        <View style={styles.favouriteButtonContainer}>
                                            <AnimatedButton buttonFn={() => { favouriteATeam(team) }}>
                                                <View style={styles.favouriteButton}>
                                                    <Image style={styles.icon} source={team.isFavourite ? Icons['favourite'] : Icons['unfavourite']} resizeMode="contain"/>
                                                </View>
                                            </AnimatedButton>
                                        </View>
                                        <View style={styles.teamButton}>
                                            <AnimatedButton buttonFn={() => selectedATeam(team)}>
                                                <Text style={styles.text}>{team.name}</Text>
                                            </AnimatedButton>
                                        </View>
                                        <View style={styles.editButtonContainer}> 
                                            <AnimatedButton buttonFn={() => openEditTeam(team)}>
                                                <View style={styles.editButton}>
                                                    <Image style={styles.icon} source={Icons['edit']} resizeMode="contain"/>
                                                </View>
                                            </AnimatedButton>
                                        </View>
                                    </View> 
                                    {Separator(theme)}
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
                <View style={styles.addButton}>
                    <AnimatedButton buttonFn={() => {setTeamFormOpen(true)}}>
                        <Text style={[styles.text, styles.buttonText]}>Add Team</Text>
                    </AnimatedButton>
                </View>
                </>
            }
        </ModalWrapper>
    )
}

export default TeamModal;