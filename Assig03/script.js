document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("wordInput");
    const searchBtn = document.getElementById("searchBtn");
    const resultDiv = document.getElementById("result");
    const searchIcon = document.querySelector(".icon-search");
    const spinner = document.querySelector(".spinner");

    const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    const setLoadingState = (isLoading) => {
        searchIcon.classList.toggle("hidden", isLoading);
        spinner.classList.toggle("hidden", !isLoading);
        searchBtn.disabled = isLoading;
    };

    const renderResult = (data) => {
        const meaning = data[0].meanings[0];
        const definition = meaning.definitions[0].definition;
        const example = meaning.definitions[0].example || "No example available.";
        const partOfSpeech = meaning.partOfSpeech;

        resultDiv.innerHTML = `
            <div class="result-info">
                <h2 class="result-title">${data[0].word}</h2>
                <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
                <p><strong>Definition:</strong> ${definition}</p>
                <p><strong>Example:</strong> ${example}</p>
            </div>
        `;
        resultDiv.classList.add("result-found");
        resultDiv.classList.remove("result-box");
    };

    const clearResult = () => {
        resultDiv.innerHTML = `
            <p class="placeholder-text">Search for a word to see its definition, part of speech, and example usage.</p>
        `;
        resultDiv.classList.add("result-box");
        resultDiv.classList.remove("result-found");
    };

    const showError = (message) => {
        resultDiv.innerHTML = `<p class="error-message">❌ ${message}</p>`;
        resultDiv.classList.add("result-found");
        resultDiv.classList.remove("result-box");
    };

    const handleSearch = async () => {
        const word = wordInput.value.trim();

        if (!word) {
            showError("Please enter a word to search.");
            return;
        }

        setLoadingState(true);

        try {
            const response = await fetch(`${API_URL}${word}`);

            if (!response.ok) {
                throw new Error("Word not found. Please check your spelling.");
            }

            const data = await response.json();
            renderResult(data);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoadingState(false);
        }
    };

    searchBtn.addEventListener("click", handleSearch);

    wordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });
});