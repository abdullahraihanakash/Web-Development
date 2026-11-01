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

# Lead Tracker কোডের সম্পূর্ণ ব্যাখ্যা

এটি একটি **Chrome Extension**-এর JavaScript কোড। এর কাজ হলো: ইউজার কোনো লিংক (lead) লিখে সেভ করতে পারবে, বর্তমান ট্যাবের লিংক এক ক্লিকে সেভ করতে পারবে, সেভ করা লিংকগুলো তালিকায় দেখতে পারবে, এবং ব্রাউজার বন্ধ করে আবার খুললেও ডেটা থাকবে।

---

## ১. শুরুর ভেরিয়েবলগুলো

```javascript
let myLeads = [];
let oldLeads = [];
```

- `myLeads` একটি খালি অ্যারে। সব লিংক এখানে জমা থাকবে।
- `oldLeads` কোডে কোথাও ব্যবহার হয়নি। এটি অপ্রয়োজনীয়, মুছে ফেললে কোনো সমস্যা হবে না।

```javascript
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
```

`document.getElementById()` দিয়ে HTML-এর এলিমেন্টগুলোকে JavaScript-এ ধরা হচ্ছে, যাতে সেগুলো নিয়ন্ত্রণ করা যায়:

| ভেরিয়েবল | কী | কাজ |
|---|---|---|
| `inputEl` | input ফিল্ড | লিংক লেখার জায়গা |
| `inputBtn` | সেভ বাটন | লিংক সেভ করে |
| `ulEl` | `<ul>` তালিকা | সেভ করা লিংক দেখায় |
| `deleteBtn` | ডিলিট বাটন | সব মুছে ফেলে |
| `tabBtn` | ট্যাব বাটন | বর্তমান ট্যাবের লিংক সেভ করে |

`const` ব্যবহার করা হয়েছে কারণ এই রেফারেন্সগুলো কখনো বদলাবে না।

---

## ২. localStorage থেকে ডেটা ফেরত আনা

```javascript
let lead_From_Loca_Storage = JSON.parse(localStorage.getItem("myLeads"))

if(lead_From_Loca_Storage) {
    myLeads = lead_From_Loca_Storage
    render(myLeads)
}
```

**localStorage** হলো ব্রাউজারের ভেতরের একটি ছোট স্টোরেজ। পেজ রিফ্রেশ বা ব্রাউজার বন্ধ করলেও এখানকার ডেটা মুছে যায় না।

ধাপে ধাপে কী ঘটছে:

1. `localStorage.getItem("myLeads")` দিয়ে `"myLeads"` কী-র মান আনা হচ্ছে।
2. localStorage শুধু **string** রাখতে পারে। তাই ডেটা এভাবে সেভ থাকে: `'["google.com","youtube.com"]'`
3. `JSON.parse()` সেই string-কে আবার আসল **অ্যারেতে** রূপান্তর করে।
4. প্রথমবার ব্যবহারে কিছু সেভ থাকে না, তখন `getItem` দেয় `null`। `if` শর্তে `null` মানে false, তাই ভেতরের কোড চলে না।
5. আগে ডেটা থাকলে সেটি `myLeads`-এ বসিয়ে `render()` দিয়ে স্ক্রিনে দেখানো হয়।

---

## ৩. `render()` ফাংশন

```javascript
function render(leads) {
    let listItems = ""

    for(let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank">    
                    ${leads[i]}
                </a>
            </li>
        `
    }

    ulEl.innerHTML = listItems
}
```

এই ফাংশনের কাজ: অ্যারের সব লিংককে HTML তালিকা বানিয়ে স্ক্রিনে দেখানো।

- `leads` হলো প্যারামিটার, যে অ্যারে পাঠানো হবে সেটিই এখানে আসবে।
- `listItems = ""` একটি খালি string, এতে HTML জমা হবে।
- `for` লুপ অ্যারের প্রতিটি আইটেমের উপর একবার করে ঘোরে।
- **Template literal** (backtick দিয়ে লেখা `` ` ``) ব্যবহার করা হয়েছে। এতে `${...}` দিয়ে সরাসরি ভেরিয়েবলের মান বসানো যায় এবং একাধিক লাইনে HTML লেখা যায়।
- `target="_blank"` মানে লিংকে ক্লিক করলে নতুন ট্যাবে খুলবে।
- শেষে `ulEl.innerHTML = listItems` দিয়ে পুরো তালিকা একবারে `<ul>`-এর ভেতরে বসানো হয়।

