module.exports = {
    getLastBillingNumber : (req, res)=> {
        const dbInstance = req.app.get('db');
        const {userid} = req.params

        dbInstance.GET_LAST_INVOICE_ID([userid]).then((result) => {
            res.status(200).send(result)
        }).catch((e) => {
            console.log(`Error getting last invoice id at controller: ${e}`);
            res.sendStatus(500);
        })
    },

    addBilling : (req, res) => {
        const dbInstance = req.app.get('db');
        const {userid} = req.params
        const {job_id, client_id, invoice_date, total, due_date, invoice_number} = req.body

        dbInstance.ADD_BILLING([job_id, client_id, userid, invoice_date, total, due_date, invoice_number]).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            console.log(`Error adding billing at controller: ${e}`);
            res.sendStatus(500);
        })
    }
}