
const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) =>{

    const token = req.header('token');
    console.log(token);

    if (!token){
        return res.status(401).json({
            ok: false,
            msg:'No hay token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        
    } catch (error) {
        return res.status().json({
            ok: false,
            msg: 'token no valido'
        });
    }

    next();
}

module.exports= {
    validarToken
}