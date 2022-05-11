import { StyleSheet } from "react-native";
import { aLittleLighterColor, cornerRadius, primaryColor, largeFont, textPrimaryColor, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1, 
        paddingTop: 10, 
        paddingBottom: 5, 
        zIndex: -1
    },

    sectionBorder: {
        borderWidth: 2, 
        borderColor: aLittleLighterColor, 
        borderRadius: cornerRadius,
    },

    topSection: {
        flex: 3, 
        flexDirection: 'row'
    },

    bottomSection: {
        flex: 1, 
        marginTop: 20, 
        padding: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },

    pieChartContainer: {
        flex: 3,
        margin: 5,
        padding: 5,
    },

    rightSideStatsContainer: {
        flex: 3, 
        marginTop: 15, 
        marginRight: 15, 
        marginBottom: 15
    },

    sectionHeaderText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -20, 
        left: 15,
        padding: 5
    },

    pointsHeaderText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -20, 
        right: 15,
        padding: 5
    },

    gameweekSectionText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.8,
        fontWeight: '500',
        alignSelf: 'center'
    },
})