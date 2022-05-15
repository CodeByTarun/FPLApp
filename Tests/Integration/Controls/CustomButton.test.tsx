import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware";
import { render, fireEvent } from "@testing-library/react-native";
import React from "react";
import { CustomButton } from "../../../App/Features/Controls";

test('enabled button pressed triggers button function', () => {

    let mockFn = jest.fn();

    const { getByTestId } = render(<CustomButton image={"filter"} buttonFunction={mockFn} />)

    fireEvent.press((getByTestId('imageButton')));

    expect(mockFn).toHaveBeenCalledTimes(1);
});

test('disabled button pressed does not trigger function', () => {

    let mockFn = jest.fn();
    
    const { getByTestId } = render(<CustomButton image={"filter"} buttonFunction={mockFn} isDisabled={true} />)

    fireEvent.press((getByTestId('imageButton')));

    expect(mockFn).toHaveBeenCalledTimes(0);

});

