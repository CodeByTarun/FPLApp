import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { primaryColor, textPrimaryColor, width, smallFont, cornerRadius, height, secondaryColor, largeFont, mediumFont } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: primaryColor
    },

    top: {
        width: '100%',
        height: heightPercentageToDP('7%'),
        backgroundColor: primaryColor,
        zIndex: 1,
    },  

    middle: {
        flex: 1,
        width : '100%',
    },

    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
        paddingBottom: heightPercentageToDP('1%'),
        backgroundColor: primaryColor,
    },

    lineupHeaderContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    teamSwitchContainer: {
        alignSelf: 'center', 
        justifyContent: 'center',
        height: '80%', 
        aspectRatio: 4.5,
    },

    text: {
        alignSelf: 'center',
        color: textPrimaryColor,
        fontSize: mediumFont*1.3,
        fontWeight: 'bold'
    },

    button: {
        position: 'absolute',
        top: '33%',
        padding: heightPercentageToDP('20%'),
        backgroundColor: secondaryColor, 
        borderRadius: cornerRadius, 
        width: widthPercentageToDP('60%'), alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontWeight: '500',
        fontSize: mediumFont * 1.1,
        alignSelf: 'center'
    },
});