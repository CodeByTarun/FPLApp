import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { VerticalSeparator } from "../../Global/GlobalComponents";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { goToFixturesScreen, goToPlayerStatsScreen } from "../../Store/navigationSlice";
import { changeToDreamTeam } from "../../Store/teamSlice";
import { styles } from "./BottomTabsStyle";
import TabButton from "./TabButton";

const BottomTabs = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { overview } = useContext(FplBaseDataContext);
    const liveGameweek = overview?.events.filter((event) => { return event.is_current === true; })[0]?.id;
    const gameweek = useAppSelector(state => state.team.gameweek);

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

            <TabButton fn={goToDreamTeam} imageName='dreamteam' header="Dream Team" isDisabled={((liveGameweek === undefined) || (gameweek > liveGameweek))}/>

            <VerticalSeparator/>

            <TabButton fn={openOverview} imageName='strategy' header="Overview" isDisabled={((liveGameweek === undefined) || (gameweek > liveGameweek))}/>
 
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