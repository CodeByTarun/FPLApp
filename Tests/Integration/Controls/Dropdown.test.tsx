// things to test for:
// default value??
// header text shows up
// options all options show up
// when a value is pressed setvalue is called
// test background

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { Dropdown } from "../../../App/Features/Controls";
import "@testing-library/jest-native";

const options = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
]

test('header from props is shown and opening dropdown and closing using close button', () => {

    const mockSetFn = jest.fn();
    const {getByText, getByTestId}  = render(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={'1'} setValue={ mockSetFn }/>);
         
    expect(getByText('Header')).toBeDefined();    
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    expect(getByTestId('dropdownModal')).toHaveProp('visible', true);

    fireEvent.press(getByTestId('closeButton'));
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);
})

test('selected an option and then clear', () => {

    let value = '1';
    const mockSetFn = jest.fn((newValue) => value = newValue);
    const {getByText, getByTestId, rerender }  = render(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
         
    expect(getByText('Header')).toBeDefined();    
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    expect(getByTestId('dropdownModal')).toHaveProp('visible', true);

    fireEvent.press(getByText('2'));
    expect(value).toBe('2'); 
    expect(mockSetFn).toBeCalledTimes(1);

    rerender(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    expect(getByTestId('dropdownModal')).toHaveProp('visible', true);

    fireEvent.press(getByText('Reset'));
    expect(value).toBe('1');
    expect(mockSetFn).toBeCalledTimes(2);

    rerender(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);
});