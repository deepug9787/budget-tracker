function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

function getFormattedDate(date, format = "yyyy-mm-dd") {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = date.getDate()

    switch (format) {
        case "yyyy-mm-dd":
            return `${year}-${month}-${day}`
        case "dd-mm-yyyy":
            return `${day}-${month}-${year}`
    }
}

function checkStorageItemExists(item) {
    return localStorage.getItem(item) ? true : false
}

function saveStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value))
        return true
    } catch (error) {
        return false
    }
}

function getStorageItem(key) {
    return JSON.parse(localStorage.getItem(key))
}

function showMessage(messageEl, message, status) {
    messageEl.textContent = message
    messageEl.style.color = status == "success" ? "green" : "red"
    messageEl.style.display = "block"
}

export {
    capitalize,
    getFormattedDate,
    checkStorageItemExists,
    saveStorageItem,
    getStorageItem,
    showMessage,
}
