import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { height, width } from "../../Global/GlobalConstants";
import { useAppDispatch } from "../../Store/hooks";
import { openPopup } from "../../Store/popupSlice";
import { AnimatedButton } from "../Controls";

interface ILocationInfo {
    distanceFromRight: number;
    distanceFromTopOrBottom: number;
    arrowDistance: number;
}

interface PopupProps {
    view: JSX.Element;
    isArrowAbove?: boolean;
}

const Popup = ({view, isArrowAbove, children} : PropsWithChildren<PopupProps>) => {

    const dispatch = useAppDispatch();

    const viewRef = useRef<View>(null);
    const [locationInfo, setLocationInfo] = useState({} as ILocationInfo)
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        getAndSetLocationInfo();
    }, [])
    
    const getAndSetLocationInfo = () => {
        viewRef.current?.measure((x, y, width, height, pageX, pageY) => {
            console.log(x, y, width, height, pageX, pageY);
            setLocationInfo({ distanceFromRight: x, distanceFromTopOrBottom: y, arrowDistance: 10});
        });
    }

    const buttonFunction = () => {
        if (viewRef) {
            getAndSetLocationInfo();
            setShowPopup(true);
        }
    }

    useEffect(() => {
        if (showPopup) {
            dispatch(openPopup(
            <View style={[{ position: 'absolute', top: locationInfo.distanceFromTopOrBottom, right: locationInfo.distanceFromRight, backgroundColor: 'pink'}]}>
                { view }
            </View>));
            setShowPopup(false);
        }
    }, [showPopup])

    return (
        <View ref={viewRef}>
            <AnimatedButton buttonFn={buttonFunction}>
                { children }
            </AnimatedButton>
        </View>
    )

    
}

export default Popup;

/* 
! Steps
! 1. make the view with a child work (sizing is correct) DONE
! 2. add function to get location of the button
! 3. add popup with the view in it
*/  