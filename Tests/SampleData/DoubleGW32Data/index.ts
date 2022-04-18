import { FplDraftGameweekPicks } from '../../../App/Models/FplDraftGameekPicks';
import { FplFixture } from '../../../App/Models/FplFixtures';
import { FplGameweek } from '../../../App/Models/FplGameweek';
import draftGameweekPicksData from './draftGameweekPicks.json';
import gameweekData from './gameweek.json';
import singleFixtureForDoubleGWPlayerData from './singleFixtureForDoubleGWPlayer.json';

export const doubleGameweek32DraftPicks = draftGameweekPicksData as FplDraftGameweekPicks;
export const doubleGameweek32 = gameweekData as FplGameweek;
export const singleFixtureForDoubleGWPlayer = singleFixtureForDoubleGWPlayerData as FplFixture;