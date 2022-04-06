import { StyleSheet } from "react-native";
import { height, largeFont, mediumFont, primaryColor, textPrimaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    animatedView: {
        backgrouendColor: primaryColor, 
        zIndex: 2
    },

    controlsContainer: {
        height: height * 0.075, 
        width: '100%' 
    },

    innerControlsContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingLeft: 10, 
        paddingRight: 10
    },

    gameweekButton: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
      },

      gameweekText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontSize: largeFont * 0.9, 
        fontWeight: '700'
      },

      gameweekDropDownSymbol: {
        color: textPrimaryColor, 
        fontSize: mediumFont * 0.6, 
        fontWeight: '700', 
        marginTop: 0, 
        transform: [{rotate: '-45deg'}], 
        alignSelf: 'center',
        marginBottom: 5
      },

      buttonsContainers: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
      },

      singleButtonContainer: {
        height: '60%', 
        alignSelf:'center', 
        aspectRatio: 1
      },

      fixturesScrollView: {
        flex: 1, 
        marginLeft: 2.5, 
        marginRight: 2.5
      },
});