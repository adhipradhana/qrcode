var authenticateAdmin = (req, res, next) => {
    let payload = req.decoded;

    if (payload.admin) {
        next();
    } else {
        return res.json({
            status: "failed",
            message: "You're not authorized"
        });
    }
}

module.exports = authenticateAdmin;