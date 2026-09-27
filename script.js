// ==========================================
// NATURAL GAS DASHBOARD
// ==========================================

async function loadData() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Could not load data.json");
        }

        const data = await response.json();

        updateStorage(data.storage);

    } catch (error) {

        console.error("Data loading error:", error);

    }
}


// ==========================================
// STORAGE
// ==========================================

function updateStorage(storage) {

    const weeklyChange =
        storage.current - storage.previous;

    document.getElementById("storageYearAgo").textContent =
    `${storage.yearAgo.toLocaleString()} Bcf`;


    // Current

    document.getElementById("storageCurrent").textContent =
        `${storage.current} Bcf`;


    // Weekly change

    document.getElementById("storageChange").textContent =
        `${weeklyChange >= 0 ? "+" : ""}${weeklyChange} Bcf`;


    // Five-year comparison

    if (storage.fiveYearAverage > 0) {

        const difference =
            storage.current - storage.fiveYearAverage;

        const percentage =
            (difference / storage.fiveYearAverage) * 100;

        document.getElementById("storageAverage").textContent =
            `${storage.fiveYearAverage} Bcf`;

        document.getElementById("storageVsAverage").textContent =
            `${percentage >= 0 ? "+" : ""}${percentage.toFixed(1)}%`;

    } else {

        document.getElementById("storageAverage").textContent =
            "-- Bcf";

        document.getElementById("storageVsAverage").textContent =
            "--";
    }


    // Storage pressure

    let pressure = "→";

    if (storage.fiveYearAverage > 0) {

        if (storage.current > storage.fiveYearAverage) {
            pressure = "↑";
        }

        if (storage.current < storage.fiveYearAverage) {
            pressure = "↓";
        }
    }

    document.getElementById("storagePressure").textContent =
        pressure;


    console.log("Storage data:", storage);
}


// ==========================================
// START
// ==========================================

loadData();