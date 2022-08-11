import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { aLittleDarkerColor, aLittleLighterColor, lightColor, smallFont, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    tabContainer: {
        flex: 1,
        marginBottom: heightPercentageToDP('1%'),
        marginTop: heightPercentageToDP('1%'),
    },

    imageContainer: {
        flex: 1,
        paddingTop: heightPercentageToDP('0.4%'),
        paddingBottom: heightPercentageToDP('0.4%'),
        paddingLeft: heightPercentageToDP('0.4%'),
        paddingRight: heightPercentageToDP('0.4%'),
    },

    image: {
        height: '95%',
        width: '100%',
    },

    headerText: {
        fontSize: smallFont* 1.1,
        alignSelf: 'center',
        color: lightColor,
    },
});