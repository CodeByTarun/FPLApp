import React from "react";
import { render } from "../reduxRender";
import InfoModal from "../../../App/Modals/InfoModal";
import { ModalTypes } from "../../../App/Store/modalSlice";

test('renders correctly', () => {

    const { queryByText, queryByTestId } = render(<InfoModal modalInfo={{modalType: ModalTypes.InfoModal}}/>);

    expect(queryByTestId('closeButton')).toBeTruthy();
    expect(queryByText('Credits')).toBeTruthy();
});