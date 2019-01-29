var authenticateAdmin = (req, res, next) => {
    let admin = req.decoded.admin;

    if (!admin) {
        res.json({
            status: "failed",
            message: 'Not authorized' 
        });
    }

    next();
}

module.exports = authenticateAdmin;