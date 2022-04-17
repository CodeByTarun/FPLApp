import { FplDraftGameweekPicks } from '../../../../App/Models/FplDraftGameekPicks';
import { FplDraftUserInfo } from '../../../../App/Models/FplDraftUserInfo';
import { FplGameweek } from '../../../../App/Models/FplGameweek';
import { FplManagerGameweekPicks } from '../../../../App/Models/FplManagerGameweekPicks';
import { FplManagerInfo } from '../../../../App/Models/FplManagerInfo';
import budgetLeaguePicksData from './budgetLeaguePicks.json';
import budgetManagerInfoData from './budgetManagerInfo.json';
import draftLeaguePicksData from './draftLeaguePicks.json';
import draftManagerInfoData from './draftManagerInfo.json';
import gameweekData from './gameweek.json';

export const budgetLeaguePicks = budgetLeaguePicksData as FplManagerGameweekPicks;
export const budgetManagerInfo = budgetManagerInfoData as FplManagerInfo;
export const draftLeaguePicks = draftLeaguePicksData as FplDraftGameweekPicks;
export const draftManagerInfo = draftManagerInfoData as FplDraftUserInfo;
export const gameweek = gameweekData as FplGameweek;