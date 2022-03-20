import React from "react";
import { Pressable, View } from "react-native";
import TeamModal from "./TeamModal";
import PlayerDetailedStatsModal from "./PlayerDetailedStatsModal";
import PlayerModal from "./PlayerModal";
import globalStyles from "../Global/GlobalStyles";
import { FplFixture } from "../Models/FplFixtures";
import { FplOverview } from "../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { closeModal, ModalTypes } from "../Store/modalSlice";

interface BaseModalProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const BaseModal = ({overview, fixtures} : BaseModalProps) => {

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

            {(modalInfo.modalType === ModalTypes.TeamModal) &&
                <TeamModal modalInfo={modalInfo}/>
            }
        </>
    )
}

export default BaseModal;