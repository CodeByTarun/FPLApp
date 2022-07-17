import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, Platform } from "react-native";
import { RootStackParams } from "../../../App";
import { AnimatedButton, ModalWrapper, SearchControl } from "../../Features/Controls";
import { useAppSelector } from "../../Store/hooks";
import { styles } from "./ListModalStyle";
  
// inputs:
// list of items, reset button text, reset fn, item select fn, optional search component 
// the above has been added through the store
// TODO: test button fn and reset fn for different listmodaldata to ensure they are changing 
// TODO: since im using callback
// TODO: set height and width both in percentage
// TODO: optional search bar (create a good search function)

const ListModal = () => {

    const listModalData = useAppSelector(store => store.modal.listModalData);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState(listModalData.items);

    useEffect(function filterPlayerList() {

        setItems(items.filter(string => string.includes(searchText)));

    }, [setSearchText]);

    const buttonFn = useCallback(() => {
        listModalData.buttonFn();
        navigation.goBack();
    }, [listModalData]);

    const itemSelectFn = useCallback((item: string) => {
        listModalData.itemSelectFn(item);
        navigation.goBack();
    }, [listModalData]);

    const renderItem = useCallback(({item}: {item: string}) => {
        return (
            <AnimatedButton buttonFn={() => itemSelectFn(item)}>
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{item}</Text>
                </View>
            </AnimatedButton>
        )
    }, [listModalData.items, listModalData.itemSelectFn]);

    const flatListRef = useRef<FlatList>(null);

    const onLayoutChange = useCallback(() => {
        function scroll() {
            flatListRef.current?.scrollToIndex({ index: listModalData.items.indexOf(listModalData.currentItem), animated: false});
        }

        if (Platform.OS === "ios") {
            setTimeout(scroll, 50);
        } else {
            scroll();
        }
        
    }, [listModalData.currentItem])

    return (
        <ModalWrapper modalHeight="60%" modalWidth="60%">
            <View style={styles.container}>
                <Text style={styles.title}>{listModalData.title}</Text>
                { listModalData.isSearchable &&
                    <View testID="searchBar">
                        <SearchControl value={searchText} onChangeTextFunction={setSearchText} placeHolderText={"Search..."}/>
                    </View>
                }
                <FlatList style={styles.flatList}
                          ref={flatListRef}
                          onLayout={onLayoutChange}
                          ListHeaderComponentStyle={styles.flatListHeader}
                          data={listModalData.items}
                          keyExtractor={item => item}
                          renderItem={renderItem}/>
                          
                <View style={styles.buttonContainer}>
                    <AnimatedButton buttonFn={buttonFn}>
                        <Text style={styles.buttonText}>{listModalData.buttonText}</Text>
                    </AnimatedButton>
                </View>
                
            </View>
        </ModalWrapper>
    )
}

export default ListModal;