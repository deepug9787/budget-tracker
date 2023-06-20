import { getStorageItem, checkStorageItemExists } from "./helper.js"
import * as Transaction from "./transaction.js"

export function update() {
    const totalIncome = calculateAmtByType("income")
    const totalExpense = calculateAmtByType("expense")
    show(totalIncome, totalExpense)
}

function calculateAmtByType(transactionType) {
    if (!checkStorageItemExists(Transaction.storageKeyName)) {
        return 0
    }

    const transactionsList = getStorageItem(Transaction.storageKeyName)
    const filteredList = transactionsList.filter(
        (transaction) => transaction.type == transactionType
    )

    let totalAmount = 0
    for (const transaction of filteredList) {
        totalAmount += Number(transaction.amount)
    }
    return totalAmount
}

function show(totalIncome, totalExpense) {
    document.querySelector(".total-income").textContent = `${totalIncome}$`
    document.querySelector(".total-expense").textContent = `${totalExpense}$`
    const statsElAll = document.querySelectorAll(".stats")
    for (const statsEl of statsElAll) {
        statsEl.querySelector(".balance").textContent = `${totalIncome - totalExpense}$`
    }
}
