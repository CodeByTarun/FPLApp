import React from "react";
import { Modal, Pressable, View, Text, TouchableOpacity } from "react-native";
import { CloseButton, ModalWrapper } from "../../Features/Controls";
import { cornerRadius, secondaryColor } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import UserTeamInfo from "../../Helpers/FplDataStorageService";
import { FplOverview } from "../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { closeModal, ModalInfo, ModalTypes } from "../../Store/modalSlice";
import { changeToBudgetTeam } from "../../Store/teamSlice";
import { styles } from "./GameweekOverviewModalStyles";
import PlayerView from "./PlayerView";

interface GameweekOverviewModalProps {
    overview: FplOverview;
    modalInfo: ModalInfo;
}

const GameweekOverviewModal = ({overview, modalInfo} : GameweekOverviewModalProps) => {

    const dispatch = useAppDispatch();
    const teamInfo = useAppSelector(state => state.team);

    const openHighestScoringTeam = () => {
        dispatch(changeToBudgetTeam({id: overview.events.find(event => event.id === teamInfo.gameweek)?.highest_scoring_entry, name: 'Top Team', isDraftTeam: false, isFavourite: false} as UserTeamInfo));
        dispatch(closeModal());
    }

    return (

        <ModalWrapper isVisible={modalInfo.modalType === ModalTypes.GameweekOverviewModal} closeFn={() => dispatch(closeModal())} modalHeight={'60%'} modalWidth={'70%'}>
            <View style={styles.modalView}>

                <Text style={styles.titleText}>Gameweek {teamInfo.gameweek} Summary</Text>

                <View style={styles.pointsView}>
                    <View style={styles.pointsContainer}>
                        <Text style ={styles.headerText}>Average Points</Text>
                        <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.average_entry_score}</Text>
                    </View>
                    <View style={styles.pointsContainer}>
                        <TouchableOpacity style={[{backgroundColor: secondaryColor, padding: 7, borderRadius: cornerRadius}, globalStyles.shadow]}
                                          onPress={openHighestScoringTeam}>
                            <Text style={styles.headerText}>Highest Points</Text>
                            <Text style={styles.scoreText}>{overview.events.find(event => event.id === teamInfo.gameweek)?.highest_score}</Text>
                        </TouchableOpacity>
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
        </ModalWrapper>        
    )
}

export default GameweekOverviewModal;