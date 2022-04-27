import React from "react";
import { Text, StyleSheet } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { ToolTip } from "../../../App/Features/Controls";
import '@testing-library/jest-native';

test('if isVisible is false', () => {

    const mockSetIsVisibleFn = jest.fn();

    const { queryByTestId } = render(<ToolTip distanceFromRight={0} distanceFromTop={0} distanceForArrowFromRight={0} isVisible={false} setIsVisible={mockSetIsVisibleFn} view={<></>}/>)

    expect(queryByTestId('background')).toBeDefined();
    expect(queryByTestId('tooltip')).toBeDefined();

});

test('if isVisible is set to true, view exists in tooltip and can close by pressing the background', () => {

    const mockSetIsVisibleFn = jest.fn();

    const { queryByTestId, queryByText } = render(<ToolTip distanceFromRight={0} distanceFromTop={0} distanceForArrowFromRight={0} isVisible={true} setIsVisible={mockSetIsVisibleFn} view={<Text>hello there</Text>}/>)

    expect(queryByTestId('background')).toBeDefined();
    expect(queryByTestId('tooltip')).toBeDefined();
    expect(queryByText('hello there')).toBeDefined();

    fireEvent.press(queryByTestId('background'));
    expect(mockSetIsVisibleFn).toBeCalledTimes(1);
})

describe('testing if the right style is applied to the arrow based on the prop isArrowAbove', () => {

    test('isArrowAbove is true', () => {
        const mockSetIsVisibleFn = jest.fn();

        const { queryByTestId } = render(<ToolTip distanceFromRight={0} distanceFromTop={0} distanceForArrowFromRight={0} isArrowAbove={true} isVisible={true} setIsVisible={mockSetIsVisibleFn} view={<Text>hello there</Text>}/>)
    
        expect(queryByTestId('arrow')).toHaveStyle(styles.above);
    });

    test('isArrowAbove is false', () => {
        const mockSetIsVisibleFn = jest.fn();

        const { queryByTestId } = render(<ToolTip distanceFromRight={0} distanceFromTop={0} distanceForArrowFromRight={0} isArrowAbove={false} isVisible={true} setIsVisible={mockSetIsVisibleFn} view={<Text>hello there</Text>}/>)
    
        expect(queryByTestId('arrow')).toHaveStyle(styles.below);
    });

});

const styles = StyleSheet.create({

    above: {
        top: -14,
    },

    below: {
        bottom: -14,
        transform: [{rotate: "180deg"}]
    },

});