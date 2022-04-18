import React from "react";
import { render } from "../reduxRender";
import InfoModal from "../../../App/Modals/InfoModal";

test('renders correctly', () => {

    const { queryByText, queryByTestId } = render(<InfoModal/>);

    expect(queryByTestId('closeButton')).toBeTruthy();
    expect(queryByText('Credits')).toBeTruthy();
});