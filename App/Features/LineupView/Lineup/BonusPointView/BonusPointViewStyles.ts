import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container:{ 
        width: widthPercentageToDP('60%'), 
        height: '95%', 
        backgroundColor: primaryColor, 
        alignSelf: 'flex-end', 
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: aLittleLighterColor,
        paddingBottom: heightPercentageToDP('0.5%'),
        paddingTop: heightPercentageToDP('0.5%'),
    },

    bonusPointsText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: smallFont,
        flex: 1,
    },

    titleContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',  

        backgroundColor: primaryColor
    },

    titleText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: mediumFont * 1.2,
        fontWeight: 'bold',
        paddingTop: heightPercentageToDP('1%'),
        paddingBottom: heightPercentageToDP('0.5%'),
        backgroundColor: primaryColor
    },
});