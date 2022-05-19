import { StyleSheet } from "react-native";
import { height, largeFont, mediumFont, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";
import { IsThereAMatchInProgress } from "../../Helpers/FplAPIHelpers";

export const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: primaryColor,
        zIndex: 1,
        elevation: 0.2,
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
    },

    controlsContainer: {
        aspectRatio: 12, 
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingRight: 10,
    },

    fixturesListContainer: {
      flex: 1,
    },

    gameweekButton: {

        flexDirection: 'row',
        alignSelf: 'center',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
      },

      gameweekText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontSize: mediumFont*1.3,
        fontWeight: '700'
      },

      gameweekDropDownSymbol: {
        color: textPrimaryColor, 
        fontSize: mediumFont * 0.65, 
        fontWeight: '700', 
        marginTop: 0, 
        transform: [{rotate: '-45deg'}], 
        alignSelf: 'center',
        marginBottom:5
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
        marginRight: 2.5,
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
        bottom:20,
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