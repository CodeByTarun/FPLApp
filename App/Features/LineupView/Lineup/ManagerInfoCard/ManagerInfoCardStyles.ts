import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { cornerRadius, height, largeFont, lightColor, primaryColor, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginRight: 15,
        borderBottomLeftRadius: cornerRadius,
        borderBottomRightRadius: cornerRadius,
        backgroundColor: primaryColor,
        alignSelf: 'center',
        zIndex: 1,
    },

    titleContainter: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: heightPercentageToDP('1%'),
    },

    middleTextContainter: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    categoryContainer: {
        alignSelf: 'center',
        paddingBottom: heightPercentageToDP('1%'),
        justifyContent: 'center',
    },

    statText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: largeFont,
    },

    rankText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600'
    },
    
    dotsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        paddingBottom: heightPercentageToDP('1.25%'),
    },

    text: {
        fontSize: smallFont,
        color: textSecondaryColor,
        fontWeight: '500',
        alignSelf: 'center'
    },

    activeIndex: {
        backgroundColor: textPrimaryColor,
    },

    inactiveIndex: {
        backgroundColor: lightColor,
    },
});