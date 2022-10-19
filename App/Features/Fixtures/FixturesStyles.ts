import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { BOTTOM_BAR_HEIGHT, defaultFont, FIXTURES_VIEW_CONTROLS_HEIGHT, height, largeFont, mediumFont, primaryColor, secondaryColor, semiBoldFont, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const FixturesStyles = (theme: Theme) => StyleSheet.create({
    animatedView: {
        zIndex: 1,
        elevation: 0.2,
        overflow: 'hidden',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: theme.colors.primary,
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
        color: theme.colors.text, 
        alignSelf: 'center', 
        fontSize: mediumFont*1.3,
        fontFamily: semiBoldFont,
      },

      gameweekDropDownSymbol: {
        color: theme.colors.text, 
        fontSize: mediumFont * 0.65, 
        transform: [{rotate: '-45deg'}], 
        alignSelf: 'center',
        marginBottom: moderateVerticalScale(4),
        fontFamily: semiBoldFont,
      },

      buttonsContainers: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
      },

      singleButtonContainer: {
        height: '65%',
        alignSelf:'center', 
        aspectRatio: 1
      },

      fixturesScrollView: {
        marginLeft: moderateScale(2.5), 
        marginRight: moderateScale(2.5),
      },

      bottomBar: {
        width: moderateScale(width * 0.6, -0.2),
        alignSelf: 'center',
        height: BOTTOM_BAR_HEIGHT,
        backgroundColor: theme.colors.primary,
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
        color: theme.colors.notification,
        fontSize: mediumFont,
        fontFamily: defaultFont,
      }
});