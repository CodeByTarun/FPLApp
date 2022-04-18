import React from "react";
import { render } from "../reduxRender";
import GameweekModal from "../../../App/Modals/GameweekModal";
import { overview } from "../../SampleData/Overviews";

test('test if all gameweeks are in modal and other elements are rendered', () => {

    const { queryByText, queryAllByTestId } = render(<GameweekModal overview={overview} isVisible={true}/>);

    expect(queryByText('Gameweeks')).toBeTruthy();
    expect(queryByText('Current Gameweek')).toBeTruthy();
    expect(queryAllByTestId('gameweeksItem')).toHaveLength(38);
});