const topicInput = document.querySelector("#topic");
const learnButton = document.querySelector("#learn-btn");
const status = document.querySelector("#status");
const result = document.querySelector("#result");

learnButton.addEventListener("click", async () => {
    const topic = topicInput.value.trim();

    if (!topic) {
        status.textContent = "Please enter a topic.";
        return;
    }

    status.textContent = "AI is thinking...";
    result.innerHTML = "";
    learnButton.disabled = true;

    try {
        const response = await fetch("/learn", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic: topic
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed.");
        }

        result.innerHTML = `
            <h2>${escapeHTML(data.topic)}</h2>

            <p>
                <strong>Level:</strong>
                ${escapeHTML(data.level)}
            </p>

            <p>
                <strong>Summary:</strong>
                ${escapeHTML(data.summary)}
            </p>

            <h3>Uses</h3>

            <ul>
                ${data.uses
                    .map(use => `<li>${escapeHTML(use)}</li>`)
                    .join("")}
            </ul>
        `;

        status.textContent = "Done!";

    } catch (error) {
        status.textContent = error.message;
    } finally {
        learnButton.disabled = false;
    }
});

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
