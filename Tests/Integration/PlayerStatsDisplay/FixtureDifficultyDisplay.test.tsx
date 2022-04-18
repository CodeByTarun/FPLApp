import React from "react";
import { render } from "../reduxRender";
import FixtureDifficultyDisplay from "../../../App/Features/PlayerStatsDisplay/FixtureDifficultyDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { draftLeaguePicks, gameweek, budgetLeaguePicks } from "../LineupView/Gameweek32Data";
import { BudgetInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";

let budgetInfo: BudgetInfo = { gameweek: 32, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget }

const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, budgetInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

test('show next five fixtures', () => {

    const { getAllByTestId } = render(<FixtureDifficultyDisplay overview={overview} fixtures={allFixtures} player={players![0]} currentGameweek={33}/>)

    expect(getAllByTestId('fixtureDifficultyPlayerStatsView')).toHaveLength(5);
});

test('show next 2 if second last gameweek', () => {
    const { getAllByTestId } = render(<FixtureDifficultyDisplay overview={overview} fixtures={allFixtures} player={players![0]} currentGameweek={36}/>)

    expect(getAllByTestId('fixtureDifficultyPlayerStatsView')).toHaveLength(2);
});


