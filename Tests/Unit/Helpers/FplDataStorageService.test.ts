import AsyncStorage from '@react-native-async-storage/async-storage';
import LeagueInfo, { addUserTeamInfo, editUserTeamInfo, getAllUserTeamInfo, removeUserTeamInfo, changeFavouriteUserTeam } from '../../../App/Helpers/FplDataStorageService'

const firstTeam: LeagueInfo = {
    id: 1,
    name: 'Taddu FC',
    isDraftTeam: true,
    isFavourite: true,
}

const secondTeam: LeagueInfo = {
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
        const result = await getAllUserTeamInfo();
        expect(result).toEqual([] as LeagueInfo[]);
    });
});

describe('addLeagueInfo', () => {
    
    test('add to an empty array', async () => {
        await addUserTeamInfo(firstTeam);
        const result = await getAllUserTeamInfo();
        expect(result).toEqual([firstTeam])
    });

    test('add to array with another one it', async () => {
        await addUserTeamInfo(secondTeam);
        const result = await getAllUserTeamInfo();
        expect(result).toEqual([firstTeam, secondTeam]);
    })

});

describe('editLeagueInfo', () => {

    let  editedTeam = firstTeam;
    firstTeam.isDraftTeam = false;

    test('edit first league', async () => {
        await editUserTeamInfo(editedTeam);
        const result = await getAllUserTeamInfo();
        if (result) {
            expect(result[0].isDraftTeam).toEqual(false);
        }
    });
});

describe('removeLeagueInfo', () => {

    let  editedTeam = firstTeam;
    firstTeam.isDraftTeam = false;

    test('remove second league', async () => {
        await removeUserTeamInfo(secondTeam);
        const result = await getAllUserTeamInfo();
        expect(result).toEqual([editedTeam])
    });

});

describe('changeFavouriteTeam', () => {

    test('set second team as favourite', async ()=> {
        await addUserTeamInfo(secondTeam);
        await changeFavouriteUserTeam(secondTeam);
        const result = await getAllUserTeamInfo();

        if (result) {
            expect(result[0].isFavourite).toEqual(false);
            expect(result[1].isFavourite).toEqual(true);
        }
    });
})

