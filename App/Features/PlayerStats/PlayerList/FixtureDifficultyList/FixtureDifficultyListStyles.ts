import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { width, smallFont, textPrimaryColor, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
        width: width* 0.132
    },

    text: {
        fontSize: mediumFont * 0.75,
        color: textPrimaryColor,
        textAlign: 'center', 
    },

    fixtureDifficultyIndicator: {
        marginTop: heightPercentageToDP('0.6%'),
        width: '110%', 
        borderBottomWidth: 2, 
        bottom: 0
    }

})
