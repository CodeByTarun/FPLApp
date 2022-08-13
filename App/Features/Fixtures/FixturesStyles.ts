import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { BOTTOM_BAR_HEIGHT, FIXTURES_VIEW_CONTROLS_HEIGHT, height, largeFont, mediumFont, primaryColor, secondaryColor, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    animatedView: {
        zIndex: 1,
        elevation: 0.2,
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: primaryColor
    },

    controlsContainer: {
        height: FIXTURES_VIEW_CONTROLS_HEIGHT,
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingRight: moderateScale(5),
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
        transform: [{rotate: '-45deg'}], 
        alignSelf: 'center',
        marginBottom: moderateVerticalScale(4),
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
        marginLeft: moderateScale(2.5), 
        marginRight: moderateScale(2.5)
      },

      bottomBar: {
        width: moderateScale(width * 0.6, -0.2),
        alignSelf: 'center',
        height: BOTTOM_BAR_HEIGHT,
        backgroundColor: primaryColor,
        flexDirection: 'row',
      },

      bottomaBarSections: {
        flex: 1/3,
        alignContent: 'center',
        justifyContent: 'center',
      },

      buttonContainer: {
        height: '100%', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center'
      },

      image: {
        height: '50%',
        width: '50%',
      },

      text: {
        color: textPrimaryColor,
        fontWeight: '600',
        fontSize: mediumFont
      }
});