import { StyleSheet } from "react-native";
import { primaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: primaryColor,
        width: '85%',
       },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});