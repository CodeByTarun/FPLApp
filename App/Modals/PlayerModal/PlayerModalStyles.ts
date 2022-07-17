import { StyleSheet } from "react-native";
import { modalTextColor, mediumFont, height, largeFont, textPrimaryColor, secondaryColor, cornerRadius, textSecondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
    },

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        paddingTop: 15, 
        fontWeight: '500', 
        textAlign: 'center', 
        paddingBottom: 5
    },

    fixtureContainer: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },

    fixtureScoreView: {
        flexDirection: 'row', 
        width: '100%', 
        alignSelf: 'center', 
        height: height*0.05, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 10,
    },

    scoreText: {
        color: modalTextColor,
        fontSize: largeFont,
        marginLeft: 10,
        marginRight: 10,
    },

    emblemView: {
        width:'25%',
    },

    emblems: {
        resizeMode: 'contain',
        alignSelf:'center',
        height: '100%',
        width: '100%',
     },

    statHeaderContainer: {
        flexDirection: 'row', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        padding: 5
    },

    statText: {
        color: modalTextColor,
        fontSize: mediumFont,
    },

    statContainer: {
        flexDirection: 'row', 
        padding: 5
    },

    button: {
        height: 40,
        width: '50%',
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginTop: 10,
        alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontWeight: '500',
    }

}); 