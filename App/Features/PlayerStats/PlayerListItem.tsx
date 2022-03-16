import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { OverviewStats } from "../../Global/EnumsAndDicts";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Jerseys } from "../../Global/Images";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch } from "../../Store/hooks";
import { openPlayerDetailedStatsModal } from "../../Store/modalSlice";
import FixtureDifficultyList from "./FixtureDifficultyList";

interface PlayerListItemProps {
    player: PlayerOverview;
    overview: FplOverview;
    fixtures: FplFixture[];
    statFilter: string;
}

const PlayerListItem = React.memo((props: PlayerListItemProps) => {

    const dispatch = useAppDispatch();
    const currentGameweek = props.overview.events.filter((event) => { return event.is_current === true; })[0].id;

    return (
        <Pressable key={props.player.id} style={styles.tableView} onPress={() => dispatch(openPlayerDetailedStatsModal(props.player))}>
            <View style={{flex: 3, flexDirection: 'row', height: GlobalConstants.height* 0.05}}>
                <View style={{ flex: 1}}>
                    <Image style={styles.jersey} source={Jerseys[props.player.team_code]} resizeMode="contain"/>
                </View>
                
                <View style={{flex: 3}}> 
                    <Text style={styles.tableText}>{props.player.web_name}</Text>
                    <View style={{flexDirection: 'row', marginTop: 2}}>
                        <Text style={[styles.tableText, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === props.player.team_code)?.short_name}  </Text>
                        <Text style={styles.tableText}>{props.overview.element_types.find(element => element.id === props.player.element_type)?.singular_name_short}</Text>
                    </View>
                </View>
            </View>

            <View style={{flex: 3}}>
                <FixtureDifficultyList team={props.player.team} isFullList={false} currentGameweek={currentGameweek} fixtures={props.fixtures} overview={props.overview}/>
            </View>

            <View style={[styles.tableNumberView, {flex: 1}]}>
                <Text style={styles.tableText}>
                    {  (props.statFilter !== 'Cost') ? 
                        
                        props.player[Object.keys(OverviewStats).find(key => OverviewStats[key] === props.statFilter) as keyof PlayerOverview] :

                        (props.player[Object.keys(OverviewStats).find(key => OverviewStats[key] === props.statFilter) as keyof PlayerOverview] as number / 10).toFixed(1)
                    }
                </Text>
            </View>
        </Pressable>
    )

})

export default PlayerListItem;

const styles = StyleSheet.create({

    tableView: {
        backgroundColor: GlobalConstants.secondaryColor,
        borderBottomWidth: 1,
        borderBottomColor: GlobalConstants.lightColor,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
    },

    jersey: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },

});