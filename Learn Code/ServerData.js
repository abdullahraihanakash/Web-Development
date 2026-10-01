export const ServerData = [
    { id: 1, type: 'Elephant', nickName: 'Dumbo', country: 'India' },
    { id: 2, type: 'Lion', nickName: 'Simba', country: 'Kenya' },
    { id: 3, type: 'Tiger', nickName: 'Shere Khan', country: 'Bangladesh' },
    { id: 4, type: 'Panda', nickName: 'Po', country: 'China' },
    { id: 5, type: 'Penguin', nickName: 'Skipper', country: 'Antarctica' }
];
 
// Simulates fetching from a database (async, like a real DB call)
export async function getDataFromDB() {
    return ServerData;
}
 