import React from "react";
import { render } from "../reduxRender";
import FixtureDifficultyList from "../../../App/Features/PlayerStats/PlayerListContainer/PlayerList/FixtureDifficultyList";
import { allFixtures } from "../../SampleData/Fixtures";
import { overview } from "../../SampleData/Overviews";

test('short list', () => {

    const { queryAllByTestId } = render(<FixtureDifficultyList team={20} fixtures={allFixtures} overview={overview} isFullList={false} currentGameweek={33}/>);

    expect(queryAllByTestId('fixtureDifficultyItem')).toHaveLength(3);
});

test('long list', () => {

    const { queryAllByTestId } = render(<FixtureDifficultyList team={20} fixtures={allFixtures} overview={overview} isFullList={false} currentGameweek={33}/>);

    expect(queryAllByTestId('fixtureDifficultyItem')).toBeTruthy();
});