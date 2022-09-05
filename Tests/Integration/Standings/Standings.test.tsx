import React, { SetStateAction } from "react";
import { render, fireEvent, reduxRender } from "../reduxRender";
import Standings from "../../../App/Features/Standings";
import store from "../../../App/Store/store";
import { changeToDraftTeam, TeamInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { budgetManagerInfo, draftLeagueInfo } from "../../SampleData/Gameweek32Data";

let draftInfo: TeamInfo = { gameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft, liveGameweek: 3 }
let budgetInfo: TeamInfo = { gameweek: 32, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget, liveGameweek: 3 }


test('show draft league if team type is draft and draft league info is present', () => {

    const { queryByTestId } = reduxRender(<Standings teamInfo={draftInfo} draftLeagueInfo={draftLeagueInfo}/>);

    expect(queryByTestId('draftLeagueStandingsList')).toBeTruthy();
    expect(queryByTestId('budgetLeagueStandingsList')).toBeFalsy();

});

test('show budget league if team type is budget and budget league info is present', () => {

    const { queryByTestId } = reduxRender(<Standings teamInfo={budgetInfo} budgetUserInfo={budgetManagerInfo}/>);

    expect(queryByTestId('draftLeagueStandingsList')).toBeFalsy();
    expect(queryByTestId('budgetLeagueList')).toBeTruthy();

});