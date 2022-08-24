import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

export const PLayerTableStyles = (theme: Theme) => StyleSheet.create({ 
    //#region player table
    topBarContainer: {
        width: '100%', 
        backgroundColor: theme.colors.primary,
        paddingTop: moderateVerticalScale(10),
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(5),
        paddingBottom: moderateVerticalScale(5),
        zIndex: 1,
    },

    firstRowTopBarContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: moderateScale(5)
    },

    closeButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(7, 0.3),
        marginLeft: moderateScale(5),
    },

    secondRowTopbarContainer: {
        paddingTop: moderateVerticalScale(5),
        height: moderateVerticalScale(40),
        flexDirection: 'row', 
        justifyContent: 'center', 
    },

    dropDownsContainer: {
        flex: 1, 
        flexDirection: 'row',
    },

    dropDownContainer: {
        flex: 1,
    },

    filterButtonContainer: {
        height: '100%',
        marginTop: moderateVerticalScale(-2),
        paddingLeft: moderateScale(5),
        width: moderateScale(45),
        alignSelf: 'center',
        justifyContent: 'center',
    },

    filter: {
        height: moderateVerticalScale(20),
        width: '85%',
        alignSelf: 'center',
        marginTop: moderateVerticalScale(2)       
    },

    //#endregion
});