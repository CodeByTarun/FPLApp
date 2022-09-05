import React from "react";
import { render } from "../reduxRender";
import SettingsModal from "../../../App/Modals/SettingsModal";

test('renders correctly', () => {

    const { queryByText, queryByTestId } = render(<SettingsModal/>);

    expect(queryByText('Theme')).toBeTruthy();
    expect(queryByText('Info')).toBeTruthy();

});