import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { Pressable, View, Text } from "react-native";
import { RootStackParams } from "../../../../../App";
import { GetOwnedPlayersManagerShortInitials, GetStatValue } from "../../../../Helpers/FplAPIHelpers";
import { addPlayerToWatchList, PlayersWatchlist, removePlayerFromWatchlist } from "../../../../Helpers/FplDataStorageService";
import { FplDraftLeagueInfo } from "../../../../Models/FplDraftLeagueInfo";
import { FplDraftLeaguePlayerStatuses } from "../../../../Models/FplDraftLeaguePlayerStatuses";
import { FplDraftOverview } from "../../../../Models/FplDraftOverview";
import { FplFixture } from "../../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../../Models/FplOverview";
import { useAppDispatch } from "../../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../../Store/modalSlice";
import { TeamInfo, TeamTypes } from "../../../../Store/teamSlice";
import { CustomButton } from "../../../Controls";
import FixtureDifficultyList from "../FixtureDifficultyList";
import PlayerListInfo from "../PlayerListInfo";
import { styles } from "./PlayerItemStyles";

interface PlayerItemProps {
    player: PlayerOverview;
    fixtures: FplFixture[];
    overview: FplOverview;
    teamInfo: TeamInfo;
    draftOverview: FplDraftOverview | undefined;
    draftLeagueRosters: FplDraftLeaguePlayerStatuses | undefined;
    draftLeagueInfo: FplDraftLeagueInfo | undefined;
    watchList: PlayersWatchlist | undefined;
    navigation: StackNavigationProp<RootStackParams, keyof RootStackParams, undefined>;
    isPer90: boolean;
    statFilter: string;
}

const PlayerItem = React.memo(({player, fixtures, overview, teamInfo, draftOverview, draftLeagueInfo, draftLeagueRosters, watchList, navigation, isPer90, statFilter} : PlayerItemProps) => {

    const dispatch = useAppDispatch();
    
    const [inWatchList, setInWatchList] = useState(watchList?.playerIds.includes(player.id));

    const addToWatchlist = useCallback(async(playerId: number) => {
        await addPlayerToWatchList(playerId);
        setInWatchList(true);
    }, []);

    const removeFromWatchlist = useCallback(async(playerId: number) => {
        await removePlayerFromWatchlist(playerId);
        setInWatchList(false);
    }, []);

    const pressPlayerFn = useCallback(() => {
        dispatch(changePlayerOverviewInfo(player));
        navigation.navigate('PlayerDetailedStatsModal');
    }, []);

    const getStatValue = useCallback((player : PlayerOverview) => {
        return GetStatValue(isPer90, statFilter, player);
    }, [statFilter, isPer90]);

    return (
        <Pressable key={player.id} style={styles.tableView} onPress={pressPlayerFn}>
            <View testID="watchlistButtonContainer" style={[styles.watchListButtonContainer, {opacity: inWatchList ? 1 : 0.5}]}>
                <CustomButton image={inWatchList ? "favourite" : "unfavourite"} buttonFunction={inWatchList ? () => removeFromWatchlist(player.id) : () => addToWatchlist(player.id)}/>
            </View>
            <View style={styles.playerListInfoContainer}>
                <PlayerListInfo overview={overview} player={player} owner={(teamInfo.teamType === TeamTypes.Draft) ? 
                                                                        GetOwnedPlayersManagerShortInitials(player.id, overview, draftOverview, draftLeagueRosters, draftLeagueInfo) : 
                                                                        null}/>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                    <FixtureDifficultyList team={player.team} isFullList={false} fixtures={fixtures} overview={overview} liveGameweek={teamInfo.liveGameweek} />
                </View>
            </View>

            <View style={[styles.tableNumberView]}>
                <Text style={styles.tableText}>{getStatValue(player)}</Text>
            </View>
        </Pressable>
    )

});

export default PlayerItem;