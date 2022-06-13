import { createContext } from "react";
import { FplFixture } from "./Models/FplFixtures";
import { FplOverview } from "./Models/FplOverview";

interface FplDataBaseContextValue {
    overview: FplOverview | undefined;
    fixtures: FplFixture[] | undefined;
  }

export const FplBaseDataContext = createContext<FplDataBaseContextValue>({ overview: undefined, fixtures: undefined });
