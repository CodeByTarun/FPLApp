import React from "react";
import { render } from "@testing-library/react-native";
import PlayerModal from "../../../App/Modals/PlayerModal";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import { budgetLeaguePicks, draftLeaguePicks, gameweek } from "../LineupView/Gameweek32Data";
import { TeamInfo, TeamTypes } from "../../../App/Store/teamSlice";

let draftInfo: TeamInfo = { gameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, draftInfo, draftOverview, draftLeaguePicks, budgetLeaguePicks);

test('one fixture modal renders correclty', () => {

    const { queryByTestId, queryByText } = render(<PlayerModal overview={overview} fixtures={allFixtures} player={players![0]} teamInfo={draftInfo}/>)

    expect(queryByTestId('closeButton')).toBeTruthy();

});

test('two fixtures modal renders correctly', () => {



});

test('if two fixtures but team type is fixure only show the stats for that game', () => {


    
});