import React from "react";
import { render } from "../../reduxRender";
import GameweekOverviewModal from "../../../../App/Modals/GameweekOverviewModal";
import { overview } from "../../../SampleData/Overviews";
import store from "../../../../App/Store/store";
import { changeGameweek } from "../../../../App/Store/teamSlice";
import { ModalTypes } from "../../../../App/Store/modalSlice";

test('gameweek overview modal renders correctly', () => {

    const customStore = store;
    store.dispatch(changeGameweek(32));

    const { queryAllByTestId, queryByTestId, queryByText } = render(<GameweekOverviewModal overview={overview} modalInfo={{modalType: ModalTypes.GameweekOverviewModal}}/>, customStore)

    expect(queryByTestId('closeButton')).toBeTruthy();
    
    expect(queryByText('Gameweek 32 Summary')).toBeTruthy();
    expect(queryByText('Average Points')).toBeTruthy();
    expect(queryByText('Highest Points')).toBeTruthy();

    expect(queryAllByTestId('playerViewButton')).toHaveLength(5);
    expect(queryByText('Most Selected')).toBeTruthy();
    expect(queryByText('Most Transferred')).toBeTruthy();
    expect(queryByText('Top Player')).toBeTruthy();
    expect(queryByText('Most Captained')).toBeTruthy();
    expect(queryByText('Most Vice Captained')).toBeTruthy();
});