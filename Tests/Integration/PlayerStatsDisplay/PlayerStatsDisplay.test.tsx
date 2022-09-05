import React from "react";
import { render, fireEvent, reduxRender, waitFor } from "../reduxRender";
import PlayerStatsDisplay from "../../../App/Features/PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { draftLeaguePicks, gameweek32, budgetManagerInfo, draftManagerInfo, budgetLeaguePicks } from "../../SampleData/Gameweek32Data";
import { BudgetInfo, DraftInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { Icons } from "../../../App/Global/Images";
import store from "../../../App/Store/store";
import { mockedNavigation } from "../../jestSetupFile";

let draftInfo: DraftInfo = { gameweek: 32, liveGameweek: 30, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, draftInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);


test('testing all views for a draft team', async () => {

    const customStore = store;

    const { getByTestId, queryByTestId, getAllByTestId, getByText, rerender } = reduxRender(<PlayerStatsDisplay player={players![0]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={0}/>, customStore);

    expect(getByTestId('playerStatsDisplayButton')).toBeEnabled();

    expect(getByTestId('statsViewContainer')).toBeTruthy();
    expect(getByTestId('playerStatsJersey')).toBeTruthy();
    expect(getAllByTestId('saves')).toHaveLength(1);
    expect(getByTestId('scoreAndNameContainer')).toBeTruthy();

    rerender(<PlayerStatsDisplay player={players![3]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={0}/>);

    expect(getByTestId('injuryIndicatorPlayerStats')).toBeTruthy();
    expect(getByTestId('injuryIndicatorImagePlayerStats')).toHaveProp('source', Icons['out']);

    rerender(<PlayerStatsDisplay player={players![10]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={0}/>);

    expect(getByTestId('dreamTeamPlayerStats')).toBeTruthy();
    expect(getByTestId('dreamTeamIconPlayerStats')).toHaveProp('source', Icons['dreamteam']);


    expect(queryByTestId('infoCardContainerPlayerStats')).toBeFalsy();
    expect(queryByTestId('fixtureDifficultyPlayerStatsView')).toBeFalsy();

    rerender(<PlayerStatsDisplay player={players![10]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={1}/>);
    
    expect(queryByTestId('infoCardContainerPlayerStats')).toBeTruthy();
    expect(queryByTestId('fixtureDifficultyPlayerStatsView')).toBeFalsy();
    expect(getByText('Sel.')).toBeTruthy();
    expect(queryByTestId('infoCardNamePlayerStats')).toBeTruthy();

    rerender(<PlayerStatsDisplay player={players![10]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={2}/>);

    expect(queryByTestId('infoCardContainerPlayerStats')).toBeTruthy();
    expect(queryByTestId('fixtureDifficultyPlayerStatsView')).toBeFalsy();
    expect(getByText('PTS')).toBeTruthy();
    expect(queryByTestId('infoCardNamePlayerStats')).toBeTruthy();

    rerender(<PlayerStatsDisplay player={players![10]} overview={overview} teamInfo={draftInfo} fixtures={allFixtures} viewIndex={3}/>);

    expect(queryByTestId('infoCardContainerPlayerStats')).toBeTruthy();
    expect(getAllByTestId('fixtureDifficultyPlayerStatsView')).toHaveLength(5);
    expect(queryByTestId('infoCardNamePlayerStats')).toBeTruthy();

    fireEvent.press(queryByTestId('playerStatsDisplayButton'));
    await waitFor(() => expect(mockedNavigation).toBeCalledTimes(1));
    expect(mockedNavigation).toBeCalledWith('PlayerModal');
    expect(customStore.getState().modal.playerData).toBeTruthy();

});

test('testing captaincy when a budget team', () => {

    let budgetInfo: BudgetInfo = { gameweek: 32, liveGameweek: 30, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget }

    const players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, budgetInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

    const { getByTestId, queryByTestId, getAllByTestId, getByText, rerender } = reduxRender(<PlayerStatsDisplay player={players![4]} overview={overview} teamInfo={budgetInfo} fixtures={allFixtures} viewIndex={0}/>)

    expect(getByTestId('captainAndViceCaptainPlayerStats')).toBeTruthy();
    expect(getByText('C')).toBeTruthy();

    rerender(<PlayerStatsDisplay player={players![13]} overview={overview} teamInfo={budgetInfo} fixtures={allFixtures} viewIndex={0}/>);

    expect(getByTestId('captainAndViceCaptainPlayerStats')).toBeTruthy();
    expect(getByText('V')).toBeTruthy();

    rerender(<PlayerStatsDisplay player={players![11]} overview={overview} teamInfo={budgetInfo} fixtures={allFixtures} viewIndex={0}/>);

    expect(queryByTestId('captainAndViceCaptainPlayerStats')).toBeFalsy();
});

