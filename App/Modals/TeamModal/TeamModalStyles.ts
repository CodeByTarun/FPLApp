import { StyleSheet } from "react-native"
import { secondaryColor, modalTextColor, largeFont, mediumFont, modalButtonColor, cornerRadius, fieldColor, width, textSecondaryColor, textPrimaryColor } from "../../Global/GlobalConstants"

export const styles = StyleSheet.create(
    {
        //#region Modal Styling
        //#region  close button
        closeButton: {
            position: 'absolute',
            zIndex: 1,
            right: -7,
            top: -7,
            height: 25,
            width: 25,
            margin: 0,
            borderRadius: 20,
        },

        closeButtonBackground: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: secondaryColor,
            borderRadius: 20,
        },

        //#endregion

        titleText: {
            alignSelf: 'center', 
            color: textPrimaryColor,
            fontSize: largeFont,
            fontWeight: 'bold',
            marginTop: 12, 
            marginBottom: 5,
        },

        text: {
            color: textPrimaryColor,
            fontSize: mediumFont,
        },

        textInput: {
            backgroundColor: modalButtonColor,
            height: '70%',
            padding: 7,
            borderRadius: cornerRadius,
        },

        modalAddTeamView: {
            borderRadius: cornerRadius,
            padding: 8,
            flex: 1,
            width: '100%'
        },

        switch: {
            height: '45%',
            width: '25%',
            transform: [
                {scaleX: 0.8 },
                { scaleY: 0.8 }
            ]
        },

        formButton: {
            justifyContent: 'center',
            backgroundColor: fieldColor,
            padding: 9,
            width: width * 0.25,
            borderRadius: cornerRadius,
        },

        modalListRow: {
            flexDirection: 'row',
            padding: 10,
            flex: 1,
            alignItems: 'center',
        },
        
        button: {
            justifyContent: 'center',
        },

        icon: {
            width: '80%',
            height: '80%',
            aspectRatio: 1,
            alignSelf: 'center'
        },

        modalTeamList: {
            flex: 1,
            width: '100%',
            margin: 5,
            paddingTop: 10,
        },        

        addButton: {
            width: '40%',
            backgroundColor: modalButtonColor,
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: cornerRadius,
            alignSelf: 'center',
            marginTop: 5,
        },

        buttonText: {
            fontSize: mediumFont,
        },

        favouriteButton: {
            flex: 1,
            justifyContent: 'center'
        },

        teamButton: {
            flex: 7,
            marginLeft: 5,
        },

        editButton: {
            flex: 1,
            justifyContent: 'center',
            padding: 3,
        },

    }
)