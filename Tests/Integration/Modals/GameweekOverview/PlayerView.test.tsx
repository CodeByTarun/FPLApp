import React from "react";
import { render } from "../../reduxRender";
import PlayerView from "../../../../App/Modals/GameweekOverviewModal/PlayerView";
import { overview } from "../../../SampleData/Overviews";

test('renders correctly and button is enabled', () => {

    const { queryByText, queryByTestId } = render(<PlayerView overview={overview} header={"Most Points"} id={22}/>)

    expect(queryByText('Most Points')).toBeTruthy();
    expect(queryByText('Saka')).toBeTruthy();
    expect(queryByText('2 Points')).toBeTruthy();
    expect(queryByTestId('playerViewButton')).toBeEnabled();
    expect(queryByTestId('playerViewJersey')).toBeTruthy();

});

test('if no id doesnt render', () => {

    const { queryByTestId } = render(<PlayerView overview={overview} header={"Most Points"} id={null}/>)

    expect(queryByTestId('playerViewButton')).toBeFalsy();

})