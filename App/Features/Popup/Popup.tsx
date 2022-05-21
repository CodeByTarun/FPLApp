import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { AnimatedButton } from "../Controls";



interface PopupProps {
    view: JSX.Element;
    isArrowAbove?: boolean;
}

const Popup = ({view, isArrowAbove, children} : PropsWithChildren<PopupProps>) => {

    return (
        <View>
            <AnimatedButton buttonFn={() => {}}>
                { children }
            </AnimatedButton>
        </View>
    )

    
}

export default Popup;

/* 
! Steps
! 1. make the view with a child work (sizing is correct)
! 2. add function to get location of the button
! 3. add popup with the view in it
*/ 