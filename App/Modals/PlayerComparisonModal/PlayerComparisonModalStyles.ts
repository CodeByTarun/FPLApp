import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { cornerRadius, defaultFont, largeFont, mediumFont, semiBoldFont } from "../../Global/GlobalConstants";

export const PlayerComparisonModalStyles = (theme: Theme) => StyleSheet.create({
    
    container: {
        width: '100%',
        height: '100%',
        paddingTop: moderateVerticalScale(10),
        paddingBottom: moderateVerticalScale(10),
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(5),
    },

    titleText: {
        fontSize: largeFont * 1.2,
        color: theme.colors.text, 
        fontFamily: semiBoldFont,
        textAlign: 'center',
        paddingBottom: moderateVerticalScale(15),
        paddingTop: moderateVerticalScale(10)
    },

    text: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.9,
        fontFamily: defaultFont,
    },

    controlsOuterContainers: {
        marginBottom: moderateVerticalScale(15),
        marginTop: moderateVerticalScale(10),
        height: moderateVerticalScale(35, 0.2),
        width: '100%',
    },

    controlContainer: {
        width: '60%',
        height: '100%',
        aspectRatio: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: cornerRadius,
    },

    switch: {
        width: '33.3333%',
        height: '100%',
        backgroundColor: theme.colors.card,
        position: 'absolute',
        zIndex: 1,
        borderRadius: cornerRadius,
        transform: [
            { scale: 1.03 }
        ]
    },

    controlButtons: {
        flex: 1,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 100,
    },

    controlText: {
        textAlign: 'center',
        color: theme.colors.notification,
        fontSize: mediumFont * 0.9,
        fontFamily: semiBoldFont,
    },

    editButtonContainer: {
        position: 'absolute',
        left: 0,
        top: '15%',
        height: '80%',
        width: moderateScale(25),
        justifyContent: 'center',
    },

    filterButtonContainer: {
        position: 'absolute', 
        right: 0, 
        top: '10%', 
        height: '80%', 
        width: moderateScale(25),
        marginTop: moderateVerticalScale(3),
    },

    button: {
        width: moderateScale(100, 0.4),
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginBottom: moderateVerticalScale(5),
        marginTop: moderateVerticalScale(10),
        padding: moderateScale(10, 0.2),
        alignSelf: 'center'
    },

    buttonText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        fontFamily: defaultFont,
    },

    searchBox: {
        flex: 1,
        alignSelf: 'center',
        color: theme.colors.text,
    },
});