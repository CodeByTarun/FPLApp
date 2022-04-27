import { StyleSheet } from "react-native";
import { smallFont, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        paddingBottom: 3,
    },

    fixtureDifficultyText: {
        fontSize: smallFont * 0.9, 
        alignSelf: 'center',
        flex: 1,
        textAlign:'center',
        color: textSecondaryColor, 
        fontWeight: '600'
    },

    fixtureDifficultyContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection:'row', 
        marginTop: -1,
        maxHeight: '20%',
    },

    fixtureViewText: {
        fontSize: smallFont * 0.9, 
        color: 'black', 
        fontWeight: '400', 
        alignSelf: 'center',
        flex: 1,
        textAlign:'center'
    },
});
