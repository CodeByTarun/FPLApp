import React from "react";
import { render } from "../reduxRender";
import PlayerModal from "../../../App/Modals/PlayerModal";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { budgetLeaguePicks, draftLeaguePicks, fixtures, gameweek32 } from "../../SampleData/Gameweek32Data";
import { TeamInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { Emblems } from "../../../App/Global/Images";
import { doubleGameweek32, doubleGameweek32DraftPicks, singleFixtureForDoubleGWPlayer } from "../../SampleData/DoubleGW32Data";
import { ModalTypes } from "../../../App/Store/modalSlice";

let draftInfo: TeamInfo = { gameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

test('one fixture modal renders correctly', () => {

    let players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview, draftInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

    const { queryByTestId, queryByText } = render(<PlayerModal overview={overview} fixtures={fixtures} modalInfo={{modalType: ModalTypes.PlayerModal, player:players![0]}} teamInfo={draftInfo}/>);

    expect(queryByTestId('closeButton')).toBeTruthy();

    expect(queryByText('José Malheiro de Sá')).toBeTruthy();

    const image = queryByTestId('homeJerseyFixturePlayerStatsView');

    //jerseys
    expect(queryByTestId('homeJerseyFixturePlayerStatsView')).toHaveProp('source', Emblems[4]);
    expect(queryByTestId('awayJerseyFixturePlayerStatsView')).toHaveProp('source', Emblems[39]);

    // score
    expect(queryByText('1')).toBeTruthy();
    expect(queryByText('2')).toBeTruthy();

    //headers
    expect(queryByText('Stat')).toBeTruthy();
    expect(queryByText('Value')).toBeTruthy();
    expect(queryByText('Points')).toBeTruthy();

    //stats
    expect(queryByText('Minutes')).toBeTruthy();
    expect(queryByText('90')).toBeTruthy();
    expect(queryByText('Saves')).toBeTruthy();
    expect(queryByText('3')).toBeTruthy();

    //button
    expect(queryByText('More Info')).toBeTruthy();
});

test('two fixtures modal renders correctly', () => {

    let players = GetPlayerGameweekDataSortedByPosition(doubleGameweek32, overview, draftInfo, draftOverview, doubleGameweek32DraftPicks, budgetLeaguePicks);

    const { queryAllByTestId, queryByText } = render(<PlayerModal overview={overview} fixtures={fixtures} modalInfo={{modalType: ModalTypes.PlayerModal, player:players![9]}} teamInfo={draftInfo}/>);

    expect(queryByText('Dominic Calvert-Lewin')).toBeTruthy();
    
    expect(queryAllByTestId('fixturePlayerStatsContainer')).toHaveLength(2);

});

test('if two fixtures but team type is fixure only show the stats for that game', () => {

    let fixtureInfo: TeamInfo = {fixture: singleFixtureForDoubleGWPlayer, gameweek: 31, isHome: true, teamType: TeamTypes.Fixture};

    let players = GetPlayerGameweekDataSortedByPosition(doubleGameweek32, overview, draftInfo, draftOverview, doubleGameweek32DraftPicks, budgetLeaguePicks);

    const { queryAllByTestId } = render(<PlayerModal overview={overview} fixtures={fixtures} modalInfo={{modalType: ModalTypes.PlayerModal, player:players![9]}} teamInfo={fixtureInfo}/>);

    expect(queryAllByTestId('fixturePlayerStatsContainer')).toHaveLength(1);
});