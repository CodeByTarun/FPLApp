import { Theme, ThemeProvider } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { BOTTOM_BAR_HEIGHT, defaultFont, FIXTURES_VIEW_CONTROLS_HEIGHT, height, mediumFont, semiBoldFont, width } from "../../Global/GlobalConstants";

export const FixturesViewStyles = (theme: Theme) => StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        zIndex: 1,
    },

    topBar: {
        height: FIXTURES_VIEW_CONTROLS_HEIGHT + 10,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: theme.colors.primary        
    },

    middle: {
        flex: 1,
    },

    bottomBar: {
        height: BOTTOM_BAR_HEIGHT,
        width: '100%',
        elevation: 0.1,
        shadowColor: 'black',
        backgroundColor: theme.colors.primary
    },

    tabBarWidth: {
        width: moderateScale(width * 0.5, -0.2),
        height: '100%',
        alignSelf: 'center',
        flexDirection: 'row'

    },

    tabButtonContainer: {
        flex: 1,
        marginBottom: moderateVerticalScale(5),
        marginTop: moderateVerticalScale(5),
    },

    buttonContainer: {
        height: '100%', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    gameweekText: {
        color: theme.colors.text, 
        alignSelf: 'center', 
        fontSize: mediumFont*1.3,
        fontFamily: semiBoldFont,
    },

    text: {
        alignSelf: 'center', 
        color: theme.colors.text, 
        fontFamily: defaultFont, 
        fontSize: mediumFont * 1.15
    },

    shadow: (Platform.OS === 'ios') ? {
        shadowOffset: {
            width: 0,
            height: -(moderateVerticalScale(1)),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateVerticalScale(1, 0.3),
    } : {
        elevation: 5,
        borderTopWidth: 1.5,
        borderTopColor: 'rgba(10, 10, 10, 0.1)',
    },

    scrollView:  {
        flex: 1,
    },

    noFixturesView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },

    noFixturesText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: mediumFont * 1.1, 
        width: '100%',
    },

    gameweekDropDownSymbol: {
        color: theme.colors.text, 
        fontSize: mediumFont * 0.65, 
        transform: [{rotate: '-45deg'}], 
        alignSelf: 'center',
        marginBottom: moderateVerticalScale(4),
        fontFamily: semiBoldFont,
    },

    gameweekButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    closeText: {
        marginRight: moderateScale(5),
    },

});