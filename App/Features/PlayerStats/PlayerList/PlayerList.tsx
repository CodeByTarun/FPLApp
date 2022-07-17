import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View, Text } from "react-native";
import { RootStackParams } from "../../../../App";
import { height } from "../../../Global/GlobalConstants";
import { FilterPlayerListPlayers, GetOwnedPlayersManagerShortInitials, GetStatValue, SortPlayerListPlayers } from "../../../Helpers/FplAPIHelpers";
import { addPlayerToWatchList, getPlayersWatchlist, PlayersWatchlist, removePlayerFromWatchlist } from "../../../Helpers/FplDataStorageService";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { useGetDraftLeagueInfoQuery, useGetDraftLeaguePlayerStatusesQuery, useGetDraftOverviewQuery, useGetDraftUserInfoQuery } from "../../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../Store/modalSlice";
import { TeamTypes } from "../../../Store/teamSlice";
import { CustomButton, LoadingIndicator } from "../../Controls";
import { PlayerTableFilterState } from "../PlayerTable/PlayerTableFilterReducer";
import FixtureDifficultyList from "./FixtureDifficultyList";
import PlayerListInfo from "./PlayerListInfo/PlayerListInfo";
import { styles } from "./PlayerListStyles";

interface PlayerListProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    filters: PlayerTableFilterState;
}

const PlayerList = React.memo(({overview, fixtures, filters}: PlayerListProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);
    const [watchlist, setWatchlist] = useState({playerIds: []} as PlayersWatchlist | undefined);

    const teamInfo = useAppSelector(state => state.team);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const dispatch = useAppDispatch();

    const [isListDoneFiltering, setIsListDoneFiltering] = useState(true);
    const [isDraftTeam, setIsDraftTeam] = useState(null as number | null);
    
    useEffect(() => {
        if (teamInfo.teamType === TeamTypes.Draft) {
            setIsDraftTeam(teamInfo.info.id);
        } else {
            setIsDraftTeam(null);
        }
    }, [teamInfo.teamType]);

    //#region Draft League info to add if in draft league 
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
        setIsListDoneFiltering(false);

        setPlayerList(overview.elements.filter(filterPlayers)
                                       .sort(sortPlayers))
    }

    useEffect(() => {
        setIsListDoneFiltering(true);
    }, [playerList])

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

    const renderPlayerItem = useCallback(({item}: {item: PlayerOverview}) => {

        const pressPlayerFn = () => {
            dispatch(changePlayerOverviewInfo(item));
            navigation.navigate('PlayerDetailedStatsModal');
        }

        let isInWatchList = watchlist?.playerIds.includes(item.id);

        return (
        <Pressable key={item.id} style={styles.tableView} onPress={pressPlayerFn}>
            <View testID="watchlistButtonContainer" style={{flex: 0.60, justifyContent: 'center', opacity: isInWatchList ? 1 : 0.5}}>
                <CustomButton image={isInWatchList ? "favourite" : "unfavourite"} buttonFunction={isInWatchList ? () => removeFromWatchlist(item.id) : () => addToWatchlist(item.id)}/>
            </View>
            <View style={{ flex: 3, height: height * 0.05 }}>
                <PlayerListInfo overview={overview} player={item} owner={(teamInfo.teamType === TeamTypes.Draft) ? 
                                                                        GetOwnedPlayersManagerShortInitials(item.id, overview, draftOverview.data, draftLeagueRosters.data, draftLeagueInfo.data) : 
                                                                        null}/>
            </View>

            <View style={{ flex: 3 }}>
                <FixtureDifficultyList team={item.team} isFullList={false} fixtures={fixtures} overview={overview} liveGameweek={teamInfo.liveGameweek} />
            </View>

            <View style={[styles.tableNumberView, { flex: 1 }]}>
                <Text style={styles.tableText}>{getStatValue(item)}</Text>
            </View>
        </Pressable>)
    }, [filters, watchlist, draftOverview.isSuccess, draftLeagueRosters.isSuccess, draftUserInfo.isSuccess, draftLeagueInfo.isSuccess, isDraftTeam])

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);
    //#endregion
    
    return(
        <>
        {((teamInfo.teamType !== TeamTypes.Draft) || (draftUserInfo.data && draftLeagueInfo.data && draftLeagueRosters.data)) && isListDoneFiltering ?
        <FlatList
            data={playerList}
            renderItem={renderPlayerItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews={true}
            initialNumToRender={15}
            maxToRenderPerBatch={40}/> :
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{height: '20%', width: '20%', alignSelf: 'center'}}>
                    <LoadingIndicator/>
                </View>
            </View>
        }
        </>
    )
});

export default PlayerList;
