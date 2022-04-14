import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { CloseButton } from "../../../App/Features/Controls";

test('close button activates close function', () => {
    
    const closeFnMock = jest.fn();

    const { getByTestId } = render(<CloseButton closeFunction={closeFnMock}/>)

    fireEvent.press(getByTestId('closeButton'));

    expect(closeFnMock).toHaveBeenCalledTimes(1);


});