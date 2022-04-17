import { FplDraftGameweekPicks } from '../../../App/Models/FplDraftGameekPicks';
import { FplDraftLeagueInfo } from '../../../App/Models/FplDraftLeagueInfo';
import { FplDraftUserInfo } from '../../../App/Models/FplDraftUserInfo';
import draftLeagueInfoData from '../../SampleData/DraftManager/draftleagueinfo.json';
import draftManagerPicksData from '../../SampleData/DraftManager/draftmanagerpicks.json';
import draftUserInfoData from '../../SampleData/DraftManager/draftuserinfo.json';

export const draftLeagueInfo = draftLeagueInfoData as FplDraftLeagueInfo;
export const draftManagerPicks = draftManagerPicksData as FplDraftGameweekPicks;
export const draftUserInfo = draftUserInfoData as FplDraftUserInfo;

