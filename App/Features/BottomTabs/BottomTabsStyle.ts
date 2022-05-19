import { StyleSheet } from "react-native";
import { aLittleDarkerColor, primaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        aspectRatio: 8,
        width: '100%',
        backgroundColor: primaryColor,
        flexDirection: 'row',
        elevation: 0.1,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.04)',
        borderTopWidth: 1,
    },
    
});