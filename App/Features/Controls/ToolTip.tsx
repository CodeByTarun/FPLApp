import React, { useCallback, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, View, Text, LayoutChangeEvent, Button } from "react-native";
import { cornerRadius, secondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";

interface dimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface toolTipProps {
    view: JSX.Element;
}

const ToolTip = (props: React.PropsWithChildren<toolTipProps>) => {

    //const [position, setPosition] = useState([0,0]);
    const [isVisible, setIsVisible] = useState(false);
    const pressableRef = useRef<View>(null);

    const [dimensions, setDimensions] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const getCoordinates = useCallback((event: LayoutChangeEvent) => {
        pressableRef.current?.measure((x, y, width, height, pageX, pageY) => setDimensions({x: pageX, y: pageY, width: width, height: height}))
    }, [])

    return (
        <Pressable style={{ height: '100%', width: '100%', justifyContent: 'center' }} 
                   onPress={() => setIsVisible(true)} 
                   onLayout={(event) => getCoordinates(event)}
                   ref={(pressableRef)}>
            <Modal animationType="fade" transparent={true} visible={isVisible} style={{position: 'absolute'}}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => {setIsVisible(false)}}/>
                <View style={[styles.modalView ,globalStyles.modalShadow, { top: dimensions.y + dimensions.height + 15, right: (width - dimensions.x - dimensions.width - 30) }]}>
                    <View style={styles.arrow}/>
                    { props.view }
                </View>
            </Modal>

            { props.children }

        </Pressable>
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