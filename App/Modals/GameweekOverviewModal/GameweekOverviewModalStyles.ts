import { StyleSheet } from "react-native";
import { largeFont, textPrimaryColor, mediumFont, textSecondaryColor, width, secondaryColor, cornerRadius, height, primaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    modalView: {
        backgroundColor: primaryColor, 
        alignSelf: 'center',
        borderRadius: cornerRadius
    },

    titleText: {
        fontSize: largeFont * 1.1,
        color: textPrimaryColor,
        fontWeight: '600',
        alignSelf: 'center',
        padding: 15,
        paddingTop: 20,
        textAlign: 'center'
    },

    pointsView: {
        flexDirection: 'row', 
        paddingBottom: 10
    },

    pointsContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    highestPointsButton :{
        backgroundColor: primaryColor, 
        padding: 7, 
        borderRadius: cornerRadius
    },

    headerText: {
        fontSize: mediumFont * 0.8,
        color: textSecondaryColor,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center'
    },

    scoreText: {
        fontSize: largeFont * 1.2,
        color: textPrimaryColor,
        paddingTop: 3,
        fontWeight: '500', 
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: -2,
    },

    playerContainer: {
        flex: 1,
        paddingBottom: 10,
    },

    playerContainerRow: {
        flex: 1, 
        justifyContent :'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    
    

});