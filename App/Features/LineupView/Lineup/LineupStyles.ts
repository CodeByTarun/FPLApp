import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { mediumFont, height, darkFieldColor, fieldColor, defaultFont } from "../../../Global/GlobalConstants";

export const LineupStyles = (theme: Theme) => StyleSheet.create(
    {   
        topContainer: {
            flex: 4,
        },

        bottomContainer: {
            flex: 1,
            backgroundColor: theme.dark ? darkFieldColor : fieldColor,
            borderTopWidth: 1.5,
            borderTopColor: theme.dark ? '#8c8c8c' : 'white',
        },

        fieldContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.dark ? darkFieldColor : fieldColor,
            position: 'absolute',
        },

        field: {
            height: moderateVerticalScale(height * 0.52, 0.22),
            alignSelf: 'center',
            position: "absolute",
            bottom: 0
        },

        playerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },

        playerRowContainer: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },

        managerInfoCardContainer: {
            position: 'absolute', 
            height: moderateVerticalScale(70), 
            aspectRatio: 1, 
            right: 0, 
            zIndex: 0
        },

        additionalInfoCardContainer: {
            position: 'absolute', 
            left: 7, 
            height: moderateVerticalScale(37), 
            aspectRatio: 1.3
        },

        gameweekText: {
            position: 'absolute',
            top: 0,
            fontFamily: defaultFont,
        },

        unstartedFixtureView: {
            backgroundColor: theme.colors.primary, 
            alignSelf: 'center', 
            justifyContent: 'center', 
            position: 'absolute',  
            bottom: 0,
            width: moderateScale(225, 0.7),
            height: moderateScale(50, 0.4),
            alignContent: 'center'
        },
        
        unstartedFixtureViewText: {
            color: theme.colors.text, 
            fontSize: mediumFont * 1.1,
            alignSelf: 'center',
            fontFamily: defaultFont,
        },
    }
);