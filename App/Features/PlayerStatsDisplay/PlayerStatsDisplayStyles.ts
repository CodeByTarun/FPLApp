import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { cornerRadius, smallFont, width } from "../../Global/GlobalConstants";

export const PlayerStatsDisplayStyles = (theme: Theme) => StyleSheet.create({
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
        width: '100%',       
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
        color: theme.colors.text,
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
        transform: [{ rotate: "337deg" }],
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
        marginLeft: -moderateScale(4, 0.3),
    },

    injuredContainer: {
        flexDirection: 'row',
        position: "absolute",
        right: 0,
        marginRight: -moderateScale(7, -0.2),
        marginBottom: -moderateScale(3, 0.8),
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
        backgroundColor: theme.colors.text,
        borderRadius: 100,
    },

    captainAndViceCaptainText: {
        color: theme.colors.primary,
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
        backgroundColor: theme.colors.primary,
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
        backgroundColor: theme.colors.background, 
        paddingLeft: moderateScale(4),
        paddingRight: moderateScale(4),
    },
    
    //#endregion
    
    //#region info card
    playerInfoCardContainer: {
        height: '95%', 
        width: moderateScale(60, 0.7), 
        backgroundColor: theme.colors.primary, 
        borderRadius: cornerRadius
    },

    infoCardContainer: {
        flex: 4, 
        padding: moderateScale(2)
    },

    nextWeekText: {
        color: theme.colors.notification, 
        fontSize: smallFont*0.9,
        fontWeight: '400', 
        alignSelf: 'center', 
        textAlign: 'center'
    },

    infoCardNameContainer: {
        flex: 1, 
        backgroundColor: theme.colors.background, 
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
        color: theme.colors.text
    },
    //#endregion
});