import { getStockData } from './fakeStockAPI.js'
//console.log(getStockData())
setInterval(function() {
    const stockData = getStockData()
    renderStockTicker(stockData)
},1500)

let prevPrice = null

function renderStockTicker(stockData) {
    const stockDisplayName = document.getElementById('name')
    const stockDisplaySymbol = document.getElementById('symbol')
    const stockDisplayPrice = document.getElementById('price')
    const stockDisplayPriceIcon = document.getElementById('price-icon')
    const stockDisplayTime = document.getElementById('time')

    const { name,sym,price,time } = stockData
    
    const priceDirectionIcone = price > prevPrice ? 'green.svg' : price < prevPrice ? 'red.svg' : 'gray.svg'
    const priceIconElement = document.createElement('img')
    priceIconElement.src = `svg/${priceDirectionIcone}`
    priceIconElement.alt = 'Price direction icon'
    stockDisplayPriceIcon.innerHTML = ''
    stockDisplayPriceIcon.appendChild(priceIconElement)

    stockDisplayName.innerText = name
    stockDisplaySymbol.innerText = sym
    stockDisplayPrice.innerText = price
    stockDisplayTime.innerText = time
    
    prevPrice = price
    
}
