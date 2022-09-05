import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FilterPlayerListPlayers, SortPlayerListPlayers } from "../../../Helpers/FplAPIHelpers";
import { addPlayerToWatchList, getPlayersWatchlist, PlayersWatchlist, removePlayerFromWatchlist } from "../../../Helpers/FplDataStorageService";
import { FplDraftLeagueInfo } from "../../../Models/FplDraftLeagueInfo";
import { FplDraftLeaguePlayerStatuses } from "../../../Models/FplDraftLeaguePlayerStatuses";
import { FplDraftOverview } from "../../../Models/FplDraftOverview";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { useGetDraftOverviewQuery, useGetDraftUserInfoQuery, useGetDraftLeagueInfoQuery, useGetDraftLeaguePlayerStatusesQuery } from "../../../Store/fplSlice";
import { useAppSelector } from "../../../Store/hooks";
import { TeamTypes } from "../../../Store/teamSlice";
import { PlayerTableFilterState } from "../PlayerTable/PlayerTableFilterReducer";
import PlayerList from "./PlayerList/PlayerList";

interface PlayerListContainerProps {
    overview: FplOverview;
    filters: PlayerTableFilterState;
}

export interface DraftData {
    draftOverview: FplDraftOverview | undefined;
    draftLeagueRosters: FplDraftLeaguePlayerStatuses | undefined;
    draftLeagueInfo: FplDraftLeagueInfo | undefined;
}

export interface PlayerListData {
    playerList: PlayerOverview[];
    watchList: PlayersWatchlist | undefined;
    isPer90: boolean;
    statFilter: string;
}

const PlayerListContainer = ({overview, filters} : PlayerListContainerProps) => {

    const [playerListData, setPlayerListData] = useState({ playerList: [] as PlayerOverview[], watchList: {playerIds: []} as PlayersWatchlist | undefined } as PlayerListData)

    const teamInfo = useAppSelector(state => state.team);

    //#region watchlist
    const watchlist = useRef([] as number[]);

    const addToWatchlist = useCallback(async(playerId: number) => {
        await addPlayerToWatchList(playerId);
        watchlist.current.push(playerId);

    }, []);

    const removeFromWatchlist = useCallback(async(playerId: number) => {
        await removePlayerFromWatchlist(playerId);

        watchlist.current = watchlist.current.filter(id => id !== playerId);
    }, []);
    //#endregion
    
    //#region Draft Data

    const [draftData, setDraftData] = useState({} as DraftData);

    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const draftUserInfo = useGetDraftUserInfoQuery((teamInfo.teamType === TeamTypes.Draft) ? teamInfo.info.id : skipToken );
    const draftLeagueInfo = useGetDraftLeagueInfoQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken);
    const draftLeagueRosters =  useGetDraftLeaguePlayerStatusesQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken);

    useEffect( function settingDraftData() {

        if (draftOverview.isSuccess && draftUserInfo.isSuccess && draftLeagueInfo.isSuccess && draftLeagueRosters.isSuccess) { 
            setDraftData({draftOverview: draftOverview.data, draftLeagueRosters: draftLeagueRosters.data, draftLeagueInfo: draftLeagueInfo.data});
        }

        else if (!draftOverview.isSuccess && !draftUserInfo.isSuccess && !draftLeagueInfo.isSuccess && !draftLeagueRosters.isSuccess) {
            setDraftData({draftOverview: undefined, draftLeagueRosters: undefined, draftLeagueInfo: undefined});
        }   

    }, [draftOverview.isSuccess, draftUserInfo.isSuccess, draftLeagueInfo.isSuccess, draftLeagueRosters.isSuccess]);

    //#endregion

    // sorting should be done here as well for the playerlist changes 

    useEffect( function initialSetup() {
        async function getWatchlist() {

            let initialWatchlist = (await getPlayersWatchlist())?.playerIds;
            watchlist.current = initialWatchlist ?? [] as number[];
        }
        getWatchlist();
    },[]);

    useEffect(function FilterPlayerList() {  

        filteringPlayerList();

    }, [filters.teamFilter, filters.positionFilter, filters.statFilter, filters.isPer90, filters.isInWatchlist, filters.priceRange, filters.minutesRange]);

    useEffect(function debouncedFilterPlayerListPriceRange() {
        const timer = setTimeout(() => {
            filteringPlayerList();
        }, 300)

        return () => clearTimeout(timer);
    }, [filters.playerSearchText]);

    const filteringPlayerList = () => {

        let playerList = overview.elements.filter(filterPlayers).sort(sortPlayers);

        setPlayerListData({playerList: playerList, watchList: {playerIds: watchlist.current}, isPer90: filters.isPer90, statFilter: filters.statFilter});
    }

    const filterPlayers = useCallback((player: PlayerOverview) => {
        return FilterPlayerListPlayers(filters, player, overview, {playerIds: watchlist.current});
    }, [filters])

    const sortPlayers = useCallback((playerA: PlayerOverview, playerB: PlayerOverview) => {
        return SortPlayerListPlayers(filters, playerA, playerB);
    }, [filters.statFilter, filters.isPer90]);


    return (
        <PlayerList draftData={draftData} playerListData={playerListData} addToWatchlist={addToWatchlist} removeFromWatchlist={removeFromWatchlist}/>
    )
}

export default PlayerListContainer;

PlayerListContainer.displayName = 'PlayerListContainer';
