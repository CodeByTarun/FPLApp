import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { smallFont, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

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
        color: textSecondaryColor, 
        fontWeight: '600'
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
        fontWeight: '400', 
        alignSelf: 'center',
        flex: 1,
        textAlign:'center'
    },
});
