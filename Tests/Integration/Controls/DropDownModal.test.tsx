import React from "react";
import DropDownModal from "../../../App/Features/Controls/Dropdown/DropDownModal";
import store from "../../../App/Store/store";
import { mockedNavigationGoBack } from "../../jestSetupFile";
import { fireEvent, reduxRender, waitFor } from "../reduxRender";

const options = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
];

beforeAll(() =>{
    mockedNavigationGoBack.mockClear();
})

test('All components are present and pressing the buttons perfore the correct actions', async () => {

    const customStore = store;
    const mockFn = jest.fn();

    const { getByText } = reduxRender(<DropDownModal headerText={"Header"} defaultValue={"1"} options={options} setValue={mockFn}/>, customStore)

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('6')).toBeTruthy();

    fireEvent.press(getByText('5'));
    await waitFor(() => expect(mockFn).toBeCalledTimes(1));
    expect(mockFn).toBeCalledWith('5');
    expect(mockedNavigationGoBack).toBeCalledTimes(1);
    
    fireEvent.press(getByText('Reset'));
    await waitFor(() => expect(mockFn).toBeCalledTimes(2));
    expect(mockFn).toBeCalledWith('1');
    expect(mockedNavigationGoBack).toBeCalledTimes(2);

});