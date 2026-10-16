# 🎯 Lead Tracker — Chrome Extension

A simple Chrome Extension built with HTML, CSS, and JavaScript to save website URLs and manage useful links directly from the browser.

This project helped me practice JavaScript fundamentals, DOM manipulation, browser APIs, and local storage while building a practical tool.

## ✨ Features

- **Save Input:** Manually enter and save a website URL.
- **Save Current Tab:** Save the URL of the currently active browser tab.
- **Persistent Storage:** Store leads in `localStorage` so they remain available after refreshing or reopening the extension.
- **Dynamic Rendering:** Display saved URLs as clickable links.
- **Open Links in a New Tab:** Open a saved lead in a new browser tab.
- **Delete All Leads:** Double-click the Delete All button to remove saved leads.
- **Simple Interface:** A clean, lightweight interface built with HTML and CSS.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Chrome Extensions API
- Chrome Extension Manifest V3
- DOM Manipulation
- Browser `localStorage`
- JSON (`JSON.stringify()` and `JSON.parse()`)

## 📂 Project Structure

```text
Lead tracker/
├── Chrome_extension.html
├── Chrome_extension.css
├── Chrome_extension.js
├── manifest.json
├── icon.png
└── README.md
```

## ⚙️ How It Works

### 1. Save a Manually Entered URL

The input field collects a URL, and the Save Input button stores it in the `myLeads` array.

```javascript
myLeads.push(inputEl.value);

localStorage.setItem(
    "myLeads",
    JSON.stringify(myLeads)
);
```

### 2. Save the Current Browser Tab

The Chrome Tabs API retrieves the active tab's URL.

```javascript
chrome.tabs.query(
    { active: true, currentWindow: true },
    function(tabs) {
        let currentUrl = tabs[0].url;
        myLeads.push(currentUrl);

        localStorage.setItem(
            "myLeads",
            JSON.stringify(myLeads)
        );

        render(myLeads);
    }
);
```

The `"tabs"` permission is declared in `manifest.json` to support this functionality.

### 3. Display Saved Leads

The `render()` function loops through the saved leads and creates clickable links inside the unordered list.

```javascript
function render(leads) {
    let listItems = "";

    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}
```

### 4. Keep Leads After Refreshing

`JSON.stringify()` converts the JavaScript array into a string for storage. `JSON.parse()` converts that string back into an array when the extension starts.

```javascript
localStorage.setItem("myLeads", JSON.stringify(myLeads));

let savedLeads = JSON.parse(localStorage.getItem("myLeads"));
```

### 5. Delete All Leads

The Delete All button uses a double-click event to clear the saved data and update the interface.

```javascript
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});
```

**Note:** `localStorage.clear()` clears all local storage for the extension's origin, not just `myLeads`. Using `localStorage.removeItem("myLeads")` is safer if the extension stores other data in the future.

## 🚧 Development Challenges and Solutions

These are common challenges for this type of project. Keep the descriptions that match the problems you actually encountered and the solutions implemented in your code.

### 1. Saving Data in the Browser

**Challenge:** JavaScript arrays exist in memory, so their contents do not automatically persist after a page or popup is closed.

**Solution:** Use `localStorage.setItem()` to save the leads and `JSON.stringify()` to convert the array into a string. Use `JSON.parse()` to restore it.

**What I learned:** How to persist and retrieve data in the browser.

### 2. Rendering Multiple Leads

**Challenge:** Displaying multiple saved links requires updating the HTML whenever the data changes.

**Solution:** Create a reusable `render(leads)` function that loops through the array and displays each lead.

**What I learned:** How arrays, loops, template literals, and DOM manipulation work together.

### 3. Accessing the Current Browser Tab

**Challenge:** A normal webpage cannot directly access Chrome's active-tab information through the Chrome Extensions API.

**Solution:** Configure `manifest.json`, declare the `"tabs"` permission, and use `chrome.tabs.query()` to retrieve the active tab.

**What I learned:** How browser APIs and extension permissions enable functionality beyond a normal webpage.

### 4. Updating the Interface After Deleting Leads

**Challenge:** Clearing stored data alone does not automatically clear the displayed links.

**Solution:** Reset the `myLeads` array and call `render(myLeads)` to update the interface.

**What I learned:** Why application data and the user interface must remain synchronized.

### 5. Understanding JavaScript Events

**Challenge:** Different button actions need different event handlers.

**Solution:** Use `"click"` for saving leads and `"dblclick"` for deleting all leads.

**What I learned:** How event listeners respond to user interactions.

### 6. Input Validation and Safer Rendering

**Potential improvement:** The current code can save an empty input, duplicate URLs, or invalid URLs. It also inserts URL values into `innerHTML`, which can introduce HTML injection risks.

**Solution:** Validate URLs before saving, prevent empty or duplicate entries, and create link elements with DOM methods such as `document.createElement()` and assign their text using `textContent`. Allow only `https:` and `http:` URL schemes.

**What I learned:** Why validation and safe DOM manipulation matter in real-world JavaScript applications.

## 🚀 How to Install

1. Clone or download the repository.
2. Open the `Lead tracker` folder.
3. Ensure the HTML, CSS, JavaScript, manifest, and icon files are present.
4. Open Google Chrome and navigate to `chrome://extensions/`.
5. Enable **Developer mode**.
6. Click **Load unpacked**.
7. Select the `Lead tracker` project folder.
8. Click the extension icon and start saving leads.

## 📚 What I Learned

Through this project, I practiced:

- Selecting and manipulating DOM elements.
- Handling click and double-click events.
- Working with JavaScript arrays and loops.
- Reading values from HTML input fields.
- Rendering dynamic content.
- Understanding browser storage.
- Learning how browser APIs extend JavaScript functionality.
- Debugging and solving programming problems.
- Structuring a small JavaScript project.

## 🔮 Future Improvements

- Validate URLs before saving.
- Prevent duplicate leads.
- Add edit and delete functionality for individual leads.
- Add confirmation before deleting all leads.
- Use safer DOM methods to render URLs.
- Improve the interface and responsive styling.
- Add search, export, and import functionality.

## 👨‍💻 Author

**Abdullah Raihan Akash**

- GitHub: [abdullahraihanakash](https://github.com/abdullahraihanakash)
- Repository: [Web-Development](https://github.com/abdullahraihanakash/Web-Development)

---

⭐ Built as a hands-on project while learning JavaScript and Chrome Extension development.

*Learning by building, debugging, and improving real projects.*
