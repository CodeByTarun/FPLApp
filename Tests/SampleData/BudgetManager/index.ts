import { FplBudgetLeagueInfo } from '../../../App/Models/FplBudgetLeagueInfo';
import { FplManagerGameweekPicks } from '../../../App/Models/FplManagerGameweekPicks';
import { FplManagerInfo } from '../../../App/Models/FplManagerInfo';
import budgetLeagueData from './budgetleague.json';
import budgetManagerPicksData from './budgetmanagerpicks.json';
import budgetManagerData from './budgetmanagerinfo.json';

const budgetLeague = budgetLeagueData as unknown as FplBudgetLeagueInfo;
const budgetManagerInfo = budgetManagerData as FplManagerInfo;
const budgetManagerPicks = budgetManagerPicksData as FplManagerGameweekPicks;
