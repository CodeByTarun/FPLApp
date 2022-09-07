import { animated, Globals, useSpring } from "@react-spring/native";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Pressable, View, Text } from "react-native";
import { reduxRender } from "../reduxRender";

const AnimatedView = animated(View);

interface AnimatedButtonTestProps {
    buttonFn: () => void;
}

Globals.assign({
    skipAnimation: true,
})

const AnimatedButtonTest = ({ buttonFn } : AnimatedButtonTestProps) => {

    const [animatedStyle, api] = useSpring(() => { scale: 1 });

    const buttonFunction = () => {

        api.start({
            to: [
                {scale: 0.9},
                {scale: 1}
            ],
            onRest: () => buttonFn(),
        });
    }
    
    return (
        <Pressable testID={'button'} onPress={buttonFunction}>
            <AnimatedView>
                <Text>Hello</Text>
            </AnimatedView>
        </Pressable>
    );
}

test('does pressing the button call the function?', () => {

    const buttonFn = jest.fn();

    const { getByTestId } = reduxRender(<AnimatedButtonTest buttonFn={buttonFn}/>);

    fireEvent.press(getByTestId('button'));

})