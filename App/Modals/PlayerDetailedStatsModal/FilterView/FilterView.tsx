import { useTheme } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomSlider from "../../../Features/Controls/Slider";
import { fieldColor, lightColor } from "../../../Global/GlobalConstants";
import { PlayerDetailedStatsModalStyles } from "../PlayerDetailedStatsModalStyles";
import { StatsFilterAction, StatsFilterActionKind, StatsFilterState } from "../StatsFilterReducer";


interface FilterViewProps {
    statsFilterState: StatsFilterState;
    statsFilterDispatch: React.Dispatch<StatsFilterAction>;
    liveGameweek: number;
}

const FilterView = ({statsFilterState, statsFilterDispatch, liveGameweek} : FilterViewProps) => {

    const theme = useTheme();
    const styles = PlayerDetailedStatsModalStyles(theme);

    const [isPer90, setIsPer90] = useState(statsFilterState.isPer90);
    const [gameSpan, setGameSpan] = useState(statsFilterState.gameSpan);

    const changeIsPer90 = () => {
        statsFilterDispatch({ type: StatsFilterActionKind.ChangeIsPer90 });
        setIsPer90(!isPer90);
    }

    const changeGameSpan = (span: number[]) => {
        statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: span });
        setGameSpan(span);
    }

    return (
        <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', marginTop: moderateVerticalScale(10) }}>
                <Text style={[styles.text, { flex: 1 }]}>Per 90 Stats?</Text>
                <Checkbox value={isPer90}
                            color={isPer90 ? fieldColor : lightColor}
                            onValueChange={changeIsPer90} />
            </View>
            <View style={{ marginTop: moderateVerticalScale(10) }}>
                <CustomSlider header="Gameweeks:" minValue={1} maxValue={liveGameweek} step={1}
                                initialRange={statsFilterState.gameSpan}
                                onValueChange={changeGameSpan}/>
            </View>
        </View>
    )
}

export default FilterView;