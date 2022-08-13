import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container:{ 
        width: moderateScale(225, 0.3), 
        height: moderateVerticalScale(80, 0.8), 
        backgroundColor: primaryColor, 
        alignSelf: 'flex-end', 
        marginBottom: -1,
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: aLittleLighterColor,
        paddingBottom: moderateVerticalScale(5),
        paddingTop: moderateVerticalScale(2),
    },

    bonusPointsText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: moderateScale(8, 0.4),
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
        fontSize: mediumFont * 1.1,
        fontWeight: 'bold',
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(4),
        backgroundColor: primaryColor
    },
});