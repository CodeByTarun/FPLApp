import { StyleSheet } from "react-native";
import { width, primaryColor, smallFont, textSecondaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    kingsView: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 3,
        width: width*0.867,
        backgroundColor: primaryColor,           
    },

    kingsScrollView: {
        flex: 1,
    },

    kingsCardView: {
        width: width*0.8*0.27,
        padding: 5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    jersey: {
        position: 'absolute',
        alignSelf: 'center',
        height: '90%',
        width: '70%',
        marginTop: 3,
        flex: 9,
    },

    kingsText: {
        flex: 1,
        color: 'white',
        fontSize: smallFont,
        padding: 5,
    },

    scoreText: {
        fontSize: width*0.03,
        position: "absolute",
        overflow: 'hidden',
    },

    scoreContainer: {
        height: width/24,
        width: width/24,
        borderRadius: width/24/2,
        backgroundColor: primaryColor,
        color: textSecondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: width*0.19*0.15,
    },
});
