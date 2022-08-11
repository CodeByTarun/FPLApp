import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, tertiaryColor, textSecondaryColor, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create(
    {   
        topContainer: {
            flex: 4,
        },

        bottomContainer: {
            flex: 1,
            backgroundColor: '#629512',
            borderTopWidth: 1.5,
            borderTopColor: 'white'
        },

        fieldContainer: {
            width: '100%',
            height: '100%',
            backgroundColor: '#629512',
            position: 'absolute',
        },

        field: {
            height: heightPercentageToDP('65%'),
            alignSelf: 'center',
            position: "absolute"
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
            height: heightPercentageToDP('11%'), 
            aspectRatio: 1, 
            right: 0, 
            zIndex: 0
        },

        additionalInfoCardContainer: {
            position: 'absolute', 
            left: 7, 
            height: heightPercentageToDP('6%'), 
            aspectRatio: 1.3
        },

        gameweekText: {
            position: 'absolute',
            top: 0,
        },

        unstartedFixtureView: {
            backgroundColor: primaryColor, 
            alignSelf: 'center', 
            justifyContent: 'center', 
            position: 'absolute', 
            bottom: 0, 
            width: widthPercentageToDP('60%'),
            height: '70%',
            alignContent: 'center'
        },
        
        unstartedFixtureViewText: {
            color: textPrimaryColor, 
            fontSize: mediumFont * 1.1,
            fontWeight: '500', 
            alignSelf: 'center'
        },
    }
);