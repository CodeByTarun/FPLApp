import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Image, Text } from "react-native";
import { semiBoldFont } from "../../../../../Global/GlobalConstants";
import { Icons, Jerseys } from "../../../../../Global/Images";
import { FplOverview, PlayerOverview } from "../../../../../Models/FplOverview";
import { PlayerListInfoStyles } from "./PlayerListInfoStyles";

interface PlayerListInfoProps {
    overview: FplOverview,
    player: PlayerOverview,
    owner? : string | null | undefined,
}

const PlayerListInfo = React.memo(({overview, player, owner} : PlayerListInfoProps) => {

    const theme = useTheme();
    const styles = PlayerListInfoStyles(theme);

    return (
        <View testID="playerListInfo" style={{flex: 1, flexDirection: 'row'}}>
            <View style={{ flex: 1}}>
                <Image testID="jerseyPlayerListInfo" style={styles.image} source={Jerseys[player.team_code]} resizeMode="contain"/>

                { (player.status !== 'a') && 
                    <View testID="notAvailableIndicatorContainer" style={styles.imageContainer}>
                        <Image style={styles.image} source={(player.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                    </View>
                }

            </View>
            
            <View testID="playerListInfoDetailsContainer" style={styles.playerInfoContainer}> 
                <View style={{flexDirection: 'row'}}>
                    { owner && 
                        <Text testID="ownerText" style={styles.ownerText}>{owner}</Text>
                    }
                    <Text numberOfLines={1} style={[styles.tableText, {flex: 1}]}>{player.web_name}</Text>
                    
                </View>
                <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Text style={[styles.tableText, {fontFamily: semiBoldFont}]}>{overview.teams.find(team => team.code === player.team_code)?.short_name}  </Text>
                    <Text style={styles.tableText}>{overview.element_types.find(element => element.id === player.element_type)?.singular_name_short}  </Text>
                    <Text style={styles.tableText}>£{(player.now_cost / 10).toFixed(1)}</Text>
                </View>
            </View>
        </View>
    )
});

export default PlayerListInfo;

PlayerListInfo.displayName = 'PlayerListInfo';