import { useTheme } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { AnimatedButton, SearchControl } from "../../../Features/Controls";
import { Separator } from "../../../Global/GlobalComponents";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { AddPlayerModalStyles } from "./AddPlayerModalStyles";

interface AddPlayerModalProps {
    overview: FplOverview | undefined;
    closeFunction: () => void;
    addPlayerFunction: (player: PlayerOverview) => void;
}

const AddPlayerModal = ({overview, closeFunction, addPlayerFunction} : AddPlayerModalProps) => {

    const theme = useTheme();
    const styles = AddPlayerModalStyles(theme);

    const getPlayerList = useCallback(() => {
        return overview?.elements.slice().sort((playerA, playerB) => playerA.first_name.toLowerCase().localeCompare(playerB.first_name.toLowerCase()))
    }, [overview])

    const memoizedGetPlayerList = useMemo(() => getPlayerList(), [overview])

    const [playerList, setPlayerList] = useState(memoizedGetPlayerList)
    const [searchAddPlayerModalText, setSearchAddPlayerModalText] = useState('');
    
    useEffect(function filterPlayerList() {

        let players = memoizedGetPlayerList;

        setPlayerList(players?.filter(player => player.first_name.includes(searchAddPlayerModalText) || player.second_name.includes(searchAddPlayerModalText)));

    }, [searchAddPlayerModalText])

    const renderPlayerItem = ({item} : {item:PlayerOverview}) => {
        return (
            <AnimatedButton buttonFn={() => addPlayer(item)}>
                <View style={styles.playerItemContainer}>
                    <Text style={styles.playerText}>{item.first_name + " " + item.second_name}</Text>
                </View>
            </AnimatedButton>
        )
    }

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);

    const addPlayer = (player: PlayerOverview) => {
        addPlayerFunction(player);
        closeFunction();
    }

    return (
        <View style={styles.modalContainer}>
            <Text style={styles.titleText}>Add Player</Text>
            <View style={styles.searchControlContainer}>
                <SearchControl value={searchAddPlayerModalText} onChangeTextFunction={setSearchAddPlayerModalText} placeHolderText={"Search Player..."}/>
            </View>
            <View style={styles.listContainer}>
                <FlatList data={playerList}
                        renderItem={renderPlayerItem}
                        ItemSeparatorComponent={() => Separator(theme)}
                        keyExtractor={keyExtractor}/>
            </View>
        </View>
    )

}

export default AddPlayerModal;