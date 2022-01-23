import AsyncStorage from "@react-native-async-storage/async-storage";

export default interface LeagueInfo {
    id: number,
    name: string,
    isDraftTeam: boolean,
    isFavourite: boolean,
}

export async function getAllLeagueInfo() {
    try {
        const jsonValue = await AsyncStorage.getItem('leagues');
        return jsonValue != null ? JSON.parse(jsonValue) as LeagueInfo[] : [] as LeagueInfo[];
    } catch(e) {
        console.log('error has occured');// error
    }
}


export async function addLeagueInfo(leagueInfo: LeagueInfo) {
    try {
        let allLeagueInfo = await getAllLeagueInfo();
        
        if (allLeagueInfo !== undefined && allLeagueInfo.length > 0) {
            allLeagueInfo.push(leagueInfo);
            await setLeagues(allLeagueInfo);
        } 
        else if (allLeagueInfo !== undefined) {
            leagueInfo.isFavourite = true;
            await setLeagues([leagueInfo]);
        }        
    } catch (e) {
        console.log('error has occured');
    }
}

export async function editLeagueInfo(editedLeague: LeagueInfo) {
    try {
        let allLeagueInfo = await getAllLeagueInfo();

        if (allLeagueInfo) {

            let index = allLeagueInfo.findIndex(leagueInfo => leagueInfo.id === editedLeague.id);
            allLeagueInfo[index] = editedLeague;

            await setLeagues(allLeagueInfo);
        } 

    } catch (e) {
        console.log('error has occured');
    }
}

export async function removeLeagueInfo(leagueToRemove: LeagueInfo) {
    try {
        let allLeagueInfo = await getAllLeagueInfo();
        
        if (allLeagueInfo) {

            let filteredList = allLeagueInfo.filter(leagueInfo => leagueInfo.id !== leagueToRemove.id)

            await setLeagues(filteredList);
        }
        
    } catch(e) {
        console.log('error has occured');
    }
}

export async function changeFavouriteTeam(leagueToFavourite: LeagueInfo) {
    try {
        let allLeagueInfo = await getAllLeagueInfo();

        if (allLeagueInfo) {

            allLeagueInfo.find(league => league.isFavourite == true)!.isFavourite = false;
            allLeagueInfo.find(league => league.id === leagueToFavourite.id)!.isFavourite = true;
            
            await setLeagues(allLeagueInfo);
        }
    } catch(e) {
        console.log('error has occured');
    }
}

async function setLeagues(allLeagueInfo: LeagueInfo[]) {
    try{
        const jsonValue = JSON.stringify(allLeagueInfo);
        await AsyncStorage.setItem('leagues', jsonValue);
    } catch(e) {
        console.log('error has occured');
    }
}