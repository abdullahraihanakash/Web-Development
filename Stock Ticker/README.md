# 📈 Stock Ticker — Simulated Price Tracker

A stock ticker web application built with HTML, CSS, and JavaScript. It displays a stock name, ticker symbol, simulated price, price direction indicator, and last-updated time.

This project focuses on JavaScript ES modules, periodic updates, DOM manipulation, and CSS animations.

> **Note:** This project uses randomly generated mock stock prices. It is not connected to a live financial market data source.

## ✨ Features

- **Automatic Price Updates:** Refresh the displayed mock price every 1.5 seconds.
- **Stock Information:** Display the stock name and ticker symbol.
- **Price Direction Indicator:** Show a green, red, or gray icon based on price movement.
- **Last Updated Time:** Display the time of the latest update.
- **Animated Ticker Tape:** Show a continuously scrolling market-style ticker at the top.
- **Modern Dark Theme:** Use a dark background with green, red, and amber accents.
- **Responsive Design:** Adjust the ticker card and price typography for smaller screens.
- **Reduced Motion Support:** Disable the ticker animation when the user prefers reduced motion.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- DOM Manipulation
- `setInterval()`
- Named exports and imports
- CSS animations and keyframes
- Responsive CSS and media queries

## 📂 Project Structure

```text
Stock Ticker/
├── index.html
├── stockTicker.css
├── stockTicker.js
├── fakeStockAPI.js
├── svg/
│   ├── green.svg
│   ├── red.svg
│   └── gray.svg
└── README.md
```

*Adjust filenames in this example if your actual project uses different names.*

## ⚙️ How It Works

### 1. Generate Mock Stock Data

The `fakeStockAPI.js` file exports a function that returns the stock name, symbol, randomly generated price, and current time.

```javascript
export function getStockData() {
    return {
        name: 'QtechAI',
        sym: 'QTA',
        price: Number((Math.random() * 3).toFixed(2)),
        time: new Date().toLocaleTimeString()
    };
}
```

### 2. Import the Function Using ES Modules

The main JavaScript file imports `getStockData()` from the mock API module.

```javascript
import { getStockData } from './fakeStockAPI.js';
```

The HTML file loads the main JavaScript file as a module:

```html
<script type="module" src="stockTicker.js" defer></script>
```

### 3. Update the Price Automatically

The `setInterval()` function requests new mock data every 1,500 milliseconds (1.5 seconds).

```javascript
setInterval(function() {
    const stockData = getStockData();
    renderStockTicker(stockData);
}, 1500);
```

### 4. Display the Stock Information

The `renderStockTicker()` function updates the stock name, symbol, price, and timestamp using DOM methods. It also compares the current price with the previous price to choose an appropriate direction icon.

- Green: Price increased.
- Red: Price decreased.
- Gray: Price remained unchanged or no previous price is available.

### 5. Animate the Ticker Tape

CSS keyframes move the ticker tape horizontally, creating a market-dashboard appearance. The `prefers-reduced-motion` media query respects users who prefer reduced animation.

## 🚧 Development Challenges and Solutions

The following are common challenges demonstrated by this project. Keep the descriptions that match the issues you actually encountered.

### 1. Importing Functions from Another JavaScript File

**Challenge:** Importing a function from another file can fail if the import path or module configuration is incorrect.

**Solution:** Use a named export in `fakeStockAPI.js` and import it with the correct relative path:

```javascript
import { getStockData } from './fakeStockAPI.js';
```

Ensure the HTML loads the script with `type="module"`.

**What I learned:** How JavaScript modules, named exports, imports, and relative file paths work.

### 2. Updating the UI Automatically

**Challenge:** The displayed price will not change periodically if the update function is called only once.

**Solution:** Use `setInterval()` to call the data function and rendering function repeatedly.

**What I learned:** How timed callbacks can update a user interface periodically.

### 3. Comparing Current and Previous Prices

**Challenge:** The application needs to identify whether a price has increased or decreased.

**Solution:** Store the previous price in a variable and compare it with the new price before updating that variable.

```javascript
let prevPrice = null;

const direction = prevPrice === null
    ? 'unchanged'
    : price > prevPrice
        ? 'up'
        : price < prevPrice
            ? 'down'
            : 'unchanged';

prevPrice = price;
```

**What I learned:** How comparison operators, conditional expressions, and state variables can track changes.

### 4. Displaying Dynamic Icons

**Challenge:** Changing the price direction requires updating the corresponding icon in the interface.

**Solution:** Create an image element, set its `src` to the appropriate SVG file, and insert it into the icon container.

**What I learned:** How JavaScript can update images and other HTML elements dynamically.

### 5. Creating a Smooth Scrolling Animation

**Challenge:** A ticker tape needs continuous horizontal movement without disrupting the layout.

**Solution:** Use Flexbox, `white-space: nowrap`, `width: max-content`, and CSS `@keyframes` to create the scrolling effect.

**What I learned:** How CSS animations and layout properties can create a dynamic interface without JavaScript.

### 6. Making the Layout Responsive

**Challenge:** A large price display or ticker card may not fit properly on smaller screens.

**Solution:** Use flexible widths, `box-sizing: border-box`, and media queries to adjust padding and font sizes.

**What I learned:** How responsive CSS helps maintain usability across different screen sizes.

## 🚀 How to Run

1. Download or clone the repository.
2. Open the Stock Ticker project folder in VS Code.
3. Make sure the HTML, CSS, JavaScript, and SVG files are in the correct locations.
4. Open `index.html` using a local development server, such as the VS Code Live Server extension.
5. Watch the simulated stock price update automatically.

Using a local server is recommended when working with JavaScript ES modules.

## 📚 What I Learned

Through this project, I practiced:

- Importing and exporting JavaScript functions.
- Working with ES modules.
- Using `setInterval()` for periodic updates.
- Generating and displaying mock data.
- Updating HTML elements through DOM manipulation.
- Comparing previous and current values.
- Dynamically changing SVG icons.
- Creating CSS animations and responsive layouts.
- Organizing a small frontend project into separate files.

## 🔮 Future Improvements

- Connect to a real stock market API.
- Display actual market prices with appropriate data-source attribution.
- Add error handling and loading states.
- Format prices consistently with currency symbols and decimal places.
- Add percentage changes and market trend indicators.
- Show historical prices using a chart.
- Allow users to select different stock symbols.
- Improve accessibility and test the layout on more screen sizes.

## 👨‍💻 Author

**Abdullah Raihan Akash**

- GitHub: [abdullahraihanakash](https://github.com/abdullahraihanakash)
- Repository: [Web-Development](https://github.com/abdullahraihanakash/Web-Development)

---

⭐ Built as a hands-on project while learning JavaScript and frontend development.

*Learn by building. Improve by debugging. Grow through practice.*
