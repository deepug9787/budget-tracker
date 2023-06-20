import { getFormattedDate, showMessage } from "./helper.js"

const el = document.querySelector("#transaction-form")
const messageEl = document.querySelector("#transaction-form-message")
const saveSuccessMsg = "New Transaction has been created successfully."
const saveErrorMsg = "Error creating transaction. Please try again."
const deleteSuccessMsg = "Transaction has been deleted successfully"
const deleteErrorMsg = "Error deleting transaction. Please try again."

function init() {
    setDefaultDate()
    el.querySelector("#description").value = ""
    el.querySelector("#income").checked = true
    el.querySelector("#amount").value = ""
}

function getFormDataObj() {
    let obj = {}

    const formData = new FormData(el)
    for (const [key, value] of formData) {
        obj[key] = value
    }

    return obj
}

function validate(transactionObj) {
    let message = ""

    if (transactionObj.date == "") {
        message = "Please select a transaction date"
    } else if (transactionObj.description == "") {
        message = "Please enter a description"
    } else if (transactionObj.amount == "") {
        message = "Please enter an amount"
    }

    if (message != "") {
        showMessage(messageEl, message, "error")
        return false
    }

    return true
}

function setDefaultDate() {
    const dateEl = el.querySelector("#date")
    const date = getFormattedDate(new Date())
    dateEl.value = date
    dateEl.setAttribute("max", date)
}

export {
    el,
    messageEl,
    saveSuccessMsg,
    saveErrorMsg,
    deleteSuccessMsg,
    deleteErrorMsg,
    init,
    getFormDataObj,
    validate,
}
