import { StyleSheet } from "react-native";
import { aLittleDarkerColor, primaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        aspectRatio: 8,
        width: '100%',
        backgroundColor: primaryColor,
        flexDirection: 'row',
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    
});