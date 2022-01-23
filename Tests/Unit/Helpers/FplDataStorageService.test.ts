import AsyncStorage from '@react-native-async-storage/async-storage';
import { findConfigFile } from 'typescript';
import LeagueInfo, { addLeagueInfo, changeFavouriteTeam, editLeagueInfo, getAllLeagueInfo, removeLeagueInfo } from '../../../App/Helpers/FplDataStorageService'

const firstLeague: LeagueInfo = {
    id: 1,
    name: 'Taddu FC',
    isDraftTeam: true,
    isFavourite: true,
}

const secondLeague: LeagueInfo = {
    id: 2,
    name: 'LukWhosBack',
    isDraftTeam: true,
    isFavourite: false,
}

afterAll(async () => {
    await AsyncStorage.clear();
});

describe('getAllLeagueInfo', () => {

    test('if no data return an empty array', async () => {
        const result = await getAllLeagueInfo();
        expect(result).toEqual([] as LeagueInfo[]);
    });
});

describe('addLeagueInfo', () => {
    
    test('add to an empty array', async () => {
        await addLeagueInfo(firstLeague);
        const result = await getAllLeagueInfo();
        expect(result).toEqual([firstLeague])
    });

    test('add to array with another one it', async () => {
        await addLeagueInfo(secondLeague);
        const result = await getAllLeagueInfo();
        expect(result).toEqual([firstLeague, secondLeague]);
    })

});

describe('editLeagueInfo', () => {

    let  editedLeague = firstLeague;
    firstLeague.isDraftTeam = false;

    test('edit first league', async () => {
        await editLeagueInfo(editedLeague);
        const result = await getAllLeagueInfo();
        if (result) {
            expect(result[0].isDraftTeam).toEqual(false);
        }
    });
});

describe('removeLeagueInfo', () => {

    let  editedLeague = firstLeague;
    firstLeague.isDraftTeam = false;

    test('remove second league', async () => {
        await removeLeagueInfo(secondLeague);
        const result = await getAllLeagueInfo();
        expect(result).toEqual([editedLeague])
    });

});

describe('changeFavouriteTeam', () => {

    test('set second team as favourite', async ()=> {
        await addLeagueInfo(secondLeague);
        await changeFavouriteTeam(secondLeague);
        const result = await getAllLeagueInfo();

        if (result) {
            expect(result[0].isFavourite).toEqual(false);
            expect(result[1].isFavourite).toEqual(true);
        }
    });
})
