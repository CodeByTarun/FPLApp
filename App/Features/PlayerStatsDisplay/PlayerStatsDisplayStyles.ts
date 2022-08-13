import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { cornerRadius, primaryColor, secondaryColor, smallFont, tertiaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: moderateScale(60),
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
        width: verticalScale(14),
        marginLeft: -moderateScale(5, 0.2),
        marginBottom: moderateVerticalScale(2),
    },

    cardsContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 0,
        top: 0,
    },

    cardImage: {
        width: verticalScale(15),
        aspectRatio: 1,
        marginRight: -moderateScale(5, -0.3),
        transform: [{ rotate: "337deg" }]
    },

    dreamTeamContainer: {
        flexDirection: 'row',
        position: "absolute",
        left: -moderateScale(2, -1.5),
        bottom: 0,
        zIndex: 1,
    },

    dreamTeamImage: {
        aspectRatio: 1,
        width: verticalScale(16),
        marginRight: 0,
        marginLeft: -moderateScale(4, 0.3)
    },

    injuredContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 0,
        marginRight: -moderateScale(8, -0.4),
        marginBottom: -moderateScale(5, 0.1),
        bottom: 0,
    },

    injuredImage: {
        width: verticalScale(20),
        aspectRatio: 1,
    }, 

    captainAndViceCaptainContainer: {
        position: 'absolute',
        height: verticalScale(16),
        aspectRatio: 1,
        elevation: 1,
        zIndex: 1,
        top: -verticalScale(8),
        right: -verticalScale(8),
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
        height: moderateVerticalScale(30), 
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
        paddingLeft: moderateScale(4),
        paddingRight: moderateScale(4),
    },
    
    scoreContainer: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: secondaryColor, 
        paddingLeft: moderateScale(4),
        paddingRight: moderateScale(4),
    },
    
    //#endregion
    
    //#region info card
    playerInfoCardContainer: {
        height: '95%', 
        width: moderateScale(60, 0.7), 
        backgroundColor: primaryColor, 
        borderRadius: cornerRadius
    },

    infoCardContainer: {
        flex: 4, 
        padding: moderateScale(2)
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
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(5),
        fontSize: smallFont * 1.1, 
        textAlign: 'center',
        color: textPrimaryColor
    },
    //#endregion
});