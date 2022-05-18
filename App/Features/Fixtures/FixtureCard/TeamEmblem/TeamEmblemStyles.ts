import { StyleSheet } from "react-native";
import { width, textPrimaryColor, smallFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    teamInfoView: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 4,
    },

    emblems: {
        alignSelf: 'center',
        height: '60%'
    },

    text: {
        fontSize: smallFont, 
        alignSelf: 'center', 
        color: textPrimaryColor, 
        paddingTop: 4, 
    }
});