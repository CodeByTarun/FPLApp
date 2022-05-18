import { Dimensions } from "react-native";

// Dimensions
export const {width, height} = Dimensions.get('window');

export const FIXTURES_VIEW_HEIGHT = `${(width / height * 33)}%`

// Styling
export const cornerRadius = 12;

// Color Scheme
export const fieldColor = '#629512';
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
export const smallFont = width / height * 16;
export const mediumFont = width / height * 23;
export const largeFont = width / height * 30;


export const Per90Stats = ["Total Points", "Goals Scored", "Assists", 
                            "Clean Sheets", "Goals Conceded", "Own Goals",
                            "Yellow Cards", "Red Cards", "Saves", "Bonus",
                            "Bonus Points Total", "Influence", "Creativity",
                            "Threat", "ICT Index"];