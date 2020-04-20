
module.exports = (store) => async (req, res) => {
    store
        .collection('letters')
        .doc(req.params.id)
        .delete()
        .then(_ => res.send())
        .catch(_ => res.send(500))
}
