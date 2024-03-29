import { Theme } from "@react-navigation/native";
import { Platform, StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { BOTTOM_BAR_HEIGHT, primaryColor, width } from "../../Global/GlobalConstants";

export const BottomTabsStyle = (theme: Theme) => StyleSheet.create({

    container: {
        height: BOTTOM_BAR_HEIGHT,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        elevation: 0.1,
        shadowColor: 'black',
        alignContent: 'center',
        justifyContent: 'center',
    },

    shadow: (Platform.OS === 'ios') ? {
        shadowOffset: {
            width: 0,
            height: -(moderateVerticalScale(1)),
        },
        shadowOpacity: 0.25,
        shadowRadius: moderateVerticalScale(1, 0.3),
    } : {
        elevation: 5,
        borderTopWidth: 1.5,
        borderTopColor: 'rgba(10, 10, 10, 0.1)',
    },
    
    tabBarWidth: {
        alignSelf :'center',
        height: '100%',
        flexDirection: 'row',
        width: moderateScale(width, -0.2),
    },

});