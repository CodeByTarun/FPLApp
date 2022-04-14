import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { CustomButton } from "../../../App/Features/Controls";

let buttonFnMock = jest.fn();

test('enabled button pressed triggers button function', () => {
    const { getByTestId } = render(<CustomButton image={"filter"} buttonFunction={buttonFnMock} />)

    fireEvent.press((getByTestId('imageButton')));

    expect(buttonFnMock).toHaveBeenCalledTimes(1);
});

test('disabled button pressed does not trigger function', () => {
    const { getByTestId } = render(<CustomButton image={"filter"} buttonFunction={buttonFnMock} isDisabled={true} />)

    fireEvent.press((getByTestId('imageButton')));

    expect(buttonFnMock).toHaveBeenCalledTimes(0);

});