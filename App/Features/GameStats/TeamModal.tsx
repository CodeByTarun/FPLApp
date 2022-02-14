import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Modal, Pressable, View, Image, Text, ScrollView, TextInput, StyleSheet, Switch, TouchableWithoutFeedback, Keyboard } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Icons } from "../../Global/Images";
import UserTeamInfo, { changeFavouriteUserTeam, getAllUserTeamInfo, removeUserTeamInfo, addUserTeamInfo, editUserTeamInfo } from "../../Helpers/FplDataStorageService";
import { StringMappingType } from "typescript";
import { useAppDispatch } from "../../Store/hooks";
import { changeToBudgetTeam, changeToDraftTeam } from "../../Store/teamSlice";
import CloseButton from "../Controls/CloseButton";

enum UserTeamActionKind {
    ChangeName,
    ChangeID,
    IsDraft,
    SetTeamEditing,
    Reset,
}

type UserTeamActions = {
    type: UserTeamActionKind.ChangeName;
    value: string;
    data: UserTeamInfo[] | undefined;
} | {
    type: UserTeamActionKind.ChangeID;
    value: string;
    data: UserTeamInfo[] | undefined;
} | {
    type: UserTeamActionKind.IsDraft;
    value: boolean;
    data: UserTeamInfo[] | undefined;
}| {
    type: UserTeamActionKind.SetTeamEditing;
    value: UserTeamInfo;
} | {
    type: UserTeamActionKind.Reset;
}

interface UserTeamState {
    userTeam : UserTeamInfo,
    error: string | null,
    teamEditing: UserTeamInfo | null,
}

const userTeamInitialState: UserTeamState = {
    userTeam: { isDraftTeam: false, isFavourite: false } as UserTeamInfo,
    error: null,
    teamEditing: null,
}

function userTeamReducer(state: UserTeamState, action: UserTeamActions) : UserTeamState {
    
    let errorMessage: string | null = null; 

    switch (action.type) {
        case UserTeamActionKind.ChangeName: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.some(team => team.name === action.value)) {
                errorMessage = 'This team name is already used.'
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    name: action.value,
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.ChangeID: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.filter(team => team.isDraftTeam === state.userTeam.isDraftTeam)
                                    .some(team => team.id.toString() === action.value)) {
                errorMessage = "This team has already been added."                                        
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    id: parseInt(action.value),
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.IsDraft: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.filter(team => team.isDraftTeam === state.userTeam.isDraftTeam)
                                          .some(team => team.id === state.userTeam.id)) {
                errorMessage = "This team has already been added."                                        
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    isDraftTeam: action.value,
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.SetTeamEditing:
            return {
                userTeam: action.value,
                error: null,
                teamEditing: action.value,
            };
        case UserTeamActionKind.Reset:
            return userTeamInitialState;
    }
}

interface TeamModalProps {
    isVisible: boolean;
    isVisibleFunction : (value: React.SetStateAction<boolean>) => void;
}

