import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { RootStackParams } from "../../../../../App";
import { PlayerOverview } from "../../../../Models/FplOverview";
import { DraftData, PlayerListData } from "../PlayerListContainer";
import PlayerItem from "./PlayerItem";


interface PlayerListProps {
    playerListData: PlayerListData;
    draftData: DraftData;
    addToWatchlist: (playerId: number) => Promise<void>;
    removeFromWatchlist: (playerId: number) => Promise<void>;
}

const PlayerList = React.memo(({playerListData, draftData, addToWatchlist, removeFromWatchlist}: PlayerListProps) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const renderPlayerItem = useCallback(({item}: {item: PlayerOverview}) => {

        return <PlayerItem player={item} draftData={draftData}
                           watchList={playerListData.watchList} navigation={navigation} isPer90={playerListData.isPer90} statFilter={playerListData.statFilter} 
                           addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist}/>

    }, [playerListData.isPer90, playerListData.statFilter, draftData, playerListData.watchList]);

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);
    //#endregion


    return(
        <FlatList
            testID="playerList"
            data={playerListData.playerList}
            renderItem={renderPlayerItem}
            keyExtractor={keyExtractor}
            initialNumToRender={15}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={500}/> 
    )
});

export default PlayerList;

PlayerList.displayName = 'PlayerList';