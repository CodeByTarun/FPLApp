import AsyncStorage from "@react-native-async-storage/async-storage";

//#region UserTeams
export default interface UserTeamInfo {
    id: number,
    name: string,
    isDraftTeam: boolean,
    isFavourite: boolean,
}

export async function getAllUserTeamInfo() {
    try {
        const jsonValue = await AsyncStorage.getItem('leagues');
        return jsonValue != null ? JSON.parse(jsonValue) as UserTeamInfo[] : [] as UserTeamInfo[];
    } catch(e) {
        console.log('error has occured');// error
    }
}

export async function addUserTeamInfo(teamInfo: UserTeamInfo) {
    try {
        let allTeamInfo = await getAllUserTeamInfo();
        
        if (allTeamInfo !== undefined && allTeamInfo.length > 0) {
            allTeamInfo.push(teamInfo);
            await setUserTeams(allTeamInfo);
        } 
        else if (allTeamInfo !== undefined) {
            teamInfo.isFavourite = true;
            await setUserTeams([teamInfo]);
        }        
    } catch (e) {
        console.log('error has occured');
    }
}

export async function editUserTeamInfo(editedTeam: UserTeamInfo) {
    try {
        let allTeamInfo = await getAllUserTeamInfo();

        if (allTeamInfo) {

            let index = allTeamInfo.findIndex(teamInfo => teamInfo.id === editedTeam.id);
            allTeamInfo[index] = editedTeam;

            await setUserTeams(allTeamInfo);
        } 

    } catch (e) {
        console.log('error has occured');
    }
}

export async function removeUserTeamInfo(teamToRemove: UserTeamInfo) {
    try {
        let allTeamInfo = await getAllUserTeamInfo();
        
        if (allTeamInfo) {

            let filteredList = allTeamInfo.filter(teamInfo => teamInfo.id !== teamToRemove.id)

            if (!filteredList.some(team => team.isFavourite === true) && filteredList.length > 0) {
                filteredList[0].isFavourite = true;
            }

            await setUserTeams(filteredList);
        }
        
    } catch(e) {
        console.log('error has occured');
    }
}

export async function changeFavouriteUserTeam(teamToFavourite: UserTeamInfo) {
    try {
        let allTeamInfo = await getAllUserTeamInfo();

        if (allTeamInfo) {

            allTeamInfo.find(team => team.isFavourite == true)!.isFavourite = false;
            allTeamInfo.find(team => team.id === teamToFavourite.id)!.isFavourite = true;
            
            await setUserTeams(allTeamInfo);
        }
    } catch(e) {
        console.log('error has occured');
    }
}

async function setUserTeams(allTeamInfo: UserTeamInfo[]) {
    try{
        const jsonValue = JSON.stringify(allTeamInfo);
        await AsyncStorage.setItem('leagues', jsonValue);
    } catch(e) {
        console.log('error has occured');
    }
}

//#endregion

//#region Player Watchlist
export interface PlayersWatchlist {
    playerIds: number[],
}

export async function setPlayersWatchlist(watchlist: PlayersWatchlist) {
    try{
        const jsonValue = JSON.stringify(watchlist);
        await AsyncStorage.setItem('watchlist', jsonValue);
    } catch(e) {
        console.log('error has occured');
    }
}

export async function getPlayersWatchlist() { 
    try {
        const jsonValue = await AsyncStorage.getItem('watchlist');
        return jsonValue != null ? JSON.parse(jsonValue) as PlayersWatchlist : {playerIds: []} as PlayersWatchlist;
    } catch(e) {
        console.log('error has occured');// error
    }
}

export async function addPlayerToWatchList(id: number) {
    try {
        let watchlist = await getPlayersWatchlist();

        if (watchlist !== undefined) {
            watchlist.playerIds.push(id);
            await setPlayersWatchlist(watchlist);
        }       
    } catch (e) {
        console.log('error has occured');
    }
}

export async function removePlayerFromWatchlist(id: number) {
    try {
        let watchlist = await getPlayersWatchlist();

        if (watchlist !== undefined) {
            let newWatchlist: PlayersWatchlist = {
                playerIds: watchlist?.playerIds.filter(playerId => playerId !== id),
            }
            await setPlayersWatchlist(newWatchlist);
        }
    } catch (e) {
        console.log('error has occured');
    }
}

//#endregion

export async function clearAsyncStorage() {
    AsyncStorage.clear();
}