const TeamModal = (props: TeamModalProps) => {

    const [userTeams, setUserTeams] = useState([] as UserTeamInfo[] | undefined);
    const [confirmIsDisabled, setConfirmIsDisabled] = useState(true)
    const [teamFormOpen, setTeamFormOpen] = useState(false);
    const [userTeamState, userTeamDispatch] = useReducer(userTeamReducer, userTeamInitialState);
    const dispatch = useAppDispatch();

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

    useEffect( function resetModal() {
        if (props.isVisible === false) {
            userTeamDispatch({ type: UserTeamActionKind.Reset })
            setTeamFormOpen(false);
        }
    }, [props.isVisible])

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
    }, [])

    const selectedATeam = useCallback((teamSelected: UserTeamInfo) => {
        if (teamSelected.isDraftTeam === true) {
            dispatch(changeToDraftTeam(teamSelected))
        } 
        else {
            dispatch(changeToBudgetTeam(teamSelected))
        }
        props.isVisibleFunction(false);
    }, [])

    return (
        <Modal animationType="fade" transparent={true} visible={props.isVisible}>
            <View style={globalStyles.modalBackground}/>

            <View style={[globalStyles.modalView, globalStyles.modalShadow, {height: '50%'}]}>
                <CloseButton boolFunction={props.isVisibleFunction}/>
                <Text style={[styles.titleText]}>{(teamFormOpen) ? (userTeamState.teamEditing) ? "Edit Team" : "Add Team" : "My Teams"}</Text>

            { (teamFormOpen) ?
                <View style={styles.modalAddTeamView}>
                    
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput style={[styles.text, styles.textInput]} 
                                   placeholder="Team Name" 
                                   placeholderTextColor={'lightgray'}
                                   returnKeyType="done"
                                   maxLength={20}
                                   spellCheck={false}
                                   value={ userTeamState.userTeam.name }
                                   onChangeText={ text => userTeamDispatch({ type: UserTeamActionKind.ChangeName, value: text, data: userTeams })}/>
                    </View>

                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput style={[styles.text, styles.textInput]} 
                                   placeholder="Manager ID" 
                                   placeholderTextColor={'lightgray'}
                                   keyboardType="numeric"
                                   returnKeyType="done"
                                   maxLength={9}
                                   value={ (userTeamState.userTeam.id) ? userTeamState.userTeam.id.toString() : '' }
                                   onChangeText={ text => userTeamDispatch({ type: UserTeamActionKind.ChangeID, value: text, data: userTeams })}/>
                    </View>

                    <View style={{flex: 1, flexDirection:'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {padding: 7}]}>Is this a draft team?</Text>
                        <Switch style={[styles.switch]} trackColor={{false: 'red', true: 'green'}} 
                                value={ userTeamState.userTeam.isDraftTeam } 
                                onValueChange={ value => userTeamDispatch({ type: UserTeamActionKind.IsDraft, value: value, data: userTeams })}/>
                    </View>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <Text style={[styles.text, {color: 'orangered', padding: 7}]}>{ userTeamState.error }</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Pressable style={[styles.formButton, {backgroundColor: (userTeamState.teamEditing) ? 'red' : 'grey' }]}
                                    onPress={(userTeamState.teamEditing) ? removeATeam : closeForm}>
                                <Text style={{alignSelf:'center'}}>{(userTeamState.teamEditing) ? 'Delete' : 'Back'}</Text>
                            </Pressable>
                        </View>                         

                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Pressable style={[styles.formButton, {backgroundColor: 'limegreen', opacity: confirmIsDisabled ? 0.5 : 1}]}
                                       disabled={confirmIsDisabled}
                                       onPress={(userTeamState.teamEditing) ? editTeam : addTeam}>
                                <Text style={{alignSelf:'center'}}>Confirm</Text>
                            </Pressable>
                        </View>
                    </View>
                </View> : 
                <>
                <ScrollView style={styles.modalTeamList}>
                { (userTeams && userTeams.length > 0) &&
                    userTeams.map((team) => 
                        <View style={styles.modalListRow} key={team.id}>
                            <Pressable style={styles.favouriteButton} onPress={() => { favouriteATeam(team) }}>
                                <Image style={styles.icon} source={team.isFavourite ? Icons['favourite'] : Icons['unfavourite']} resizeMode="contain"/>
                            </Pressable>
                            <Pressable style={styles.teamButton} onPress={() => selectedATeam(team)}>
                                <Text style={styles.text}>{team.name}</Text>
                            </Pressable>
                            <Pressable style={styles.editButton} onPress={() => openEditTeam(team)}> 
                                <Image style={styles.icon} source={Icons['edit']} resizeMode="contain"/>
                            </Pressable>
                        </View> 
                    )
                }
                </ScrollView>
                <Pressable style={styles.addButton} onPress={() => {setTeamFormOpen(true)}}>
                    <Text style={[styles.text, styles.buttonText]}>Add Team</Text>
                </Pressable></>
            }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create(
    {
        //#region Modal Styling
        closeButton: {
            position: 'absolute',
            zIndex: 1,
            right: 0,
            height: 15,
            width: 15,
            margin: 15,
        },

        titleText: {
            alignSelf: 'center',
            color: GlobalConstants.modalTextColor,
            fontSize: GlobalConstants.largeFont,
            fontWeight: 'bold',
            marginTop: 12, 
            marginBottom: 5,
        },

        text: {
            color: GlobalConstants.modalTextColor,
            fontSize: GlobalConstants.mediumFont,
        },

        textInput: {
            backgroundColor: GlobalConstants.modalButtonColor,
            height: '70%',
            padding: 7,
            borderRadius: GlobalConstants.cornerRadius,
        },

        modalAddTeamView: {
            borderRadius: GlobalConstants.cornerRadius,
            padding: 8,
            flex: 1,
        },

        switch: {
            height: '45%',
            width: '25%',
            transform: [
                {scaleX: 0.8 },
                { scaleY: 0.8 }
            ]
        },

        formButton: {
            justifyContent: 'center',
            backgroundColor: 'limegreen',
            padding: 9,
            width: GlobalConstants.width * 0.25,
            borderRadius: GlobalConstants.cornerRadius,
        },

        modalListRow: {
            flexDirection: 'row',
            padding: 2,
            flex: 1,
            alignItems: 'center',
        },
        
        button: {
            justifyContent: 'center',
        },

        icon: {
            width: '80%',
            height: '80%',
            aspectRatio: 1,
            alignSelf: 'center'
        },

        modalTeamList: {
            flex: 1,
            margin: 5,
        },        

        addButton: {
            width: '40%',
            backgroundColor: GlobalConstants.modalButtonColor,
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: GlobalConstants.cornerRadius,
            alignSelf: 'center',
            marginTop: 5,
        },

        buttonText: {
            fontSize: GlobalConstants.mediumFont,
        },

        favouriteButton: {
            flex: 1,
            justifyContent: 'center'
        },

        teamButton: {
            flex: 7,
            marginLeft: 5,
        },

        
    


        editButton: {
            flex: 1,
            justifyContent: 'center',
            padding: 3,
        },




    }
)

export default TeamModal;