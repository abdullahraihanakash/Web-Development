// front end code
const response = await fetch('http://localhost:8000/api',{
    
    method: "POST",
    body: JSON.stringify({ username: "Tom"}),
    headers: {
        "Content-Type": "application/json"
    },
})