import React from "react";
import TeamModal from "./TeamModal";
import PlayerDetailedStatsModal from "./PlayerDetailedStatsModal";
import PlayerModal from "./PlayerModal";
import { FplFixture } from "../Models/FplFixtures";
import { FplOverview } from "../Models/FplOverview";
import { useAppSelector } from "../Store/hooks";
import GameweekOverviewModal from "./GameweekOverviewModal";
import InfoModal from "./InfoModal";
import PlayerComparisonModal from "./PlayerComparisonModal";
import PopupModal from "./PopupModal/PopupModal";

interface ModalNavigatorProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const ModalNavigator = ({overview, fixtures} : ModalNavigatorProps) => {

    const modalInfo = useAppSelector(state => state.modal);
    const teamInfo = useAppSelector(state => state.team);

    return (
        <>
            <PlayerModal overview={overview} fixtures={fixtures} teamInfo={teamInfo} modalInfo={modalInfo}/>
            <PlayerDetailedStatsModal overview={overview} fixtures={fixtures} modalInfo={modalInfo}/>
            <PlayerComparisonModal overview={overview} fixtures={fixtures} modalInfo={modalInfo}/>
            <GameweekOverviewModal overview={overview} modalInfo={modalInfo}/>
            <InfoModal modalInfo={modalInfo}/>
            <TeamModal modalInfo={modalInfo}/>
            <PopupModal/>
        </>
    )
}

export default ModalNavigator;