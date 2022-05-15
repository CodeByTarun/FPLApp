import React, { useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Seperator } from "../../../Global/GlobalComponents";
import { textPrimaryColor, largeFont, textSecondaryColor, aLittleLighterColor, smallFont } from "../../../Global/GlobalConstants";
import { FplDraftLeagueInfo, LeagueEntry, Standing } from "../../../Models/FplDraftLeagueInfo";
import { useAppDispatch } from "../../../Store/hooks";
import { changeToDraftTeam } from "../../../Store/teamSlice";
import { AnimatedButton } from "../../Controls";
import StandingsHeader from "../StandingsHeader";
import { styles } from "../StandingsStyles";

interface DraftLeagueStandingsProps {
    draftLeagueInfo: FplDraftLeagueInfo;
    setModalVisibility: (value: React.SetStateAction<boolean>) => void;
}

const DraftLeague = ({ draftLeagueInfo, setModalVisibility } : DraftLeagueStandingsProps) => {

    const dispatch = useAppDispatch();

    const openDraftTeamFromStandings = useCallback((leagueEntry: LeagueEntry | undefined) => {
        if (leagueEntry) {
            dispatch(changeToDraftTeam({id: leagueEntry.entry_id, name: leagueEntry.entry_name, isDraftTeam: true, isFavourite: false}));
            setModalVisibility(false);
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
    <>  
        <Text style={styles.titleText} numberOfLines={1}>{draftLeagueInfo.league.name}</Text>
        <FlatList data={draftLeagueInfo.standings}
                  stickyHeaderIndices={[0]}
                  ItemSeparatorComponent={ Seperator }
                  keyExtractor={item => item.league_entry.toString()}
                  ListHeaderComponent={ StandingsHeader }
                  renderItem={renderLeagueEntryItem}
                  testID='draftLeagueStandingsList'/>
    </>
    )
}

export default DraftLeague;