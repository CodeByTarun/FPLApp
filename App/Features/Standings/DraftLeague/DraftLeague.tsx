import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { RootStackParams } from "../../../../App";
import { Seperator } from "../../../Global/GlobalComponents";
import { FplDraftLeagueInfo, LeagueEntry, Standing } from "../../../Models/FplDraftLeagueInfo";
import { useAppDispatch } from "../../../Store/hooks";
import { changeToDraftTeam } from "../../../Store/teamSlice";
import { AnimatedButton } from "../../Controls";
import StandingsHeader from "../StandingsHeader";
import { styles } from "../StandingsStyles";

interface DraftLeagueStandingsProps {
    draftLeagueInfo: FplDraftLeagueInfo;
}

const DraftLeague = ({ draftLeagueInfo } : DraftLeagueStandingsProps) => {

    const dispatch = useAppDispatch();
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

    const openDraftTeamFromStandings = useCallback((leagueEntry: LeagueEntry | undefined) => {
        if (leagueEntry) {
            dispatch(changeToDraftTeam({id: leagueEntry.entry_id, name: leagueEntry.entry_name, isDraftTeam: true, isFavourite: false}));
            navigator.goBack();
        }
    }, [])

    const renderLeagueEntryItem = useCallback(({item}: {item: Standing}) => {

        let leagueEntry = draftLeagueInfo.league_entries.find(entry => entry.id === item.league_entry);

        return (
            <AnimatedButton buttonFn={() => openDraftTeamFromStandings(leagueEntry)}>
                <View style={styles.standingsButtonContainer}>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.rank}</Text>
                    <View style={{flex: 3, paddingLeft: 5}}>
                        <Text numberOfLines={1} style={styles.teamNameText}>{leagueEntry?.entry_name}</Text>
                        <Text numberOfLines={1} style={styles.managerNameText}>{leagueEntry?.player_first_name + " " + leagueEntry?.player_last_name}</Text>
                    </View>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.event_total}</Text>
                    <Text style={[styles.leagueText, {flex: 1}]}>{item.total}</Text> 
                </View>
            </AnimatedButton>
        )
    }, [])

    return (
    <View style={{height: '100%', width: '100%'}}>  
        <Text style={styles.titleText} numberOfLines={1}>{draftLeagueInfo.league.name}</Text>
        <FlatList data={draftLeagueInfo.standings}
                  stickyHeaderIndices={[0]}
                  ItemSeparatorComponent={ Seperator }
                  keyExtractor={item => item.league_entry.toString()}
                  ListHeaderComponent={ StandingsHeader }
                  renderItem={renderLeagueEntryItem}
                  testID='draftLeagueStandingsList'/>
    </View>
    )
}

export default DraftLeague;