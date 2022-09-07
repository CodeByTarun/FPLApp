import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { smallFont, mediumFont, largeFont, semiBoldFont, defaultFont } from "../../Global/GlobalConstants";


export const StandingsStyles = (theme: Theme) => StyleSheet.create({

    titleText:{
        textAlign: 'center', 
        color: theme.colors.text, 
        fontFamily: semiBoldFont,
        marginBottom: moderateVerticalScale(25), 
        marginTop: moderateVerticalScale(15), 
        fontSize: largeFont
    },

    leagueHeaderText: {
        color: theme.colors.text,
        fontSize: smallFont * 1.3,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: semiBoldFont,
    },

    leagueText: {
        color: theme.colors.text,
        fontSize: smallFont * 1.3,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: defaultFont,
    },

    standingsButtonContainer: {
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: moderateVerticalScale(10), 
        paddingBottom: moderateVerticalScale(10)
    },

    teamNameText: {
        textAlign: 'left', 
        flex: 1, 
        color: theme.colors.text,
        fontSize: smallFont * 1.4, 
        fontFamily: semiBoldFont,
    },

    managerNameText: {
        textAlign: 'left', 
        flex: 1, 
        color: theme.colors.notification, 
        fontSize: smallFont * 1.1,
        fontFamily: defaultFont,
    },

    backButtonText:{ 
        color: theme.colors.notification,
        fontSize: mediumFont,
        fontFamily: semiBoldFont,
        textAlign: 'center'
    },
    
    headerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        paddingBottom: moderateVerticalScale(7), 
        borderBottomColor: theme.colors.border, 
        borderBottomWidth: 1.5, 
        backgroundColor: theme.colors.primary,
    },
});
