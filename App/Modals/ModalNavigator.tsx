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
import GameweekOverviewModal from "./GameweekOverviewModal";
import InfoModal from "./InfoModal";
import PlayerComparisonModal from "./PlayerComparisonModal";

interface ModalNavigatorProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const ModalNavigator = ({overview, fixtures} : ModalNavigatorProps) => {

    const modalInfo = useAppSelector(state => state.modal);
    const teamInfo = useAppSelector(state => state.team);

    return (
        <>
            

            {(modalInfo.modalType === ModalTypes.PlayerModal) &&
                <PlayerModal overview={overview} fixtures={fixtures} player={modalInfo.player} teamInfo={teamInfo}/>
            }

            {(modalInfo.modalType === ModalTypes.DetailedPlayerModal) &&
                <PlayerDetailedStatsModal overview={overview} fixtures={fixtures} player={modalInfo.player}/>
            }

            {(modalInfo.modalType === ModalTypes.PlayerComparisonModal) && 
                <PlayerComparisonModal overview={overview} fixtures={fixtures} playerOverview={modalInfo.playerOverview} playerSummary={modalInfo.playerSummary}/>
            }

            {(modalInfo.modalType === ModalTypes.GameweekOverviewModal) &&
                <GameweekOverviewModal overview={overview}/>
            }

            {(modalInfo.modalType === ModalTypes.InfoModal) &&
                <InfoModal/>
            }
            
            <TeamModal modalInfo={modalInfo}/>
        </>
    )
}

export default ModalNavigator;