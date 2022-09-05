import React from "react";
import TabButton from "../../../App/Features/BottomTabs/TabButton";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Icons } from "../../../App/Global/Images";

test('tab button displays correct info and fn is called on press', async () => {

    const buttonFn = jest.fn();

    const { getByTestId, queryByText, rerender } = render(<TabButton fn={buttonFn} imageName={"calendar"} header={"Overview"}/>);

    expect(queryByText('Overview')).toBeTruthy();
    expect(getByTestId('tabIcon')).toHaveProp('source', Icons['calendar']);
    expect(getByTestId('tabButton')).toBeEnabled();

    fireEvent.press(getByTestId('tabButton'));

    await waitFor(() => expect(buttonFn).toBeCalledTimes(1));

    rerender(<TabButton fn={buttonFn} imageName={"calendar"} header={"Overview"} isDisabled={true}/>);

    expect(getByTestId('tabButton')).toBeDisabled();

});
