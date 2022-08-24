import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { largeFont, mediumFont } from "../../Global/GlobalConstants";

export const PlayerDetailedStatsModalStyles = (theme: Theme) => StyleSheet.create({

    container: {
        padding: moderateScale(5),
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },

    header: {

    },

    headerRow: {
        flexDirection: 'row',
    },

    controlsContainer: {
        height: moderateVerticalScale(40),
        flexDirection: 'row',
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(5),
    },

    playerComparisonButtonContainer: {
        width: moderateScale(30),
        height: '70%',
        alignSelf: 'center'
    },

    filterButtonContainer: {
        width: moderateScale(30),
        height: '75%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(3)
    },

    statHistoryToggle: {
        height: '75%',
        width: moderateScale(125, 0.4),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', 
        borderRadius: 10,
        marginTop: moderateVerticalScale(5),
        marginBottom: moderateVerticalScale(5),
        backgroundColor: theme.colors.background
    },

    titleText: {
        fontSize: largeFont * 1.3,
        color: theme.colors.text,
        fontWeight: 'bold',
    }, 

    viewToggleStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        height: '100%',
        zIndex: 2,
        elevation: 100,
    },

    viewToggleIndiciator: {
        height: '100%',
        width: '50%',
        position: 'absolute',
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        zIndex: 1,
    },

    text: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
    },

    headerText: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
        alignSelf: 'center',
    },
    //#endregion
})