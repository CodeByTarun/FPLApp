import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { primaryColor, secondaryColor, cornerRadius, textPrimaryColor, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({ 
    //#region player table
    topBarContainer: {
        width: '100%', 
        backgroundColor: primaryColor,
        paddingLeft: widthPercentageToDP('1.5%'),
        paddingRight: widthPercentageToDP('1.5%'),
        zIndex: 1,
    },

    firstRowTopBarContainer: {
        paddingTop: heightPercentageToDP('1.5%'),
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    closeButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: widthPercentageToDP('1.5%'),
        marginLeft: widthPercentageToDP('1%')
    },

    secondRowTopbarContainer: {
        height: heightPercentageToDP('6%'),
        flexDirection: 'row', 
        justifyContent: 'center', 
    },

    dropDownsContainer: {
        flex: 1, 
        flexDirection: 'row',
        marginTop: heightPercentageToDP('1%'),
        marginBottom: heightPercentageToDP('0.25%'),
        marginRight: heightPercentageToDP('0.5%'),
        marginLeft: heightPercentageToDP('0.5%'),
    },

    dropDownContainer: {
        marginRight: widthPercentageToDP('1%'),
        marginTop:heightPercentageToDP('0.5%'),
        flex: 1,
    },

    leftMarginDropDown: {
        marginLeft: widthPercentageToDP('3%'),
    },

    filterButtonContainer: {
        height: '100%',
        marginTop: heightPercentageToDP('0.25%'),
        width: widthPercentageToDP('8%'),
        alignSelf: 'center',
        justifyContent: 'center',
    },

    filter: {
        height: heightPercentageToDP('3%'),
        width: '85%',
        alignSelf: 'center',
        marginTop: heightPercentageToDP('0.5%')        
    },

    //#endregion
});