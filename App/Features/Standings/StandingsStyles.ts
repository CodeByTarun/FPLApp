import { StyleSheet } from "react-native";
import { textSecondaryColor, smallFont, textPrimaryColor, mediumFont, secondaryColor, largeFont } from "../../Global/GlobalConstants";


export const styles = StyleSheet.create({

    titleText:{
        textAlign: 'center', 
        color: textPrimaryColor, 
        fontWeight: '700', 
        marginBottom: 15, 
        marginTop: 15, 
        fontSize: largeFont
    },

    leagueHeaderText: {
        color: textSecondaryColor,
        fontSize: smallFont * 1.3,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '600'
    },

    leagueText: {
        color: textPrimaryColor,
        fontSize: smallFont * 1.3,
        alignSelf: 'center',
        textAlign: 'center'
    },

    standingsButtonContainer: {
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 10, 
        paddingBottom: 10
    },

    teamNameText: {
        textAlign: 'left', 
        flex: 1, 
        color: textPrimaryColor, 
        fontSize: smallFont * 1.4, 
        fontWeight: '600'
    },

    managerNameText: {
        textAlign: 'left', 
        flex: 1, 
        color: textPrimaryColor, 
        fontSize: smallFont * 1.1,
    },

    backButtonText:{ 
        color: textSecondaryColor,
        fontSize: mediumFont,
        fontWeight: '700', 
        textAlign: 'center'
    },
    
    headerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        paddingBottom: 7, 
        borderBottomColor: textSecondaryColor, 
        borderBottomWidth: 1.5, 
        backgroundColor: secondaryColor
    },
});
