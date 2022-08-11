import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { width, textPrimaryColor, smallFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    teamInfoView: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: heightPercentageToDP('0.5%'),
    },

    emblems: {
        alignSelf: 'center',
        height: '60%'
    },

    text: {
        fontSize: smallFont, 
        alignSelf: 'center', 
        color: textPrimaryColor, 
        paddingTop: heightPercentageToDP('0.5%'), 
    }
});