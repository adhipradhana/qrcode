var authenticateAdmin = (req, res, next) => {
    let admin = req.decoded.admin;

    if (!admin) {
        res.json({
            success: false,
            message: 'Not authorized' 
        });
    }
    
    next();
}

module.exports = authenticateAdmin;