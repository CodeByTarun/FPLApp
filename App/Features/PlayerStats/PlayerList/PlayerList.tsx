import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View, Text } from "react-native";
import { RootStackParams } from "../../../../App";
import { FilterPlayerListPlayers, GetOwnedPlayersManagerShortInitials, GetStatValue, SortPlayerListPlayers } from "../../../Helpers/FplAPIHelpers";
import { getPlayersWatchlist, PlayersWatchlist } from "../../../Helpers/FplDataStorageService";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { useGetDraftLeagueInfoQuery, useGetDraftLeaguePlayerStatusesQuery, useGetDraftOverviewQuery, useGetDraftUserInfoQuery } from "../../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { changePlayerOverviewInfo } from "../../../Store/modalSlice";
import { TeamTypes } from "../../../Store/teamSlice";
import { CustomButton, LoadingIndicator } from "../../Controls";
import { PlayerTableFilterState } from "../PlayerTable/PlayerTableFilterReducer";
import FixtureDifficultyList from "./FixtureDifficultyList";
import PlayerItem from "./PlayerItem";
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

    //#endregion

    //#region Filter Effects
    useEffect(function FilterPlayerList() {   
        filteringPlayerList(); 
    }, [filters.teamFilter, filters.positionFilter, filters.statFilter, filters.isPer90, filters.isInWatchlist]);

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

        async function getWatchlist() {
            setWatchlist(await getPlayersWatchlist());
        }
        getWatchlist();

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

    console.log('hi');

    const renderPlayerItem = useCallback(({item}: {item: PlayerOverview}) => {

        return <PlayerItem player={item} fixtures={fixtures} overview={overview} teamInfo={teamInfo} 
                           draftOverview={draftOverview.data} draftLeagueRosters={draftLeagueRosters.data} draftLeagueInfo={draftLeagueInfo.data} 
                           watchList={watchlist} navigation={navigation} isPer90={filters.isPer90} statFilter={filters.statFilter}/>

    }, [filters.isPer90, filters.statFilter, draftOverview.isSuccess, draftLeagueRosters.isSuccess, draftUserInfo.isSuccess, draftLeagueInfo.isSuccess, isDraftTeam, watchlist]);

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);
    //#endregion
    
    return(
        <>
        {((teamInfo.teamType !== TeamTypes.Draft) || (draftUserInfo.data && draftLeagueInfo.data && draftLeagueRosters.data)) && isListDoneFiltering ?
        <FlatList
            data={playerList}
            renderItem={renderPlayerItem}
            keyExtractor={keyExtractor}
            initialNumToRender={15}
            maxToRenderPerBatch={30}/> :
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
