import React from "react";
import { reduxRender } from "../reduxRender";
import FixtureDifficultyList from "../../../App/Features/PlayerStats/PlayerListContainer/PlayerList/FixtureDifficultyList";

test('short list', () => {

    const { queryAllByTestId } = reduxRender(<FixtureDifficultyList team={20} isFullList={false}/>);

    expect(queryAllByTestId('fixtureDifficultyItem')).toHaveLength(3);
});

test('long list', () => {

    const { queryAllByTestId } = reduxRender(<FixtureDifficultyList team={20} isFullList={true}/>);

    expect(queryAllByTestId('fixtureDifficultyItem')).toBeTruthy();
});

test('5 fixture list', () => {

    const { queryAllByTestId } = reduxRender(<FixtureDifficultyList team={20} isFullList={false} numberOfFixturesToShow={5}/>);

    expect(queryAllByTestId('fixtureDifficultyItem')).toHaveLength(5);
});