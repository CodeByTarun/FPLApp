import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { mediumFont, cornerRadius, defaultFont } from "../../../../Global/GlobalConstants";

export const HistoryListStyles = (theme: Theme) => StyleSheet.create({

    container: {
        flex: 1, 
        paddingBottom: moderateVerticalScale(5),
        marginBottom: moderateVerticalScale(5), 
        backgroundColor: theme.colors.primary, 
        paddingLeft: moderateScale(5), 
        paddingRight: moderateScale(5),
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: cornerRadius,
    },

    tableTextContainer: {
        width: moderateScale(38, 0.4),
        flex: 1,
    },

    headerText: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.9,
        fontFamily: defaultFont,
        alignSelf: 'center',
    },

    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        width: '100%',
        borderBottomColor: theme.colors.border, 
        borderBottomWidth: 1,
        paddingBottom: moderateVerticalScale(8), 
        paddingTop: moderateVerticalScale(8),
        backgroundColor: theme.colors.primary
    },

    historyItemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: moderateVerticalScale(5), 
        paddingTop: moderateVerticalScale(5),
        borderBottomColor: theme.colors.border, 
        borderBottomWidth: 1,
    },

    footerContainer: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row', 
        borderTopColor: theme.colors.border, 
        borderTopWidth: 1, 
        paddingTop: moderateVerticalScale(5),
    }

});