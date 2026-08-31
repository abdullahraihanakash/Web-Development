export function getStockData() {
    return {
        name: 'QtechAI',
        sym: 'QTA',
        price: Number((Math.random()*3).toFixed(2)),
        time: new Date().toLocaleTimeString()
    }
}

