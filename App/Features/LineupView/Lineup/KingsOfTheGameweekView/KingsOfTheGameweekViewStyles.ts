import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { defaultFont, smallFont } from "../../../../Global/GlobalConstants";

export const KingOfTheGameweekViewStyles = (theme: Theme) => StyleSheet.create({
    kingsView: {
        flex: 1,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(7),
        width: moderateScale(280, 0.9),
        paddingLeft: moderateScale(2),
        backgroundColor: theme.colors.primary,           
    },

    kingsScrollView: {
        flex: 1,
    },

    kingsCardView: {
        width: scale(65),
        paddingRight: moderateScale(5),
        paddingTop: moderateVerticalScale(5),
        paddingBottom: moderateVerticalScale(5),
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    jersey: {
        position: 'absolute',
        alignSelf: 'center',
        height: '90%',
        width: '70%',
    },

    textContainer: {
        backgroundColor: theme.dark ? theme.colors.card : theme.colors.background,
        width: '90%',
        height: verticalScale(25), 
    },
    
    gameweekAndScoreContainer: {
        flexDirection: 'row', 
        backgroundColor: theme.colors.background,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: moderateScale(2),
        paddingRight: moderateScale(2),
        flex: 1,
    },

    kingsTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    kingsText: {
        color: theme.colors.text,
        fontSize: smallFont,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: defaultFont,
    },

    gameweekAndScoreText: {
        color: theme.colors.text,
        fontSize: smallFont,
        flex: 2,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: defaultFont,
    },

});
