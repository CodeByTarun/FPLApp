import { StyleSheet } from "react-native";
import { modalTextColor, mediumFont, height, largeFont, textPrimaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        paddingTop: 10, 
        fontWeight: '500', 
        textAlign: 'center', 
        paddingBottom: 10
    },

    fixtureContainer: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },

    fixtureScoreView: {
        flexDirection: 'row', 
        width: '75%', 
        alignSelf: 'center', 
        height: height*0.05, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 10,
    },

    scoreText: {
        color: modalTextColor,
        fontSize: largeFont,
        marginLeft: 5,
        marginRight: 5,
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

}); 