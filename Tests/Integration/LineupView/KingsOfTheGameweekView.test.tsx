import React from "react";
import { render } from "../reduxRender";
import KingsOfTheGameweekView from "../../../App/Features/LineupView/Lineup/KingsOfTheGameweekView";
import { overview } from "../../SampleData/Overviews";

test('check if all ui elements are present and that the players are pressable as well', () => {

    const { getByTestId, getAllByTestId, getByText } = render(<KingsOfTheGameweekView overviewData={overview}/>)

    expect(getByTestId('kingScrollView')).toBeTruthy();
    expect(getAllByTestId('kingPlayerButton')[0]).toBeEnabled();
    expect(getByText('Torres')).toBeTruthy();
})