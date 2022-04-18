import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View, Text } from "react-native";
import { OverviewStats } from "../../../Global/EnumsAndDicts";
import { height, Per90Stats } from "../../../Global/GlobalConstants";
import { FilterPlayerListPlayers, GetOwnedPlayersManagerShortInitials, GetStatValue, SortPlayerListPlayers } from "../../../Helpers/FplAPIHelpers";
import { addPlayerToWatchList, getPlayersWatchlist, PlayersWatchlist, removePlayerFromWatchlist } from "../../../Helpers/FplDataStorageService";
import TeamModal from "../../../Modals/TeamModal";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { useGetDraftLeagueInfoQuery, useGetDraftLeaguePlayerStatusesQuery, useGetDraftOverviewQuery, useGetDraftUserInfoQuery } from "../../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { openPlayerDetailedStatsModal } from "../../../Store/modalSlice";
import { TeamTypes } from "../../../Store/teamSlice";
import { CustomButton } from "../../Controls";
import { PlayerTableFilterState } from "../PlayerTable/PlayerTableFilterReducer";
import FixtureDifficultyList from "./FixtureDifficultyList";
import PlayerListInfo from "./PlayerListInfo/PlayerListInfo";
import { styles } from "./PlayerListStyles";

function getNum(val: number) {
    if (isNaN(val)) {
        return 0;
    }
    return val;
}

interface PlayerListProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    filters: PlayerTableFilterState;
}

const PlayerList = React.memo(({overview, fixtures, filters}: PlayerListProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);
    const [watchlist, setWatchlist] = useState({playerIds: []} as PlayersWatchlist | undefined);

    const dispatch = useAppDispatch();
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;

    //#region Draft League info to add if in draft league 
    const teamInfo = useAppSelector(state => state.team);
    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const draftUserInfo = useGetDraftUserInfoQuery((teamInfo.teamType === TeamTypes.Draft) ? teamInfo.info.id : skipToken );
    const draftLeagueInfo = useGetDraftLeagueInfoQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken)
    const draftLeagueRosters =  useGetDraftLeaguePlayerStatusesQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken)

    //#endregion

    //#region Player Watchlist
    useEffect( function initialSetup() {
        async function getWatchlist() {
            setWatchlist(await getPlayersWatchlist());
        }
        getWatchlist();
    },[]);

    const addToWatchlist = useCallback(async(playerId: number) => {
        await addPlayerToWatchList(playerId);
        setWatchlist(await getPlayersWatchlist());
    }, [])

    const removeFromWatchlist = useCallback(async(playerId: number) => {
        await removePlayerFromWatchlist(playerId);
        setWatchlist(await getPlayersWatchlist());
    }, [])

    //#endregion

    //#region Filter Effects
    useEffect(function FilterPlayerList() {   
        filteringPlayerList(); 
        
    }, [filters.teamFilter, filters.positionFilter, filters.statFilter, filters.isPer90, filters.isInWatchlist, watchlist]);

    useEffect(function debouncedFilterPlayerListPriceRange() {
        const timer = setTimeout(() => {
            filteringPlayerList();
        }, 500)
        
        return () => clearTimeout(timer);
    }, [filters.priceRange, filters.minutesRange]);

    useEffect(function debouncedFilterPlayerListPriceRange() {
        const timer = setTimeout(() => {
            filteringPlayerList();
        }, 300)

        return () => clearTimeout(timer);
    }, [filters.playerSearchText]);

    //#endregion 

    //#region Filter Functions
    const filteringPlayerList = () => {
        setPlayerList(overview.elements.filter(filterPlayers)
                                       .sort(sortPlayers));
    }

    const filterPlayers = useCallback((player: PlayerOverview) => {
        return FilterPlayerListPlayers(filters, player, overview, watchlist);
    }, [filters])

    const sortPlayers = useCallback((playerA: PlayerOverview, playerB: PlayerOverview) => {
        return SortPlayerListPlayers(filters, playerA, playerB);
    }, [filters.statFilter, filters.isPer90]);

    //#endregion

    //#region Flatlist Functions
    const getStatValue = useCallback((player : PlayerOverview) => {
        return GetStatValue(filters, player);
    }, [filters.statFilter, filters.isPer90]);

    const renderPlayerItem = ({item}: {item: PlayerOverview}) => {

        let isInWatchList = watchlist?.playerIds.includes(item.id);

        return (
        <Pressable key={item.id} style={styles.tableView} onPress={() => dispatch(openPlayerDetailedStatsModal(item))}>
            <View testID="watchlistButtonContainer" style={{flex: 0.60, justifyContent: 'center', opacity: isInWatchList ? 1 : 0.5}}>
                <CustomButton image={isInWatchList ? "favourite" : "unfavourite"} buttonFunction={isInWatchList ? () => removeFromWatchlist(item.id) : () => addToWatchlist(item.id)}/>
            </View>
            <View style={{ flex: 3, height: height * 0.05 }}>
                <PlayerListInfo overview={overview} player={item} owner={(teamInfo.teamType === TeamTypes.Draft) ? 
                                                                        GetOwnedPlayersManagerShortInitials(item.id, overview, draftOverview.data, draftLeagueRosters.data, draftLeagueInfo.data) : 
                                                                        null}/>
            </View>

            <View style={{ flex: 3 }}>
                <FixtureDifficultyList team={item.team} isFullList={false} currentGameweek={currentGameweek} fixtures={fixtures} overview={overview} />
            </View>

            <View style={[styles.tableNumberView, { flex: 1 }]}>
                <Text style={styles.tableText}>{getStatValue(item)}</Text>
            </View>
        </Pressable>)
    }

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);
    //#endregion
    
    return(
        <>
        {((teamInfo.teamType !== TeamTypes.Draft) || (draftUserInfo.data && draftLeagueInfo.data && draftLeagueRosters.data)) &&
        <FlatList
            data={playerList}
            renderItem={renderPlayerItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews={true}
            initialNumToRender={15}
            maxToRenderPerBatch={40}/>
        }
        </>
    )
});

export default PlayerList;
