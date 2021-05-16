import axios from 'axios';
import { Character } from '../interfaces/character';
import { getNumberFromString } from '../utils/regex';

const CHARACTER_URL = 'https://www.anapioficeandfire.com/api/characters';
const HOUSE_URL = 'https://anapioficeandfire.com/api/houses/';

export const getCharactersBy = async (params: object) => {

  try {
    return await axios.get(CHARACTER_URL, { params }).then((response) => {
      const characters: Character[] = [];

      response.data.map((person: any) => {
        const aliases = person.aliases.join(', ');
        const personName = person.name;
        const birthDate = person.born && getNumberFromString(person.born);
        const deathDate = person.died && getNumberFromString(person.died);
        const age = birthDate ? deathDate - birthDate : undefined;

        const alive = person.died ? (
          `No, died at ${age ? age : 'unknown'} years old`
        ) : 'Yes';

        const houseIDs: any = [];
        person.allegiances.map((house: string) => {
          houseIDs.push(getNumberFromString(house));
        })

        const name = personName ? (
          aliases ? personName + ', ' + aliases : personName
        ) : aliases;

        const cleanedCharacter: Character = {
          character: name,
          alive,
          gender: person.gender || 'Unknown',
          culture: person.culture || 'Unknown',
          allegiances: houseIDs,
          books: person.books.length,
        };

        return characters.push(cleanedCharacter);
      });

      return characters;
    });
  } catch (err) {
    //
  }


}

export const getHouseByID = async (houseID: number) => {
  try {
    return await axios.get(HOUSE_URL + houseID).then((response) => {
      const house = response.data;
      return {
        name: house.name,
        region: house.region,
        coatOfArms: house.coatOfArms,
        words: house.words,
        titles: house.titles.join('; '),
        seats: house.seats.join('; '),
        hasDiedOut: !!house.diedOut,
        hasOverlord: !!house.overlord,
        cadetBranches: house.cadetBranches.length,
      }
    });
  } catch (err) {
    //
  }
}

