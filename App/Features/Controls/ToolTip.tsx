import React, { useCallback, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View, Text, LayoutChangeEvent, Button, TouchableOpacity } from "react-native";
import { cornerRadius, height, primaryColor, secondaryColor, width } from "../../Global/GlobalConstants";
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
    view: JSX.Element;
}

const ToolTip = ({ distanceForArrowFromRight, distanceFromRight, view, children }: React.PropsWithChildren<toolTipProps>) => {

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
        <View style={{flex: 1, overflow: 'visible', zIndex: 100}}>
            <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center' }} 
                            onPress={() => setIsVisible(true)}>
                { children }
            </TouchableOpacity>
            { isVisible && 
                <>
                    <Pressable style={styles.modalBackground} onPressIn={() => {setIsVisible(false)}} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}/>
                    <View style={[styles.modalView, {right: distanceFromRight}]}>
                        <View style={[styles.arrow, {right: distanceForArrowFromRight}]}/>
                        { view }
                    </View>
                </>
            }
        </View>
        
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        zIndex: 100,
        elevation: 100,
        position: 'absolute',
        top: 50,
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        
    },

    modalBackground: {
        position: 'absolute',
        height: height * 2,
        width: width * 2,
        top: -height,
        left: -width,
        opacity: 0.50,
        zIndex: 100, 
        elevation: 100, 
        backgroundColor: 'black'
    },

    arrow: {
        position: 'absolute',
        top: -14,
        right: 0,
        height: 1,
        width: 5,
        zIndex: 100,
        borderLeftWidth:15,
        borderLeftColor:"transparent",
        borderRightWidth:15,
        borderRightColor:"transparent",
        borderBottomWidth:15,
        borderBottomColor: secondaryColor,
    }

});