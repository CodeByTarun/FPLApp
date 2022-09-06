import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { goToFixturesScreen, goToPlayerStatsScreen } from "../../Store/navigationSlice";
import { changeToDreamTeam } from "../../Store/teamSlice";
import { BottomTabsStyle } from "./BottomTabsStyle";
import TabButton from "./TabButton";

const BottomTabs = () => {

    const theme = useTheme();
    const styles = BottomTabsStyle(theme);

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
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.tabBarWidth}>
                <TabButton fn={goToDreamTeam} imageName='dreamteam' header="Dream Team"/>

                {VerticalSeparator(theme)}

                <TabButton fn={openOverview} imageName='strategy' header="Overview"/>
    
                {VerticalSeparator(theme)}
                
                <TabButton fn={goToFixtures} imageName='calendar' header="Fixtures"/>

                {VerticalSeparator(theme)}
                
                <TabButton fn={goToPlayersSearch} imageName='playersearch' header="Players"/>

                {VerticalSeparator(theme)}

                <TabButton fn={openMyTeams} imageName='team' header="My Teams"/>
            </View>
        </View>
    );
}

export default BottomTabs;