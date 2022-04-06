import React from "react";
import { Pressable } from "react-native";
import TeamModal from "./TeamModal";
import PlayerDetailedStatsModal from "./PlayerDetailedStatsModal";
import PlayerModal from "./PlayerModal";
import globalStyles from "../Global/GlobalStyles";
import { FplFixture } from "../Models/FplFixtures";
import { FplOverview } from "../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { closeModal, ModalTypes } from "../Store/modalSlice";
import GameweekModal from "./GameweekModal";
import GameweekOverviewModal from "./GameweekOverviewModal";

interface ModalNavigatorProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const ModalNavigator = ({overview, fixtures} : ModalNavigatorProps) => {

    const dispatch = useAppDispatch();
    const modalInfo = useAppSelector(state => state.modal);
    const teamInfo = useAppSelector(state => state.team);

    return (
        <>
            {(modalInfo.modalType !== ModalTypes.Closed) &&
                <Pressable style={[globalStyles.modalBackground, {backgroundColor: 'black'}]} onPress={() => dispatch(closeModal())}/>
            }

            {(modalInfo.modalType === ModalTypes.PlayerModal) &&
                <PlayerModal overview={overview} fixtures={fixtures} player={modalInfo.player} teamInfo={teamInfo}/>
            }

            {(modalInfo.modalType === ModalTypes.DetailedPlayerModal) &&
                <PlayerDetailedStatsModal overview={overview} fixtures={fixtures} player={modalInfo.player}/>
            }

            {(modalInfo.modalType === ModalTypes.GameweekOverviewModal) &&
                <GameweekOverviewModal overview={overview}/>
            }
            
            <TeamModal modalInfo={modalInfo}/>
            <GameweekModal overview={overview} fixtures={fixtures} isVisible={(modalInfo.modalType === ModalTypes.GameweekModal)}/>
        </>
    )
}

export default ModalNavigator;