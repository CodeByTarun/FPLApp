import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import globalStyles from "../../../../Global/GlobalStyles";
import * as GlobalConstants from "../../../../Global/GlobalConstants";
import CustomSlider from "../../../Controls/Slider";
import { PlayerTableFilterAction, PlayerTableFilterState } from "../PlayerTableFilterReducer";
import { AnimatedButton } from "../../../Controls";

interface TableFilterPopupProps {
    filterDispatch: (value: PlayerTableFilterAction) => void;
    filterState: PlayerTableFilterState;
    initialPriceRange: number[];
}

const TableFilterPopup = ({ filterDispatch, filterState, initialPriceRange } : TableFilterPopupProps) => {

    const [isPer90, setIsPer90] = useState(filterState.isPer90);
    const [isInWatchlist, setIsInWatchlist] = useState(filterState.isInWatchlist);
    const [priceRange, setPriceRange] = useState(filterState.priceRange);
    const [minuteRange, setMinuteRange] = useState(filterState.minutesRange);

    const clearFunction = () => {
        setIsPer90(false);
        setIsInWatchlist(false);
        setPriceRange(initialPriceRange);
        setMinuteRange([0, 90*38]);

        filterDispatch({type: 'Reset', range: initialPriceRange});
    }

    return (
        <View style={{width: GlobalConstants.width* 0.60, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                <Text style={styles.filterText}>Per 90 (if applicable):</Text>
                <Checkbox value={ isPer90 } hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        color={isPer90 ? GlobalConstants.fieldColor : GlobalConstants.lightColor}
                        onValueChange={ () => setIsPer90(!isPer90)}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                <Text style={styles.filterText}>On Watchlist:</Text>
                <Checkbox value={ isInWatchlist } hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                        color={isInWatchlist ? GlobalConstants.fieldColor : GlobalConstants.lightColor}
                        onValueChange={ () => setIsInWatchlist(!isInWatchlist)}/>
            </View>
            <View style={{flex: 2, padding: 5}}>
                <CustomSlider header={"Price Range:"} minValue={initialPriceRange[0]} maxValue={initialPriceRange[1]} 
                                step={1} isPrice={true} initialRange={priceRange} debounceValue={400}
                                onValueChange={value => setPriceRange(value)}/>
            </View>
            <View style={{flex: 2, padding: 5}}>
                <CustomSlider header={"Minutes Per Game Range:"} minValue={0} maxValue={90 * 38} 
                                step={1} initialRange={minuteRange} debounceValue={400}
                                onValueChange={ value => setMinuteRange(value) }/>
            </View>
            <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                <View style={styles.buttonContainer}>
                    <AnimatedButton buttonFn={() => filterDispatch({type: 'FilterPopupChange', minuteRange: minuteRange, priceRange: priceRange, 
                                                                                               isInWatchlistValue: isInWatchlist, per90Value: isPer90})}>
                        <View style={[globalStyles.baseButton, styles.buttonInnerContainer]}>
                            <Text style={styles.buttonFont}>Apply</Text>
                        </View>
                    </AnimatedButton>
                </View>
                <View style={styles.buttonContainer}>
                    <AnimatedButton buttonFn={clearFunction}>
                        <View style={[globalStyles.baseButton, styles.buttonInnerContainer, {backgroundColor: GlobalConstants.redColor}]}>
                            <Text style={styles.buttonFont}>Clear</Text>
                        </View>
                    </AnimatedButton>
                </View>
            </View>
        </View>
    )
}

export default TableFilterPopup;

const styles = StyleSheet.create({
    filterText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        flex: 1,
        fontWeight: '500'
    },

    buttonContainer: {
        flex: 1, 
        alignContent: 'center', 
        justifyContent: 'center',
    },

    buttonInnerContainer: {
        width: '85%',
        alignSelf: 'center'
    },

    buttonFont: {
        fontSize: GlobalConstants.mediumFont,
        fontWeight: '500',
        color: GlobalConstants.textPrimaryColor,
    }
});