import * as Transaction from "./modules/transaction.js"
import * as TransactionForm from "./modules/transaction-form.js"
import * as Stats from "./modules/stats.js"

function init() {
    TransactionForm.init()
    Transaction.showAll()
    Stats.update()
}

function handleSubmit(e) {
    e.preventDefault()
    const transactionObj = TransactionForm.getFormDataObj(TransactionForm.el)
    if (TransactionForm.validate(transactionObj) && Transaction.save(transactionObj)) {
        init()
    }
}

function handleDelete(e) {
    if (
        e.target.className == "transactions__delete" &&
        confirm("Delete transaction?") &&
        Transaction.destroy(e.target.dataset.index)
    ) {
        init()
    }
}

window.addEventListener("DOMContentLoaded", init)
TransactionForm.el.addEventListener("submit", handleSubmit)
Transaction.transactionsBodyEl.addEventListener("click", handleDelete)
