// This is going to show a table of players when clicked on that will be filtered as the user types in it
// When one of the players names are clicked on a player card will open showing there stats!!
//TODO: think about adding a compare feature between two players?
//TODO: also this way might not be the best since you cant filter by most pts, xg, assits, position

import React from "react";
import { TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"

const onTablePress = () => {

}

const PlayerSearch = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.searchbox}  placeholder="Search player..."/>
            <TouchableOpacity style={styles.button} onPress={onTablePress}>
                <Image style={styles.tableImage} source={require('../../../assets/tablet.png')} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: 0,
        paddingRight: 5,
        paddingLeft: 5
    },

    searchbox: {
        flex: 1,
        height: 40,
        marginRight: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: GlobalConstants.tertiaryColor,
        borderRadius: GlobalConstants.cornerRadius,
    },

    button: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        backgroundColor: GlobalConstants.tertiaryColor,
        borderRadius: GlobalConstants.cornerRadius,
    },

    tableImage: {
        height: '65%',
        width : '65%',
        alignSelf: 'center',
    },
});

export default PlayerSearch;