**`=` কেন, `+=` নয়?** প্রতিবার পুরো তালিকা নতুন করে আঁকা হয়। `+=` দিলে পুরনো আইটেম আবার যোগ হয়ে ডুপ্লিকেট দেখাত।

**Hoisting:** `render()` ফাংশনটি ফাইলের নিচে লেখা হলেও উপরে ডাকা যাচ্ছে। কারণ `function` declaration JavaScript-এ আগেই মেমোরিতে লোড হয়ে যায়, একে hoisting বলে।

উপরের বড় কমেন্ট করা অংশে `render()`-এর দুটি পুরনো সংস্করণ আছে, একটি সাধারণ লুপ দিয়ে আর একটি লুপ ছাড়া। সেগুলো শেখার সময় চেষ্টা করা হয়েছিল, এখন কাজ করছে না। বর্তমান সংস্করণটিই সবচেয়ে ভালো।

---

## ৪. সেভ বাটন (`inputBtn`)

```javascript
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    render(myLeads);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    console.log(localStorage.getItem("myLeads"))    
})
```

`addEventListener("click", ...)` মানে: বাটনে ক্লিক হলে ভেতরের ফাংশন চলবে।

ক্লিকের পর ক্রমানুসারে:

1. `myLeads.push(inputEl.value)`: input-এ যা লেখা আছে তা অ্যারের শেষে যোগ হয়।
2. `render(myLeads)`: নতুন লিংকসহ তালিকা আবার আঁকা হয়।
3. `inputEl.value = ""`: input ফিল্ড খালি হয়ে যায়, পরের লিংক লেখার জন্য।
4. `JSON.stringify(myLeads)`: অ্যারে থেকে string বানায়, কারণ localStorage শুধু string নেয়।
5. `localStorage.setItem(...)`: সেই string সেভ হয়।
6. `console.log(...)`: শুধু ডিবাগিংয়ের জন্য, সেভ হয়েছে কিনা কনসোলে দেখা যায়।

---

## ৫. ডিলিট বাটন (`deleteBtn`)

```javascript
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
```

- `"dblclick"` মানে **ডাবল ক্লিক** করলে তবেই চলবে। ভুল করে সব ডেটা মুছে ফেলা আটকানোর জন্য এটি ভালো কৌশল।
- `localStorage.clear()` ব্রাউজারের সেভ করা সব ডেটা মুছে দেয়।
- `myLeads = []` মেমোরির অ্যারেও খালি করে। এটি না করলে পরের সেভে পুরনো লিংকগুলো আবার ফিরে আসত।
- `render(myLeads)` খালি অ্যারে পাঠানোয় `listItems` খালি থাকে, ফলে স্ক্রিনের তালিকাও খালি হয়ে যায়।

---

## ৬. ট্যাব বাটন (`tabBtn`), এটি সবচেয়ে গুরুত্বপূর্ণ অংশ

```javascript
tabBtn.addEventListener("click", function() {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        function(tabs) {
            let activeTab = tabs[0];
            let currentUrl = activeTab.url;

            myLeads.push(currentUrl);

            localStorage.setItem("myLeads", JSON.stringify(myLeads));

            render(myLeads);
        }
    );
});
```

এখানে **Chrome Extension API** ব্যবহার হয়েছে, যা সাধারণ ওয়েবসাইটে কাজ করে না।

