const { response } = require("express");


const esAdminRol = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin válidar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} no es Administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRol = (...roles) => {
    return (req, res = response, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin válidar el token'
            });
        }

        if(!roles.incluide(req.usuario.rol)){
            return res.status(401).json({
                msg: `El serviucio requiere uno de estos roles: ${roles}`
            });
        }
        next();
    }

}



module.exports = {
    esAdminRol,
    tieneRol
}