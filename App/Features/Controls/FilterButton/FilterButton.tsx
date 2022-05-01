import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, View, GestureResponderEvent } from "react-native";
import * as GlobalConstants from "../../../Global/GlobalConstants";
import { Icons } from "../../../Global/Images";
import ToolTip from "../ToolTip/ToolTip";

interface FilterButtonProps {
    view: JSX.Element;
    isArrowAbove: boolean;
}

interface IToolTipInfo {
    x: number;
    y: number;
    arrowDistance: number;
}

const FilterButton = ({ view, isArrowAbove } : FilterButtonProps) => {

    const buttonRef = useRef<TouchableOpacity>(null);
    const [isToolTipVisible, setIsToolTipVisible] = useState(false);
    const [toolTipInfo, setToolTipInfo] = useState({ x: 0, y: 0, arrowDistance: 0 } as IToolTipInfo)

    useEffect(() => {
        setPosition();
    }, [])

    const buttonFunction = useCallback(() => {

        if (buttonRef) {
                setPosition();
            }
            setIsToolTipVisible(true);
    }, [])

    const setPosition = useCallback(() => {
        buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
            let distanceFromRight = GlobalConstants.width - pageX - width;
            let distanceFromTop = isArrowAbove ? pageY + height + 13 : GlobalConstants.height - pageY + height - 18;
            setToolTipInfo({x: distanceFromRight, y: distanceFromTop, arrowDistance: width / 2 - 15});
        });
    }, [buttonRef])

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity ref={buttonRef} testID="imageButton" style={[styles.touchable]} onPress={buttonFunction} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
                <Image style={[styles.icon]} source={Icons['filter']} resizeMode='contain'/>
            </TouchableOpacity>
            <ToolTip distanceFromRight={toolTipInfo.x} distanceFromTop={toolTipInfo.y} distanceForArrowFromRight={toolTipInfo.arrowDistance} isArrowAbove={isArrowAbove}
                     isVisible={isToolTipVisible} setIsVisible={setIsToolTipVisible} view={view}/>
        </View>
    )
}

export default FilterButton;

const styles = StyleSheet.create({

    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 3,
    }, 

    icon: {
        width: '90%',
        height: '90%',
        alignSelf: 'center'
    },
});