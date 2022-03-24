import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import PlayerListItem from "./PlayerListItem";

interface PlayerListProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    playerList: PlayerOverview[],
    statFilter: string,
}

const PlayerList = React.memo(({overview, fixtures, playerList, statFilter}: PlayerListProps) => {
    
    const renderPlayerItem = useCallback((({item}: {item: PlayerOverview}) => {
        return(
            <PlayerListItem overview={overview} fixtures={fixtures} player={item} statFilter={statFilter}/>
        )}), [statFilter]);

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);
    
    return(
        <FlatList
            data={playerList}
            renderItem={renderPlayerItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews={true}
            maxToRenderPerBatch={50}/>
    )
});

export default PlayerList;
