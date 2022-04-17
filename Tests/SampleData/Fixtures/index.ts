import { FplFixture } from '../../../App/Models/FplFixtures';
import allFixturesData from './allfixture.json';
import finishedFixtureData from './FinishedFixture.json';
import liveFixtureData from './LiveFixture.json';
import liveFixturesData from './livefixtures.json';
import upcomingFixtureData from './UpcomingFixture.json';

export const allFixtures = allFixturesData as FplFixture[];
export const finishedFixture = finishedFixtureData as FplFixture;
export const liveFixture = liveFixtureData as FplFixture;
export const liveFixtures = liveFixturesData as FplFixture[];
export const upcomingFixture = upcomingFixtureData as FplFixture;
