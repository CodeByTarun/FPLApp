import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Seperator } from "../../../Global/GlobalComponents";
import globalStyles from "../../../Global/GlobalStyles";
import UserTeamInfo, { getAllUserTeamInfo } from "../../../Helpers/FplDataStorageService";
import { useAppDispatch } from "../../../Store/hooks";
import { closeModal, openTeamModal } from "../../../Store/modalSlice";
import { changeToDraftTeam, changeToBudgetTeam } from "../../../Store/teamSlice";
import { styles } from "./TeamListViewStyle";

interface TeamListViewProps {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamListView = ({setIsVisible} : TeamListViewProps) => {

    const dispatch = useAppDispatch();
    const [userTeams, setUserTeams] = useState([] as UserTeamInfo[] | undefined);

    useEffect( function initialSetup() {
        async function getTeams() {
            setUserTeams(await getAllUserTeamInfo());
        }
        getTeams();
    },[]);

    const selectedATeam = useCallback((teamSelected: UserTeamInfo) => {
        if (teamSelected.isDraftTeam === true) {
            dispatch(changeToDraftTeam(teamSelected))
        } 
        else {
            dispatch(changeToBudgetTeam(teamSelected))
        }
        setIsVisible(false);
    }, []);

    const addATeam = useCallback(() => {

        dispatch(openTeamModal());
        setIsVisible(false);

    }, [])

    return (
        <View style={styles.container}>
            { (userTeams && userTeams.length > 0) ?
                <>
                    <Text style={styles.titleText}>Teams</Text>
                    <ScrollView> 
                        {userTeams.map(team => 
                        <View key={team.id}>
                            <TouchableOpacity style={styles.button} onPress={() => selectedATeam(team)}>
                                <Text numberOfLines={1} style={styles.buttonText}>{team.name}</Text>
                            </TouchableOpacity> 
                            <Seperator/>
                        </View>)}  
                    </ScrollView>
                </>
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.addTeamButton} onPress={addATeam}>
                        <Text style={styles.addTeamButtonText}>Add a Team</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default TeamListView;