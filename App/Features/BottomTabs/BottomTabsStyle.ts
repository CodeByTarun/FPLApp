import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { BOTTOM_BAR_HEIGHT, primaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        height: BOTTOM_BAR_HEIGHT,
        width: '100%',
        backgroundColor: primaryColor,
        flexDirection: 'row',
        elevation: 0.1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -(heightPercentageToDP('0.1%')),
        },
        shadowOpacity: 0.25,
        shadowRadius: heightPercentageToDP('0.2%'),
    },
    
});