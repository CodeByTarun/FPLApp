import { StyleSheet } from "react-native";
import { cornerRadius, mediumFont, secondaryColor, textSecondaryColor, width } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    playerContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 5,
    },

    headerView: {
        height: '23%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    
    playerButton: {
        width: width * 0.18,
        height: '100%',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        padding: 3,
    },
    
    playerHeaderText: {
        fontSize: mediumFont * 0.8,
        color: textSecondaryColor,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center',
    },

    jerseyContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    jerseyImage: {
        alignSelf: 'center', 
        height: '85%'
    },
});