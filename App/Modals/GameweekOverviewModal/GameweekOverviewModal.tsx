import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { AnimatedButton, ModalWrapper } from "../../Features/Controls";
import globalStyles from "../../Global/GlobalStyles";
import UserTeamInfo from "../../Helpers/FplDataStorageService";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeToBudgetTeam } from "../../Store/teamSlice";
import { styles } from "./GameweekOverviewModalStyles";
import PlayerView from "./PlayerView";


const GameweekOverviewModal = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { overview } = useContext(FplBaseDataContext);
    const teamInfo = useAppSelector(state => state.team);

    const openHighestScoringTeam = () => {
        if (overview) {
            dispatch(changeToBudgetTeam({id: overview.events.find(event => event.id === teamInfo.gameweek)?.highest_scoring_entry, name: 'Top Team', isDraftTeam: false, isFavourite: false} as UserTeamInfo));
            navigation.goBack();
        }
    }

    return (

        <ModalWrapper modalHeight={'60%'} modalWidth={'70%'}>
            { overview && 
                <View style={styles.modalView}>

                    <Text style={styles.titleText}>Gameweek {teamInfo.gameweek} Summary</Text>

                    <View style={styles.pointsView}>
                        <View style={styles.pointsContainer}>
                            <Text style ={styles.headerText}>Average Points</Text>
                            <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.average_entry_score}</Text>
                        </View>
                        <View style={styles.pointsContainer}>
                            <AnimatedButton buttonFn={openHighestScoringTeam}>
                                <View style={[styles.highestPointsButton, globalStyles.shadow]}>
                                    <Text style={styles.headerText}>Highest Points</Text>
                                    <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.highest_score}</Text>
                                </View>
                            </AnimatedButton>
                        </View>
                    </View>
                    

                    <View style={styles.playerContainer}>
                        <View style={styles.playerContainerRow}>
                            <PlayerView overview={overview} header={'Most Selected'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_selected}/>
                            <PlayerView overview={overview} header={'Most Transferred'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_transferred_in}/>
                            <PlayerView overview={overview} header={'Top Player'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.top_element}/>
                        </View>
                        <View style={styles.playerContainerRow}>
                            <PlayerView overview={overview} header={'Most Captained'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_captained}/>
                            <PlayerView overview={overview} header={'Most Vice Captained'} id={overview.events.find(event => event.id === teamInfo.gameweek)?.most_vice_captained}/>
                        </View>
                    </View>
                </View>
            }
        </ModalWrapper>        
    )
}

export default GameweekOverviewModal;