let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")



//localStorage.clear() // clear local storage
let lead_From_Loca_Storage = JSON.parse(localStorage.getItem("myLeads"))
//console.log(lead_From_Loca_Storage)

if(lead_From_Loca_Storage) {
    myLeads = lead_From_Loca_Storage
    render(myLeads)
}

/* function render(leads) {    // function to render the leads in the ul element 
    let listItems = ""

    for(let i = 0; i < myLeads.length; i++) {
    //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";  // adding the value of the input field to the ul element and use HTML tags in JavaScript 

    // Alternative way to add the value of the input field to the ul element and use HTML tags in JavaScript
    //const li = document.createElement("li")
    //li.textContent = myLeads[i]
    //ulEl.append(li)  // append the li element to the ul element 

    listItems += "<li>" + myLeads[i] + "</li>"

    }

    ulEl.innerHTML = listItems // adding the value of the input field to the ul element and use HTML tags in JavaScript 

}


// Without use of loop
function render(leads) {    // function to render the leads in the ul element
    let listItems = "<li><a href= '" + leads[leads.length - 1] + "' target='_blank'>" + inputEl.value + "</a></li>" // target='_blank' is used to open the link in a new tab
    ulEl.innerHTML += listItems
    //console.log(listItems)
}

 */

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

inputBtn.addEventListener("click", function() {
    //console.log("button clicked")    
    myLeads.push(inputEl.value);  /* value of the input field */    
    
    render(myLeads);
    inputEl.value = "";  // Clear the input field after saving the lead
    
    localStorage.setItem("myLeads",JSON.stringify(myLeads))  // Store local storage, local storage only allow string,JSON.stringify() convert to string
    
    console.log(localStorage.getItem("myLeads"))    
})

deleteBtn.addEventListener("dblclick",function() {  // "dblclick" use to make btn double clickable
    //console.log("double clicked")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

/*const tab = [
    {url: "drynsh56h.com"}
]
*/

tabBtn.addEventListener("click", function() {
    //console.log(tab[0])   show with array output is {"url": "aohga.com"}
    //console.log(tab[0].url)  show without arrray output is aohga.com
    chrome.tabs.query(
        { active: true, currentWindow: true },
        function(tabs) {

            let activeTab = tabs[0];

            let currentUrl = activeTab.url;

            myLeads.push(currentUrl);

            localStorage.setItem(
                "myLeads",
                JSON.stringify(myLeads)
            );

            render(myLeads);
        }
    );

});

    











