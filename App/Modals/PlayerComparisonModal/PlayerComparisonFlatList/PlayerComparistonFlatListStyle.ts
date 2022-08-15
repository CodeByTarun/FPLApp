import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { height, mediumFont, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
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
        color: textPrimaryColor,
        padding: moderateScale(5, 0.3),
        fontSize: mediumFont,
    },

    playerHeadersContainer: {
        flex: 1,
        borderTopColor: textSecondaryColor,
        borderTopWidth: 1,

    },

    playerHeaderText: {
        color: textPrimaryColor,
        padding: moderateScale(3, 0.3),
        fontSize: mediumFont
    }

});
