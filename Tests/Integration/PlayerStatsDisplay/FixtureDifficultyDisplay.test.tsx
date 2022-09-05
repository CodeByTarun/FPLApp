import React from "react";
import { reduxRender, render } from "../reduxRender";
import FixtureDifficultyDisplay from "../../../App/Features/PlayerStatsDisplay/FixtureDifficultyDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { draftLeaguePicks, gameweek32, budgetLeaguePicks } from "../../SampleData/Gameweek32Data";
import { BudgetInfo, setLiveGameweek, TeamTypes } from "../../../App/Store/teamSlice";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import store from "../../../App/Store/store";

let budgetInfo: BudgetInfo = { gameweek: 32, liveGameweek: 30, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget }

const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, budgetInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

test('show next five fixtures', () => {

    const { getAllByTestId } = reduxRender(<FixtureDifficultyDisplay overview={overview} fixtures={allFixtures} player={players![0]}/>)

    expect(getAllByTestId('fixtureDifficultyPlayerStatsView')).toHaveLength(5);
});

test('show next 2 if second last gameweek', () => {

    const customStore = store;
    customStore.dispatch(setLiveGameweek(36));

    const { getAllByTestId } = reduxRender(<FixtureDifficultyDisplay overview={overview} fixtures={allFixtures} player={players![0]}/>, customStore);

    expect(getAllByTestId('fixtureDifficultyPlayerStatsView')).toHaveLength(2);
});


