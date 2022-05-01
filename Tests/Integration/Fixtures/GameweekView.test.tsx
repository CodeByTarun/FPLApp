import React from "react";
import { render } from "../reduxRender";
import { overview } from "../../SampleData/Overviews";
import GameweekView from "../../../App/Features/Fixtures/GameweekView";

test('test if all gameweeks are in modal and other elements are rendered', () => {

    const mockFn = jest.fn();

    const { queryByText, queryAllByTestId } = render(<GameweekView isVisible={true} setIsVisible={mockFn} liveGameweek={31} overview={overview}/>);

    expect(queryByText('Gameweeks')).toBeTruthy();
    expect(queryByText('Current Gameweek')).toBeTruthy();
    expect(queryAllByTestId('gameweeksItem')).toHaveLength(38);
});