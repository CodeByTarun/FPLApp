// things to test for:
// default value??
// header text shows up
// options all options show up
// when a value is pressed setvalue is called
// test background

import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react-native";
import { Dropdown } from "../../../App/Features/Controls";
import "@testing-library/jest-native";
import { Globals } from "@react-spring/native";

const options = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
]
Globals.assign({
    skipAnimation: true,
})

test('header from props is shown and opening dropdown and closing using close button', async () => {

    const mockSetFn = jest.fn();
    const {queryAllByText, getByText, getByTestId}  = render(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={'1'} setValue={ mockSetFn }/>);
         
    expect(queryAllByText('Header')).toHaveLength(2);    
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    await waitFor(() => expect(getByTestId('dropdownModal')).toHaveProp('visible', true));

    fireEvent.press(getByTestId('closeButton'));
    await waitFor(() => expect(getByTestId('dropdownModal')).toHaveProp('visible', false));
})

test('selected an option and then clear', async () => {

    let value = '1';
    const mockSetFn = jest.fn((newValue) => value = newValue);
    const {getByText, getByTestId, queryAllByText, rerender }  = render(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
         
    expect(queryAllByText('Header')).toHaveLength(2);    
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    await waitFor(() => expect(getByTestId('dropdownModal')).toHaveProp('visible', true));

    fireEvent.press(getByText('2'));
    await waitFor(() => expect(mockSetFn).toBeCalledTimes(1));

    await waitFor(() => expect(value).toBe('2')); 

    rerender(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);

    fireEvent.press(getByText('◣'));
    await waitFor(() => expect(getByTestId('dropdownModal')).toHaveProp('visible', true));

    fireEvent.press(getByText('Reset'));
    await waitFor(() => expect(value).toBe('1')); 
    await waitFor(() => expect(mockSetFn).toBeCalledTimes(2));

    rerender(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={value} setValue={ mockSetFn }/>);
    expect(getByTestId('dropdownModal')).toHaveProp('visible', false);
});