import { Dimensions } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

// Dimensions
export const {width, height} = Dimensions.get('window');


export const FIXTURES_VIEW_HEIGHT = moderateVerticalScale(height * 0.17, -0.2);
export const FIXTURES_VIEW_CONTROLS_HEIGHT = moderateVerticalScale(height * 0.05, -0.2);
export const FIXTURE_CARD_HEIGHT = moderateVerticalScale(height * 0.12, -0.2);

export const BOTTOM_BAR_HEIGHT = moderateVerticalScale(50, 0.1);

//7.5% height

// Styling
export const cornerRadius = 12;

// Color Scheme
export const fieldColor = '#5e9111';
export const redColor = '#f44336';

export const buttonColor = 'whitesmoke';
export const primaryColor = '#451295';
export const secondaryColor = '#582aa0';
export const lightColor = '#9b7fc6';
export const aLittleLighterColor = '#7955b3';
export const darkColor = '#462280';
export const aLittleDarkerColor = '#693faa';
export const tertiaryColor = 'white';
export const textPrimaryColor = '#ece7f4';
export const textSecondaryColor = '#c7b8df';

export const testColor = '#451295';

export const modalTextColor = 'white';
export const modalBackgroundColor = primaryColor;
export const modalButtonColor = secondaryColor;

// Fonts
export const smallFont = moderateScale(8, 0.3);
export const mediumFont = moderateScale(11, 0.4);
export const largeFont = moderateScale(16, 0.6);


export const Per90Stats = ["Total Points", "Goals Scored", "Assists", 
                            "Clean Sheets", "Goals Conceded", "Own Goals",
                            "Yellow Cards", "Red Cards", "Saves", "Bonus",
                            "Bonus Points Total", "Influence", "Creativity",
                            "Threat", "ICT Index"];

export const PlayerComparisonLimit = 5;