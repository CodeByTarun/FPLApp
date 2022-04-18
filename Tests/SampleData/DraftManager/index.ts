import { FplDraftGameweekPicks } from '../../../App/Models/FplDraftGameekPicks';
import { FplDraftLeagueInfo } from '../../../App/Models/FplDraftLeagueInfo';
import { FplDraftUserInfo } from '../../../App/Models/FplDraftUserInfo';
import draftLeagueInfoData from './draftleagueinfo.json';
import draftManagerPicksData from './draftmanagerpicks.json';
import draftUserInfoData from './draftuserinfo.json';
import draftPlayerStatusesData from './draftPlayerStatuses.json';
import { FplDraftLeaguePlayerStatuses } from '../../../App/Models/FplDraftLeaguePlayerStatuses';

export const draftLeagueInfo = draftLeagueInfoData as FplDraftLeagueInfo;
export const draftManagerPicks = draftManagerPicksData as FplDraftGameweekPicks;
export const draftUserInfo = draftUserInfoData as FplDraftUserInfo;
export const draftPlayerStatuses = draftPlayerStatusesData as FplDraftLeaguePlayerStatuses;

