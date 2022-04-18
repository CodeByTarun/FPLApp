import { PlayerOverview } from '../../../../../App/Models/FplOverview';
import { FplPlayerSummary } from '../../../../../App/Models/FplPlayerSummary';
import playerOverviewData from './playerOverview.json';
import playerSummmaryData from './playerSummary.json';

export const playerOverview = playerOverviewData as PlayerOverview;
export const playerSummary = playerSummmaryData as FplPlayerSummary;