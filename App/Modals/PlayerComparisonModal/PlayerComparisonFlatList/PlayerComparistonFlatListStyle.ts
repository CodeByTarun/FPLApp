import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { defaultFont, mediumFont } from "../../../Global/GlobalConstants";

export const PlayerComparisonFlatListStyle = (theme: Theme) => StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'row'
    },

    dataContainer: {
        flex: 1,
        overflow: 'hidden'
    },

    viewContainer: {
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
    },

    scrollContainer: {
        flexDirection: 'row',
    },

    scrollView: {
        backgroundColor: 'gray',
        flex: 1,
    },

    flatList: {
        height: '100%',
        width: '100%',
    },

    headerView: {
        flexDirection: 'row',
    },

    headerText: {
        color: theme.colors.text,
        padding: moderateScale(5, 0.3),
        fontSize: mediumFont,
        fontFamily: defaultFont,
    },

    playerHeadersContainer: {
        flex: 1,
        borderTopColor: theme.colors.notification,
        borderTopWidth: 1,

    },

    playerHeaderText: {
        color: theme.colors.text,
        padding: moderateScale(3, 0.3),
        fontSize: mediumFont,
        fontFamily: defaultFont,
    }

});
