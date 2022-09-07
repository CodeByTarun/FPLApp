import React from "react";
import TeamEmblem from "../../../App/Features/Fixtures/FixtureCard/TeamEmblem";
import TeamData from "./Sample Data/TeamData.json";
import { Team } from "../../../App/Models/FplOverview";
import { Emblems } from "../../../App/Global/Images";
import { reduxRender } from "../reduxRender";

test('dont show team image if team prop is undefined', () => {

    const { queryByTestId } = reduxRender(<TeamEmblem team={undefined}/>)

    expect(queryByTestId('teamImage')).toBeNull();
    expect(queryByTestId('teamText')).toBeNull();
});

test('show team image if team prop is defined', () => {

    const teamData = TeamData as Team;
    
    const { queryByTestId, queryByText } = reduxRender(<TeamEmblem team={teamData}/>)

    expect(queryByTestId('teamImage')).toHaveProp('source', Emblems[3]);
    expect(queryByText('ARS')).toBeDefined();
});

