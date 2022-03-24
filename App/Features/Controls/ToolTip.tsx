import React, { useCallback, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View, Text, LayoutChangeEvent, Button, TouchableOpacity } from "react-native";
import { cornerRadius, primaryColor, secondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";

interface dimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface toolTipProps {
    distanceFromRight: number,
    distanceForArrowFromRight: number,
    distanceFromTop? : number,
    view: JSX.Element;
}

const ToolTip = ({ distanceForArrowFromRight, distanceFromRight, view, distanceFromTop = 0, children }: React.PropsWithChildren<toolTipProps>) => {

    const [isVisible, setIsVisible] = useState(false);
    const pressableRef = useRef<TouchableOpacity>(null);

    const [dimensions, setDimensions] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const getCoordinates = useCallback((event: LayoutChangeEvent) => {
        pressableRef.current?.measure((x, y, width, height, pageX, pageY) => setDimensions({x: pageX, y: pageY, width: width, height: height}));
    }, [])

    return (
        <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', zIndex: 10 }} 
                   onPress={() => setIsVisible(true)} 
                   onLayout={(event) => getCoordinates(event)}
                   ref={(pressableRef)}>
            <Modal animationType="fade" transparent={true} visible={isVisible}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => {setIsVisible(false)}} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}/>
                <View style={[styles.modalView ,
                              globalStyles.modalShadow, 
                              { top: dimensions.y + dimensions.height + 15 + distanceFromTop, 
                                right: (width - dimensions.x - dimensions.width - distanceFromRight) }]}>
                    <View style={[styles.arrow, {right: distanceForArrowFromRight}]}/>
                    { view }
                </View>
            </Modal>

            { children }

        </TouchableOpacity>
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        position: 'absolute',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
    },

    arrow: {
        position: 'absolute',
        top: -15,
        right: 30,
        height: 1,
        width: 5,
        borderLeftWidth:15,
        borderLeftColor:"transparent",
        borderRightWidth:15,
        borderRightColor:"transparent",
        borderBottomWidth:15,
        borderBottomColor: secondaryColor,
    }

});