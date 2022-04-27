import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Seperator } from "../../../Global/GlobalComponents";
import UserTeamInfo, { getAllUserTeamInfo } from "../../../Helpers/FplDataStorageService";
import { styles } from "./TeamListViewStyle";

const TeamListView = () => {

    const [userTeams, setUserTeams] = useState([] as UserTeamInfo[] | undefined);

    useEffect( function initialSetup() {
        async function getTeams() {
            setUserTeams(await getAllUserTeamInfo());
        }
        getTeams();
    },[]);


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Teams</Text>
            { userTeams && 
                userTeams.map(team => 
                <>
                    <TouchableOpacity>
                        <Text>{team.name}</Text>
                    </TouchableOpacity> 
                <Seperator/>
                </>       
            )}
        </View>
    )

}

export default TeamListView;