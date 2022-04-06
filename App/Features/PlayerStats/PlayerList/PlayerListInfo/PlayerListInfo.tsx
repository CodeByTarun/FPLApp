import React from "react";
import { View, Image, Text } from "react-native";
import { Icons, Jerseys } from "../../../../Global/Images";
import { FplOverview, PlayerOverview } from "../../../../Models/FplOverview";
import { styles } from "./PlayerListInfoStyles";

interface PlayerListInfoProps {
    overview: FplOverview,
    player: PlayerOverview,
}

const PlayerListInfo = React.memo(({overview, player} : PlayerListInfoProps) => {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1}}>
                <Image style={styles.image} source={Jerseys[player.team_code]} resizeMode="contain"/>

                { (player.status !== 'a') && 
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={(player.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                    </View>
                }

            </View>
            
            <View style={{flex: 3, justifyContent: 'center'}}> 
                <Text numberOfLines={1} style={styles.tableText}>{player.web_name}</Text>
                <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Text style={[styles.tableText, {fontWeight: 'bold'}]}>{overview.teams.find(team => team.code === player.team_code)?.short_name}  </Text>
                    <Text style={styles.tableText}>{overview.element_types.find(element => element.id === player.element_type)?.singular_name_short}  </Text>
                    <Text style={styles.tableText}>£{(player.now_cost / 10).toFixed(1)}</Text>
                </View>
            </View>
        </View>
    )
});

export default PlayerListInfo;