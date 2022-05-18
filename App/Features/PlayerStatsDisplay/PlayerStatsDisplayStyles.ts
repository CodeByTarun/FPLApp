import { StyleSheet } from "react-native";
import { cornerRadius, primaryColor, secondaryColor, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: width*(1/6),
        justifyContent: 'center',
        alignItems: 'center',
    },

    imagesContainer: {
        flex:3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%'
    },

    jerseyImage: {
        alignSelf: 'center', 
        height: '85%'
    },

    allStatsContainer: {
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        width: '90%', 
        height: '90%', 
        position: 'absolute'
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
        marginLeft: 0,
    },

    statsImage: {
        aspectRatio: 1,
        width: width/26,
        marginRight: -8,
    },

    cardsContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 10,
        top: 1,
    },

    cardImage: {
        aspectRatio: 1,
        width: width/24,
        marginRight: -10,
        marginTop: 0,
        transform: [{ rotate: "337deg" }]
    },

    dreamTeamContainer: {
        flexDirection: 'row',
        position: "absolute",
        left: -2,
        bottom: 0,
        zIndex: 1,
    },

    dreamTeamImage: {
        height: width/20,
        width: width/20,
        marginRight: 0,
    },

    injuredContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 5,
        bottom: -7,
    },

    injuredImage: {
        height: width/16,
        width: width/16,
    }, 

    captainAndViceCaptainContainer: {
        position: 'absolute',
        height: '30%',
        aspectRatio: 1,
        bottom: 0,
        right: -10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderRadius: 100
    },

    captainAndViceCaptainText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: smallFont * 1.3,
        fontWeight: '800',
        textAlign: 'center'
    },
    //#endregion

    //#region Score and Name
    scoreAndNameContainer: {
        flex: 1.5, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: 1, 
        backgroundColor: primaryColor,
    },

    nameContainer: {
        flex: 1, 
        flexDirection: 'row', 
    },

    nameText: {
        fontWeight: '500',
        paddingLeft: 5,
        paddingRight: 5,
    },
    
    scoreContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: secondaryColor, 
        paddingLeft: 5, 
        paddingRight: 5, 
    },
    
    //#endregion
    
    //#region info card
    playerInfoCardContainer: {
        height: '95%', 
        width: '110%', 
        margin: 10, 
        backgroundColor: primaryColor, 
        borderRadius: cornerRadius
    },

    infoCardContainer: {
        flex: 4, 
        padding: 3
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
        paddingLeft: 5, 
        paddingRight: 5, 
        fontSize: smallFont * 1.1, 
        textAlign: 'center',
        color: textPrimaryColor
    },
    //#endregion
});