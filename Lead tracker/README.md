🎯 Lead Tracker — Chrome Extension

A simple Chrome Extension built with HTML, CSS, and JavaScript to save website URLs and manage useful links directly from the browser.

This project helped me practice JavaScript fundamentals, DOM manipulation, browser APIs, and local storage while building a practical tool.

✨ Features

Save Input: Manually enter and save a website URL.

Save Current Tab: Save the URL of the currently active browser tab.

Persistent Storage: Store leads in localStorage so they remain available after refreshing or reopening the extension.

Dynamic Rendering: Display saved URLs as clickable links.

Open in New Tab: Open a saved lead in a new browser tab.

Delete All Leads: Double-click the Delete All button to remove saved leads.

Simple Interface: Use a clean, lightweight interface with HTML and CSS.

🛠️ Technologies Used

HTML5

CSS3

JavaScript

Chrome Extensions API

Chrome Extension Manifest V3

DOM Manipulation

Browser localStorage

JSON (JSON.stringify() and JSON.parse())

📂 Project Structure

Lead tracker/
├── Chrome_extension.html
├── Chrome_extension.css
├── Chrome_extension.js
├── manifest.json
├── icon.png
└── README.md

⚙️ How It Works

1. Save a Manually Entered URL

The input field collects a URL, and the Save Input button stores it in the myLeads array.

myLeads.push(inputEl.value);

localStorage.setItem(
    "myLeads",
    JSON.stringify(myLeads)
);

2. Save the Current Browser Tab

The Chrome Tabs API retrieves the active tab's URL.

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

The "tabs" permission is declared in manifest.json to support this functionality.

3. Display Saved Leads

The render() function loops through the saved leads and creates clickable links inside the unordered list.

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

4. Keep Leads After Refreshing

JSON.stringify() converts the JavaScript array into a string for storage. JSON.parse() converts that string back into an array when the extension starts.

localStorage.setItem("myLeads", JSON.stringify(myLeads));

let savedLeads = JSON.parse(localStorage.getItem("myLeads"));

5. Delete All Leads

The Delete All button uses a double-click event to clear the saved data and update the interface.

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

Note: localStorage.clear() clears all local storage for the extension's origin, not just myLeads. Using localStorage.removeItem("myLeads") would be safer if the extension stores other data in the future.

🚧 Problems, Solutions & Lessons Learned

These are the key development challenges and concepts demonstrated by this project.

1. Saving Data in the Browser

Challenge: JavaScript arrays exist in memory, so their contents do not automatically persist after a page or popup is closed.

Solution: Use localStorage.setItem() to save the leads and JSON.stringify() to convert the array into a string. Use JSON.parse() to restore it.

What I learned: How to persist and retrieve data in the browser.

2. Rendering Multiple Leads

Challenge: Displaying multiple saved links requires updating the HTML whenever the data changes.

Solution: Create a reusable render(leads) function that loops through the array and displays each lead.

What I learned: How arrays, loops, template literals, and DOM manipulation work together.

3. Accessing the Current Browser Tab

Challenge: A normal webpage cannot directly access Chrome's active-tab information through the Chrome Extensions API.

Solution: Configure the extension's manifest.json, declare the "tabs" permission, and use chrome.tabs.query() to retrieve the active tab.

What I learned: How browser APIs and extension permissions enable functionality beyond a normal webpage.

4. Updating the Interface After Deleting Leads

Challenge: Clearing stored data alone does not automatically clear the displayed links.

Solution: Reset the myLeads array and call render(myLeads) to update the interface.

What I learned: Why application data and the user interface must remain synchronized.

5. Understanding JavaScript Events

Challenge: Different button actions need different event handlers.

Solution: Use "click" for saving leads and "dblclick" for deleting all leads.

What I learned: How event listeners respond to user interactions.

6. Improving Input Validation and Security

Potential improvement: The current code can save an empty input, duplicate URLs, or invalid URLs. It also inserts URL values into innerHTML, which can introduce HTML injection risks.

Solution: Validate URLs before saving, prevent empty or duplicate entries, and create link elements with DOM methods such as document.createElement() and assign their text using textContent. Restrict allowed URL schemes to https: and http:.

What I learned: Why validation and safe DOM manipulation matter in real-world JavaScript applications.

🚀 How to Install and Run

Clone or download the repository.

Open the Lead tracker folder.

Ensure Chrome_extension.html, Chrome_extension.css, Chrome_extension.js, manifest.json, and icon.png are present.

Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode.

Click Load unpacked.

Select the Lead tracker project folder.

Click the extension icon and start saving leads.

📚 What I Learned

By building this project, I practiced:

JavaScript arrays and functions.

DOM selection and manipulation.

Event listeners and callbacks.

Template literals and loops.

JSON serialization and parsing.

Browser local storage.

Chrome Extension APIs and permissions.

Debugging and improving application logic.

Structuring a small, practical JavaScript project.

🔮 Future Improvements
Validate URLs before saving.
Prevent duplicate leads.
Add individual lead deletion.
Add a confirmation step before deleting all leads.
Use safer DOM methods to render URLs.
Improve the user interface and responsive styling.
Add export and import functionality.

👨‍💻 Author:
Abdullah Raihan Akash
GitHub: abdullahraihanakash
Repository: Web-Development

⭐ Built as a hands-on project while learning JavaScript and Chrome Extension development.

Learning by building, debugging, and improving real projects.
