import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { defaultFont, semiBoldFont, smallFont, textSecondaryColor } from "../../../Global/GlobalConstants";

export const FixtureDifficultyDisplayStyles = (theme: Theme) => StyleSheet.create({

    container: {
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        paddingBottom: moderateVerticalScale(2),
    },

    fixtureDifficultyText: {
        fontSize: moderateScale(7.5, 0.4), 
        alignSelf: 'center',
        flex: 1,
        textAlign:'center',
        color: theme.colors.notification, 
        fontFamily: semiBoldFont,
    },

    fixtureDifficultyContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection:'row', 
        marginTop: -1,
        maxHeight: '20%',
    },

    fixtureViewText: {
        fontSize: moderateScale(7.5, 0.4), 
        color: 'black', 
        alignSelf: 'center',
        flex: 1,
        textAlign:'center',
        fontFamily: defaultFont,
    },
});