- `chrome.tabs.query()` দিয়ে Chrome-কে জিজ্ঞেস করা হচ্ছে: "কোন ট্যাব আমার শর্ত মেলায়?"
- `{ active: true, currentWindow: true }` হলো শর্ত: যে ট্যাবটি **এখন সক্রিয়** এবং **বর্তমান উইন্ডোতে** আছে।
- Chrome উত্তর হিসেবে একটি **অ্যারে** (`tabs`) ফেরত দেয়। সক্রিয় ট্যাব একটিই, তাই `tabs[0]` নিলেই হয়।
- `activeTab.url` থেকে সেই ট্যাবের URL পাওয়া যায়।
- এরপর আগের মতোই `push` করে, localStorage-এ সেভ করে এবং `render()` চালায়।
- দ্বিতীয় আর্গুমেন্টটি একটি **callback function**। Chrome ট্যাবের তথ্য খুঁজে পেলে তারপর এটি চালায়। এটি asynchronous, তাই ফলাফলের জন্য callback লাগে।

**এটি কাজ করার জন্য** `manifest.json`-এ `"permissions": ["tabs"]` (অথবা `"activeTab"`) থাকতে হবে। না থাকলে `activeTab.url` পাওয়া যাবে না।

---

## ৭. পুরো প্রোগ্রামের প্রবাহ

```
এক্সটেনশন খোলা
      ↓
localStorage-এ ডেটা আছে? ──হ্যাঁ──→ myLeads-এ লোড → render()
      ↓ না
খালি অবস্থায় অপেক্ষা
      ↓
ইউজার কিছু করলে:
  ├─ SAVE INPUT  → push → render → input খালি → localStorage-এ সেভ
  ├─ SAVE TAB    → ট্যাবের URL আনা → push → সেভ → render
  └─ DELETE ALL  (ডাবল ক্লিক) → clear → অ্যারে খালি → render
```

---

## ৮. কোডটি কেন কাজ করছে (সারসংক্ষেপ)

1. **একটি সত্যের উৎস:** `myLeads` অ্যারেই সব ডেটার মূল জায়গা। `render()` সবসময় এটি দেখে স্ক্রিন আঁকে, তাই স্ক্রিন ও ডেটা সবসময় মিলে থাকে।
2. **localStorage + JSON:** `stringify` দিয়ে সেভ আর `parse` দিয়ে লোড করায় অ্যারের গঠন অক্ষত থাকে।
3. **Event listener:** বাটনে ক্লিকের মতো ঘটনায় নির্দিষ্ট কোড চলে।
4. **Chrome API:** সক্রিয় ট্যাবের URL পাওয়ার ক্ষমতা দেয়।
5. **ফাংশনের পুনর্ব্যবহার:** একই `render()` তিনটি জায়গায় ব্যবহার হয়েছে, কোড পুনরাবৃত্তি কমেছে।

---

## ৯. উন্নতির কিছু পরামর্শ

- `oldLeads` ভেরিয়েবলটি মুছে দিন, এটি ব্যবহার হচ্ছে না।
- খালি input সেভ হওয়া আটকাতে `if(inputEl.value)` চেক যোগ করতে পারেন।
- `lead_From_Loca_Storage` নামটি JavaScript-এর প্রচলিত রীতি অনুযায়ী `leadsFromLocalStorage` লিখলে ভালো (camelCase)।
- ইউজারের লেখা লিংক সরাসরি `innerHTML`-এ বসানো হচ্ছে। বড় প্রজেক্টে এটি নিরাপত্তা ঝুঁকি (XSS) তৈরি করতে পারে, তাই সেখানে `textContent` ব্যবহার করা ভালো।
- লিংকে `http://` বা `https://` না থাকলে (যেমন `google.com`) `href` সেটিকে এক্সটেনশনের ভেতরের আপেক্ষিক পথ হিসেবে ধরবে এবং ঠিকমতো খুলবে না। তাই লিংক লেখার সময় পুরো URL দেওয়া উচিত।

কোনো নির্দিষ্ট অংশ আরও গভীরভাবে বুঝতে চাইলে বলুন, যেমন callback, async, বা localStorage কীভাবে কাজ করে।
