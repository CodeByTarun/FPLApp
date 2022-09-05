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
import { reduxRender } from "../reduxRender";
import store from "../../../App/Store/store";
import { mockedNavigation } from "../../jestSetupFile";

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

test('test if dropdown button shows the right content and that content changes when the value changes and pressing the button does the appropriate action', async () => {

    const customStore = store;
    const mockSetFn = jest.fn();

    const { getByText }  = reduxRender(<Dropdown defaultValue={"1"} headerText={"Header"} options={options} value={'1'} setValue={ mockSetFn }/>, customStore);
         
    expect(getByText('Header')).toBeTruthy();;    
    expect(getByText('1')).toBeTruthy();

    expect(customStore.getState().modal.mutableView.view).toBeFalsy();

    fireEvent.press(getByText('◣'));
    await waitFor(() => expect(mockedNavigation).toBeCalledWith('MutableModal'));
    
    expect(customStore.getState().modal.mutableView.view).toBeTruthy();
});

