import { Dimensions } from "react-native";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

// Dimensions
export const {width, height} = Dimensions.get('window');

export const FIXTURES_VIEW_HEIGHT = moderateScale(110, 0.35);
export const FIXTURES_VIEW_CONTROLS_HEIGHT = moderateScale(30, 0.35);
export const FIXTURE_CARD_HEIGHT = moderateScale(80, 0.35);

export const BOTTOM_BAR_HEIGHT = moderateScale(50, 0.1);

// Styling
export const cornerRadius = 12;

// Color Scheme
export const fieldColor = '#5e9111';
export const darkFieldColor = '#242424';
export const redColor = '#f44336';

export const buttonColor = 'whitesmoke';
export const primaryColor = '#121212';
export const secondaryColor = '#2a2a2a';
export const lightColor = '#9b7fc6';
export const aLittleLighterColor = '#bcbcbc';
export const darkColor = '#462280';
export const aLittleDarkerColor = '#bcbcbc';
export const tertiaryColor = '#bcbcbc';
export const textPrimaryColor = '#ece7f4';
export const textSecondaryColor = '#bcbcbc';

export const testColor = '#451295';

export const modalTextColor = 'white';
export const modalBackgroundColor = primaryColor;
export const modalButtonColor = secondaryColor;

// Fonts
export const smallFont = moderateScale(8, 0.3);
export const mediumFont = moderateScale(11, 0.3);
export const largeFont = moderateScale(16, 0.3);

export const defaultFont = 'SFNSText';
export const boldFont = 'SFNSTextBold';
export const semiBoldFont = 'SFNSTextSemiBold';

export const Per90Stats = ["Total Points", "Goals Scored", "Assists", 
                            "Clean Sheets", "Goals Conceded", "Own Goals",
                            "Yellow Cards", "Red Cards", "Saves", "Bonus",
                            "Bonus Points Total", "Influence", "Creativity",
                            "Threat", "ICT Index"];

export const PlayerComparisonLimit = 5;

export const defaultTheme = {
    dark: false,
    colors: {
        primary: '#451295',
        background: '#582aa0',
        card: '#451295',
        text: '#ece7f4',
        border: '#9b7fc6',
        notification: '#c7b8df',
    }
}

export const darkTheme = {
    dark: true,
    colors: {
        primary: '#101010',
        background: '#181818',
        card: '#141414',
        text: '#ece7f4',
        border: '#606060',
        notification: '#808080',
    }
}
// current background color
// #272727 
// 50% #676767

// Default Theme

// export const buttonColor = 'whitesmoke';
// export const primaryColor = '#451295';
// export const secondaryColor = '#582aa0';
// export const lightColor = '#9b7fc6';
// export const aLittleLighterColor = '#7955b3';
// export const darkColor = '#462280';
// export const aLittleDarkerColor = '#693faa';
// export const tertiaryColor = 'white';
// export const textPrimaryColor = '#ece7f4';
// export const textSecondaryColor = '#c7b8df';

// Dark Theme
// export const buttonColor = 'whitesmoke';
// export const primaryColor = '#121212';
// export const secondaryColor = '#2a2a2a';
// export const lightColor = '#9b7fc6';
// export const aLittleLighterColor = '#bcbcbc';
// export const darkColor = '#462280';
// export const aLittleDarkerColor = '#bcbcbc';
// export const tertiaryColor = '#bcbcbc';
// export const textPrimaryColor = '#ece7f4';
// export const textSecondaryColor = '#bcbcbc';