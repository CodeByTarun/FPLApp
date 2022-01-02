// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React from "react"
import { View, Image, StyleSheet } from "react-native"
import Lineup from "./Lineup"
import TeamSelector from "./TeamSelector"

const LineupContainer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TeamSelector/>
            </View>
            <View style={styles.middle}>
                <Lineup/>
            </View>
            <View style={styles.bottom}></View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            margin: 5,
        },

        top: {
            flex: 1,
        },

        middle: {
            flex: 8,
            width : '100%',
        },

        field: {
            width: '100%',
            height: '110%',
            alignSelf: 'center',
        },

        bottom: {
            flex: 2,
            backgroundColor: 'lightgray'
        }
    }
)

export default LineupContainer;