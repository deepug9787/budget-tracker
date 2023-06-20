import {
    capitalize,
    getFormattedDate,
    getStorageItem,
    saveStorageItem,
    showMessage,
} from "./helper.js"

import * as TransactionForm from "./transaction-form.js"

// key name for local storage
const storageKeyName = "transactions"
const transactionsBodyEl = document.querySelector(".transactions__body")

function save(transactionObj) {
    let transactionsList = getStorageItem(storageKeyName) ?? []
    transactionsList.unshift(transactionObj)

    if (!saveStorageItem(storageKeyName, transactionsList)) {
        showMessage(TransactionForm.messageEl, TransactionForm.saveErrorMsg, "error")
        return false
    }

    showMessage(TransactionForm.messageEl, TransactionForm.saveSuccessMsg, "success")
    return true
}

function destroy(index) {
    let transactionsList = getStorageItem(storageKeyName)
    transactionsList.splice(index, 1)

    if (!saveStorageItem(storageKeyName, transactionsList)) {
        showMessage(TransactionForm.messageEl, TransactionForm.deleteErrorMsg, "error")
        return false
    }

    showMessage(TransactionForm.messageEl, TransactionForm.deleteSuccessMsg, "success")
    return true
}

function showAll() {
    let transactionsStorageList

    transactionsBodyEl.innerHTML = (transactionsStorageList = getStorageItem(storageKeyName))
        ? generateTransactionsPublicList(transactionsStorageList)
        : "No transactions yet."
}

function generateTransactionsPublicList(transactionsStorageList) {
    let rows = ""

    transactionsStorageList.forEach((transaction, index) => {
        rows += `<tr>
                    <td data-title="Date">${getFormattedDate(
                        new Date(transaction.date),
                        "dd-mm-yyyy"
                    )}</td>
                    <td data-title="Description">${capitalize(transaction.description)}</td>
                    <td data-title="Type">${capitalize(transaction.type)}</td>
                    <td data-title="Amount">${transaction.amount}</td>
                    <td data-title="Action"><a href="#"
                        class="transactions__delete"
                        data-index=${index}>
                        Delete
                        </a>
                    </td>
                    </tr>`
    })

    return rows
}

export { storageKeyName, transactionsBodyEl, save, destroy, showAll }
