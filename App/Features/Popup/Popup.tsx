import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { height, width } from "../../Global/GlobalConstants";
import { useAppDispatch } from "../../Store/hooks";
import { openPopup } from "../../Store/popupSlice";
import { AnimatedButton } from "../Controls";
import Arrow from "../Controls/Arrow";

interface ILocationInfo {
    distanceFromRight: number;
    distanceFromTopOrBottom: number;
    arrowDistance: number;
}

interface PopupProps {
    view: JSX.Element;
    isArrowAbove?: boolean;
    arrowDistance?: number;
}

const Popup = ({view, isArrowAbove = true, arrowDistance = 0, children} : PropsWithChildren<PopupProps>) => {

    const dispatch = useAppDispatch();

    const viewRef = useRef<View>(null);
    const [locationInfo, setLocationInfo] = useState({} as ILocationInfo)
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        getAndSetLocationInfo();
    }, [])
    
    const getAndSetLocationInfo = () => {
        viewRef.current?.measure((x, y, widthComponent, heightComponent, pageX, pageY) => {
            console.log(x, y, widthComponent, heightComponent, pageX, pageY, width);
            let horizontalDistance = width - pageX - x;
            let verticalDistance = isArrowAbove ? pageY : pageY + heightComponent;
            setLocationInfo({ distanceFromRight: horizontalDistance, distanceFromTopOrBottom: verticalDistance, arrowDistance: arrowDistance});
        });
    }

    // arrow below: pageY + height

    const buttonFunction = () => {
        if (viewRef) {
            getAndSetLocationInfo();
            setShowPopup(true);
        }
    }

    useEffect(() => {
        if (showPopup) {
            dispatch(openPopup(
            <View style={[{ position: 'absolute', right: locationInfo.distanceFromRight}, 
                          isArrowAbove ? {bottom: locationInfo.distanceFromTopOrBottom} : {top: locationInfo.distanceFromTopOrBottom}]}>
                {isArrowAbove ?? <Arrow distanceFromRight={locationInfo.arrowDistance}/>}
                { view }
                {!isArrowAbove ?? <Arrow isArrowAbove={false} distanceFromRight={locationInfo.arrowDistance}/>}
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
! 2. add function to get location of the button DONE
! 3. add popup with the view in it
*/  