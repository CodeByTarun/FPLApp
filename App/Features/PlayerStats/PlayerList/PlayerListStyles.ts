import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { mediumFont, primaryColor, secondaryColor, textPrimaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    tableView: {
        backgroundColor: primaryColor,
        borderBottomWidth: 1,
        borderBottomColor: secondaryColor,
        flexDirection: 'row',
        paddingTop: heightPercentageToDP('1%'),
        paddingBottom: heightPercentageToDP('1%'),
        paddingLeft: widthPercentageToDP('0.5%'),
        width: '100%',
        height: heightPercentageToDP('6.25%')
    },

    watchListButtonContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        paddingTop: heightPercentageToDP('0.25%'),
        paddingBottom: heightPercentageToDP('0.25%'),
    },

    playerListInfoContainer: {
        width: widthPercentageToDP('33%'),
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: textPrimaryColor,
        fontSize: mediumFont,
    },
});

