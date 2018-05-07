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
    }
}