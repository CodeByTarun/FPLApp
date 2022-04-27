import React from "react";
import { View } from "react-native";
import { draftOverview } from "../../../Tests/SampleData/Overviews";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import globalStyles from "../../Global/GlobalStyles";
import { useAppDispatch } from "../../Store/hooks";
import { openGameweekOverviewModal, openTeamModal } from "../../Store/modalSlice";
import { goToFixturesScreen, goToPlayerStatsScreen } from "../../Store/navigationSlice";
import { changeToDreamTeam } from "../../Store/teamSlice";
import { styles } from "./BottomTabsStyle";
import TabButton from "./TabButton";

const BottomTabs = () => {

    const dispatch = useAppDispatch();

    const goToDreamTeam = () => {
        dispatch(changeToDreamTeam());
    }

    const openOverview = () => {
        dispatch(openGameweekOverviewModal());
    }

    const goToFixtures = () => {
        dispatch(goToFixturesScreen());
    }

    const goToPlayersSearch = () => {
        dispatch(goToPlayerStatsScreen());
    }

    const openMyTeams = () => {
        dispatch(openTeamModal());
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