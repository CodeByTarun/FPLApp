import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { primaryColor, textPrimaryColor, width, smallFont, cornerRadius, height, secondaryColor, largeFont, mediumFont } from "../../Global/GlobalConstants";

export const LineupViewStyles = (theme: Theme) => StyleSheet.create({

    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: theme.colors.primary
    },

    top: {
        width: '100%',
        height: moderateVerticalScale(50, 0.4),
        backgroundColor: theme.colors.primary,
        zIndex: 1,
    },  

    middle: {
        flex: 1,
        width : '100%',
    },

    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
        paddingBottom: moderateVerticalScale(5, 0.4),
        backgroundColor: theme.colors.primary,
    },

    lineupHeaderContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    teamSwitchContainer: {
        alignSelf: 'center', 
        justifyContent: 'center',
        height: '80%', 
        aspectRatio: 4.5,
    },

    text: {
        alignSelf: 'center',
        color: theme.colors.text,
        fontSize: mediumFont*1.3,
        fontWeight: 'bold'
    },

    button: {
        position: 'absolute',
        top: '33%',
        padding: moderateVerticalScale(5),
        backgroundColor: theme.colors.background, 
        borderRadius: cornerRadius, 
        width: moderateScale(width * 0.6), alignSelf: 'center'
    },

    buttonText: {
        color: theme.colors.text,
        fontWeight: '500',
        fontSize: mediumFont * 1.1,
        alignSelf: 'center'
    },
});