import { useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext, useState } from "react";
import { Pressable, View, Text } from "react-native";
import { RootStackParams } from "../../../../../../App";
import { FplBaseDataContext } from "../../../../../AppContext";
import { GetOwnedPlayersManagerShortInitials, GetStatValue } from "../../../../../Helpers/FplAPIHelpers";
import { PlayersWatchlist } from "../../../../../Helpers/FplDataStorageService";
import { PlayerOverview } from "../../../../../Models/FplOverview";
import { useAppDispatch } from "../../../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../../../Store/modalSlice";
import { CustomButton } from "../../../../Controls";
import { DraftData } from "../../PlayerListContainer";
import FixtureDifficultyList from "../FixtureDifficultyList";
import PlayerListInfo from "../PlayerListInfo";
import { PlayerItemStyles } from "./PlayerItemStyles";

interface PlayerItemProps {
    player: PlayerOverview;
    draftData: DraftData;
    watchList: PlayersWatchlist | undefined;
    navigation: StackNavigationProp<RootStackParams, keyof RootStackParams, undefined>;
    isPer90: boolean;
    statFilter: string;
    addToWatchlist: (playerId: number) => Promise<void>;
    removeFromWatchlist: (playerId: number) => Promise<void>;
}

const PlayerItem = React.memo(({player, draftData, watchList, navigation, isPer90, statFilter, addToWatchlist, removeFromWatchlist} : PlayerItemProps) => {

    const theme = useTheme();
    const styles = PlayerItemStyles(theme);

    const dispatch = useAppDispatch();
    const { overview } = useContext(FplBaseDataContext);
    
    const [inWatchList, setInWatchList] = useState(watchList?.playerIds.includes(player.id));

    const addToWatchlistFn = useCallback(async(playerId: number) => {
        await addToWatchlist(playerId);
        setInWatchList(true);
    }, []);

    const removeFromWatchlistFn = useCallback(async(playerId: number) => {
        await removeFromWatchlist(playerId);
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
        <Pressable testID="playerItem" key={player.id} style={styles.tableView} onPress={pressPlayerFn}>
            <View testID="watchlistButtonContainer" style={[styles.watchListButtonContainer, {opacity: inWatchList ? 1 : 0.5}]}>
                <CustomButton image={inWatchList ? "favourite" : "unfavourite"} buttonFunction={inWatchList ? () => removeFromWatchlistFn(player.id) : () => addToWatchlistFn(player.id)}/>
            </View>
            <View style={styles.playerListInfoContainer}>
                <PlayerListInfo overview={overview} player={player} owner={(draftData.draftLeagueRosters) ? 
                                                                        GetOwnedPlayersManagerShortInitials(player.id, overview, draftData.draftOverview, draftData.draftLeagueRosters, draftData.draftLeagueInfo) : 
                                                                        null}/>
            </View>

            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <View style={{alignSelf: 'center'}}>
                    <FixtureDifficultyList team={player.team} isFullList={false} />
                </View>
            </View>

            <View style={[styles.tableNumberView]}>
                <Text style={styles.tableText}>{getStatValue(player)}</Text>
            </View>
        </Pressable>
    )

});

export default React.memo(PlayerItem);

PlayerItem.displayName = 'PlayerItem';