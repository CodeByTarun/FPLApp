import { FplPlayerSummary } from '../../../App/Models/FplPlayerSummary';
import playerSummaryData from './playerSummary.json';
import playerOverviewData from './playerOverview.json';
import { PlayerOverview } from '../../../App/Models/FplOverview';

export const playerSummary = playerSummaryData as FplPlayerSummary;
export const playerOverview = playerOverviewData as PlayerOverview;
