import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { secondaryColor } from "../../../../Global/GlobalConstants";
import globalStyles from "../../../../Global/GlobalStyles";
import { Jerseys } from "../../../../Global/Images";
import { FplOverview } from "../../../../Models/FplOverview";
import { styles } from "./KingsOfTheGameweekViewStyles";

interface KingsOfTheGameweekViewProps {
    overviewData: FplOverview;
}

const KingsOfTheGameweekView = ({overviewData} : KingsOfTheGameweekViewProps) => {

    let kings = overviewData.events.filter(event => event.top_element_info !== null).reverse();

    return (
        <View style={[styles.kingsView, globalStyles.shadow]}>
            <ScrollView testID="kingScrollView" horizontal style={styles.kingsScrollView}>
                {
                    kings.map(king => 
                        
                        <View key={king.id} style={styles.kingsCardView} testID='kingPlayerButton'>
                            <View style={{flex: 8}}>
                                <Image style={styles.jersey} source={Jerseys[overviewData.elements.find(element => element.id === king.top_element_info!.id)!.team_code]} resizeMode="contain"/>
                            </View>
                            <View style={styles.textContainer}>
                                <Text numberOfLines={1} style={styles.kingsText}>{overviewData.elements.find(element => element.id === king.top_element_info!.id)?.web_name}</Text>    
                                <View style={styles.gameweekAndScoreContainer}>
                                    <Text style={styles.gameweekText}>GW {king.id}</Text> 
                                    <Text style={styles.scoreText}>{king.top_element_info!.points}</Text>
                                </View>
                            </View>
                        </View>

                        )
                }
            </ScrollView>
        </View>
    )

}

export default KingsOfTheGameweekView;