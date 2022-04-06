import { StyleSheet } from "react-native";
import { cornerRadius, primaryColor, smallFont, textPrimaryColor, textSecondaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 7,
        marginRight: 15,
        borderBottomLeftRadius: cornerRadius,
        borderBottomRightRadius: cornerRadius,
        backgroundColor: primaryColor,
        alignSelf: 'center',
        zIndex: 1,
    },

    statText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: smallFont * 2.4,
    },

    rankText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600'
    },
    
    text: {
        fontSize: smallFont,
        color: textSecondaryColor,
        fontWeight: '500',
        alignSelf: 'center'
    },
});