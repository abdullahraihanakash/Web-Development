export const ServerData = [
    { id: 1, type: 'Elephant', nickName: 'Dumbo', country: 'India' ,continent: 'Asia'  },
    { id: 2, type: 'Lion', nickName: 'Simba', country: 'Kenya' ,continent: 'Africa' },
    { id: 3, type: 'Tiger', nickName: 'Shere Khan', country: 'Bangladesh' ,continent: 'Asia' },
    { id: 4, type: 'Panda', nickName: 'Po', country: 'China' ,continent: 'Asia' },
    { id: 5, type: 'Penguin', nickName: 'Skipper', country: 'Antarctica' ,continent: 'Antarctica' }
];
 
// Simulates fetching from a database (async, like a real DB call)
export async function getDataFromDB() {
    return ServerData;
}
 
