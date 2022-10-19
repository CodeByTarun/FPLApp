import { useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import globalStyles from "../../../../Global/GlobalStyles";
import { Jerseys } from "../../../../Global/Images";
import { FplOverview } from "../../../../Models/FplOverview";
import { KingOfTheGameweekViewStyles } from "./KingsOfTheGameweekViewStyles";

interface KingsOfTheGameweekViewProps {
    overviewData: FplOverview;
}

const KingsOfTheGameweekView = ({overviewData} : KingsOfTheGameweekViewProps) => {

    const theme = useTheme();
    const styles = KingOfTheGameweekViewStyles(theme);

    let kings = overviewData.events.filter(event => event.top_element_info !== null).reverse();

    return (
        <View style={[styles.kingsView, globalStyles.shadow]}>
            <ScrollView testID="kingScrollView" horizontal style={styles.kingsScrollView}>
                {
                    kings.map(king => 
                        
                        <View key={king.id} style={styles.kingsCardView} testID='kingPlayerButton'>
                            <View style={{flex: 1}}>
                                <View style={{width: '100%', height: '100%'}}>
                                    <Image style={styles.jersey} source={Jerseys[overviewData.elements.find(element => element.id === king.top_element_info!.id)!.team_code]} resizeMode="contain"/>
                                </View>
                            </View>

                            <View style={[styles.textContainer]}>
                                <View style={styles.kingsTextContainer}>
                                    <Text numberOfLines={1} style={styles.kingsText}>{overviewData.elements.find(element => element.id === king.top_element_info!.id)?.web_name}</Text>    
                                </View>
                                <View testID="separator" style={{borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.notification, opacity: 0.2, marginLeft: 5, marginRight: 5 }}/>
                                <View style={styles.gameweekAndScoreContainer}>
                                    <Text style={styles.gameweekAndScoreText}>GW {king.id} | {king.top_element_info!.points}</Text> 
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