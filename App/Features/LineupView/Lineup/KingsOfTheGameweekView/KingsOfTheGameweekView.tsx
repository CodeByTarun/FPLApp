import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Jerseys } from "../../../../Global/Images";
import { FplOverview } from "../../../../Models/FplOverview";
import { styles } from "./KingsOfTheGameweekViewStyles";

interface KingsOfTheGameweekViewProps {
    overviewData: FplOverview;
}

const KingsOfTheGameweekView = ({overviewData} : KingsOfTheGameweekViewProps) => {

    let kings = overviewData.events.filter(event => event.top_element_info !== null).reverse();

    return (
        <View style={styles.kingsView}>
            <ScrollView horizontal style={styles.kingsScrollView}>
                {
                    kings.map(king => 
                        
                        <View key={king.id} style={styles.kingsCardView}>
                            <Text style={styles.kingsText}>Gameweek {king.id}</Text>
                            <View style={{flex: 8}}>
                                <Image style={styles.jersey} source={Jerseys[overviewData.elements.find(element => element.id === king.top_element_info!.id)!.team_code]} resizeMode="contain"/>
                                <View style={styles.scoreContainer}>
                                    <Text style={styles.scoreText}>{king.top_element_info!.points}</Text>
                                </View> 
                            </View>
                            <Text style={styles.kingsText}>{overviewData.elements.find(element => element.id === king.top_element_info!.id)?.web_name}</Text>                    
                        </View>

                        )
                }
            </ScrollView>
        </View>
    )

}

export default KingsOfTheGameweekView;