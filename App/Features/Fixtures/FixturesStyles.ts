import { StyleSheet } from "react-native";
import { height, largeFont, mediumFont, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: primaryColor, 
        zIndex: 1,
        width: '100%',
        position: 'absolute',
    },

    controlsContainer: {
        height: 40, 
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

      closeFixtureViewButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20, 
      },

      closeFixtureViewButton: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: secondaryColor,
        padding: 15,
      },

      closeFixtureViewButtonText: {
        fontSize: mediumFont,
        fontWeight: '500',
        color: textSecondaryColor,
        alignSelf: 'center',
        textAlign: 'center'
      },

      previousGameweekButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: '32%',
      },

      previousGamweekButton: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: secondaryColor,
        padding: 15,
      },

      nextGameweekButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: '32%',
      }, 

      nextGamweekButton: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: secondaryColor,
        padding: 15,
      },

      gameweekViewContainer: {
        height: height * 0.6,
        width: width * 0.7,
      },
});