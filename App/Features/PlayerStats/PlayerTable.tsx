// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";
import { OverviewStats } from "../../Global/EnumsAndDicts"
import { Jerseys } from "../../Global/Images";
import PlayerListItem from "./PlayerListItem";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";

interface PlayerTableProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    playerSearchText: string;
}

const PlayerTable = (props: PlayerTableProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);
    const [teamFilter, setTeamFilter] = useState('Team');
    const [positionFilter, setPositionFilter] = useState('Position');
    const [statFilter, setStatFilter] = useState('Total Points');

    useEffect(function FilterPlayerList() {

        let stat = Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview;
        
        setPlayerList(
            props.overview.elements.slice().filter(player => player.web_name.includes(props.playerSearchText) && 
                                                             (teamFilter === 'Team' || player.team_code === props.overview.teams.find(team => team.name === teamFilter)?.code) &&
                                                             (positionFilter === 'Position' || player.element_type === props.overview.element_types.find(element => element.plural_name === positionFilter)?.id))
                                           .sort((playerA, playerB) => (playerB[stat] as number) - (playerA[stat] as number))
        );
    }, [props.playerSearchText, teamFilter, positionFilter, statFilter])

    return (
        <View style={{ flex: 1, overflow: "hidden" }}>
            <View style={[globalStyles.bottomShadow, { flex: 1 , flexDirection: 'row', zIndex: 1, backgroundColor: GlobalConstants.primaryColor }]}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5, flexDirection:'row' }}>
                    <Dropdown defaultValue="Team" 
                              options={Array.from(props.overview.teams.map(team => team.name))} 
                              value={teamFilter} 
                              setValue={setTeamFilter}/>
                    <Dropdown defaultValue="Position" 
                              options={Array.from(props.overview.element_types.map(type => type.plural_name))} 
                              value={positionFilter} 
                              setValue={setPositionFilter}/>
                    <Dropdown defaultValue="Total Points" 
                              options={Object.values(OverviewStats).sort()} 
                              value={statFilter} 
                              setValue={setStatFilter}/>
                </View>
            </View>
            <View style={{ flex: 11 }}>
                <FlatList
                    data={playerList}
                    renderItem={ ({item}) => <PlayerListItem overview={props.overview} fixtures={props.fixtures} player={item} statFilter={statFilter}/>
                    }
                    keyExtractor={item => item.id.toString()}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={50}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    //#region player table


    //#endregion
})

export default PlayerTable;
