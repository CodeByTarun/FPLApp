import React from "react";
import { AnimatedButton } from "../../../App/Features/Controls";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

test('enabled button press triggers button function', async () => {

    let mockFn = jest.fn();

    const { getByTestId } = render(<AnimatedButton buttonFn={mockFn}/>);

    expect(getByTestId('animatedButton')).toBeEnabled();

    fireEvent.press((getByTestId('animatedButton')));
    expect(getByTestId('animatedButton')).toBeDisabled();
    await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(getByTestId('animatedButton')).toBeEnabled());    

});

test('is disabled when property is set to that', async () => {

    let mockFn = jest.fn();

    const { getByTestId } = render(<AnimatedButton buttonFn={mockFn} disabled={true}/>);

    expect(getByTestId('animatedButton')).toBeDisabled();
});