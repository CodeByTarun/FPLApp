import { StyleSheet } from "react-native";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, tertiaryColor, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create(
    {   
        bottomContainer: {
            flex: 1,
            backgroundColor: '#629512',
            borderTopWidth: 1.5,
            borderTopColor: 'white'
        },

        field: {
            width: '100%',
            height: '107.5%',
            alignSelf: 'center',
            position: "absolute"
        },

        playerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },

        playerRowContainer: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },

        managerInfoCardContainer: {
            position: 'absolute', 
            height: '20%', 
            aspectRatio: 1, 
            right: 0, 
            zIndex: 0
        },

        gameweekText: {
            position: 'absolute',
            top: 0,
        }
    }
);