import { Player } from "./FplGameweek";
import { PlayerOverview } from "./FplOverview";

export interface PlayerData {
    gameweekData: Player,
    overviewData: PlayerOverview,
    isCaptain: boolean,
    isViceCaptain: boolean,
}