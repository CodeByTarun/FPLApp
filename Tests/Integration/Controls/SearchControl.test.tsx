import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchControl } from "../../../App/Features/Controls";
import '@testing-library/jest-native';

test('search control has placeholder text and calls onChangeTextFunction when typed in', () => {

    let value = '';
    const mockOnChangeTextFn = jest.fn(text => value = text);

    const { getByTestId, getByPlaceholderText, rerender } = render(<SearchControl value={value} onChangeTextFunction={mockOnChangeTextFn} placeHolderText={"Search..."}/>);

    expect(getByPlaceholderText('Search...')).toBeDefined();
    fireEvent.changeText(getByTestId('search'), 'hello');

    expect(mockOnChangeTextFn).toHaveBeenCalledTimes(1);

    rerender(<SearchControl value={value} onChangeTextFunction={mockOnChangeTextFn} placeHolderText={"Search..."}/>);

    expect((getByTestId('search'))).toHaveProp('value', 'hello');
});