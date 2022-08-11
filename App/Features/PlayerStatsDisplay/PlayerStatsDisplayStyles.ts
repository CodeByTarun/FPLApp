import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { cornerRadius, primaryColor, secondaryColor, smallFont, tertiaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: widthPercentageToDP('16.5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagesContainer: {
        flex:3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%',
    },

    jerseyImage: {
        alignSelf: 'center', 
        height: '85%',
    },

    allStatsContainer: {
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        aspectRatio: 0.9,
        height: '90%', 
        position: 'absolute',     
    },

    text: {
        flex: 1,
        fontSize: smallFont* 1.1,
        fontWeight: '600', 
        alignSelf: 'center', 
        textAlign:'center',
        color: textPrimaryColor,
    },

    //#region Stats
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    statsImage: {
        aspectRatio: 1,
        width: heightPercentageToDP('2%'),
        marginLeft: -widthPercentageToDP('1%')
    },

    cardsContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 0,
        top: 0,
    },

    cardImage: {
        width: heightPercentageToDP('2%'),
        aspectRatio: 1,
        marginRight: -widthPercentageToDP('0.5%'),
        transform: [{ rotate: "337deg" }]
    },

    dreamTeamContainer: {
        flexDirection: 'row',
        position: "absolute",
        left: -widthPercentageToDP('0.25%'),
        bottom: 0,
        zIndex: 1,
    },

    dreamTeamImage: {
        aspectRatio: 1,
        width: heightPercentageToDP('2.5%'),
        marginRight: 0,
        marginLeft: -widthPercentageToDP('1%')
    },

    injuredContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 0,
        marginRight: -widthPercentageToDP('0.5%'),
        marginBottom: -widthPercentageToDP('0.5%'),
        bottom: 0,
    },

    injuredImage: {
        width: heightPercentageToDP('3%'),
        aspectRatio: 1,
    }, 

    captainAndViceCaptainContainer: {
        position: 'absolute',
        height: heightPercentageToDP('2.5%'),
        aspectRatio: 1,
        elevation: 1,
        zIndex: 1,
        top: -heightPercentageToDP('1.25%'),
        right: -heightPercentageToDP('1.25%'),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: tertiaryColor,
        borderRadius: 100,
    },

    captainAndViceCaptainText: {
        color: primaryColor,
        alignSelf: 'center',
        fontSize: smallFont,
        fontWeight: '700',
        textAlign: 'center'
    },
    //#endregion

    //#region Score and Name
    scoreAndNameContainer: {
        height: heightPercentageToDP('4%'), 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 0, 
        backgroundColor: primaryColor,
    },

    nameContainer: {
        flex: 1, 
        flexDirection: 'row', 
    },

    nameText: {
        fontWeight: '500',
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
    },
    
    scoreContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: secondaryColor, 
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
    },
    
    //#endregion
    
    //#region info card
    playerInfoCardContainer: {
        height: '95%', 
        width: widthPercentageToDP('16%'), 
        backgroundColor: primaryColor, 
        borderRadius: cornerRadius
    },

    infoCardContainer: {
        flex: 4, 
        padding: widthPercentageToDP('0.25%')
    },

    nextWeekText: {
        color: textSecondaryColor, 
        fontSize: smallFont*0.9,
        fontWeight: '400', 
        alignSelf: 'center', 
        textAlign: 'center'
    },

    infoCardNameContainer: {
        flex: 1, 
        backgroundColor: secondaryColor, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottomRightRadius: cornerRadius, 
        borderBottomLeftRadius: cornerRadius
    },

    infoCardNameText: {
        fontWeight: '600', 
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
        fontSize: smallFont * 1.1, 
        textAlign: 'center',
        color: textPrimaryColor
    },
    //#endregion
});