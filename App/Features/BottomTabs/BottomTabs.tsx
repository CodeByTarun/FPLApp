import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { RootStackParams } from "../../../App";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { useAppDispatch } from "../../Store/hooks";
import { goToFixturesScreen, goToPlayerStatsScreen } from "../../Store/navigationSlice";
import { changeToDreamTeam } from "../../Store/teamSlice";
import { styles } from "./BottomTabsStyle";
import TabButton from "./TabButton";

const BottomTabs = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const goToDreamTeam = () => {
        dispatch(changeToDreamTeam());
    }

    const openOverview = () => {
        navigation.navigate("GameweekOverview");
    }

    const goToFixtures = () => {
        dispatch(goToFixturesScreen());
    }

    const goToPlayersSearch = () => {
        dispatch(goToPlayerStatsScreen());
    }

    const openMyTeams = () => {
        navigation.navigate('TeamModal');
    }

    return (
        <View style={[styles.container]}>

            <TabButton fn={goToDreamTeam} imageName='dreamteam' header="Dream Team"/>

            <VerticalSeparator/>

            <TabButton fn={openOverview} imageName='strategy' header="Overview"/>
 
            <VerticalSeparator/>
            
            <TabButton fn={goToFixtures} imageName='calendar' header="Fixtures"/>

            <VerticalSeparator/>
            
            <TabButton fn={goToPlayersSearch} imageName='playersearch' header="Players"/>

            <VerticalSeparator/>

            <TabButton fn={openMyTeams} imageName='team' header="My Teams"/>

        </View>
    );
}

export default BottomTabs;