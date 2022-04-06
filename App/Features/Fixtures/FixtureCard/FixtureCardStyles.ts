import { StyleSheet } from "react-native";
import { height, width, primaryColor, cornerRadius, textPrimaryColor, lightColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    //#region main layout
    container: {
        height: height * 0.11,
        width: width * 0.3288,
    },

    button: {
        flex: 1,
    },

    card: {
        backgroundColor: primaryColor,
        flex: 1,
        flexDirection: 'column',
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3,
        marginBottom: 3,
        padding: 5,
        borderRadius: cornerRadius,
    },
    //#endregion

    //#region top bar
    topbar: {
        alignSelf: 'center',
        height: '25%',
        width: '100%',
    },

    datetext: {
        fontSize: 0.03 * width,
        alignSelf: 'center',
        paddingLeft: 5,
        color: textPrimaryColor
    },

    //#endregion
    
    //#region score
    scoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        padding: 3,
    },

    scoreAndTimeView: {
        paddingBottom: 5
    },

    scoreText: {
        fontSize: 0.04 * width,
        alignSelf: 'center',
        margin: 2,
        color: textPrimaryColor,
    },

    timeText: {
        fontSize: 0.025 * width,
        alignSelf: 'center',
        color: 'red',
        fontWeight: "bold",
        marginLeft: 3
    },

    fullTimeText: {
        fontSize: 0.025 * width,
        alignSelf: 'center',
        color: lightColor
    }
    //#endregion
});