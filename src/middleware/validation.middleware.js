import Joi from "joi";

// const validateId = (req, res, next) => {
//     const { id } = req.body;
//     const regex = /^[A-Z]{3}\d{3}$/;
//     const result = regex.test(id);
//     console.log("Validating ID:", id, result);
//     if (result === false)
//         // return res.send(`El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"`);
//     return res.status(400).json({ error: `El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"` });
//     return next();

//     return res.status(400).json({ error: `El id debe ser ...` });
// };

const validateId = (req, res, next) => {
    console.log("DEBUG validateId - req.body:", req.body);
  console.log("DEBUG validateId - id:", typeof req.body.id, `"${req.body.id}"`);
    const aircraftIdSchema = Joi.object({
        id: Joi.string()
            .pattern(/^[A-Z]{3}\d{3}$/)
            .required()
    });

    // const { error } = aircraftIdSchema.validate(req.body);
    const { error } = aircraftIdSchema.validate({ id: req.body.id });

    if (error) {
        return res.status(400).json({
            error: `El id debe ser un valor alfanumérico del tipo AAB123.`
        });
    }

    next();
};

// export const validateId = (aircraft) => {
//     // const regex = /^[A-Z]{3}\d{3}$/;
//     const aircraftSchema = Joi.object({
//         id: Joi.string()
//             .pattern(/^[A-Z]{3}\d{3}$/)
//             .required()
//     })

//     // validate -> es propia de Joi y valida el dato que yo le pase
//     const { error } = aircraftSchema.validate(aircraft)
//     // Devuelve true si hay error, false si está OK
//     return error ? true : false;

// };


const validateCoordinates = (req, res, next) => {
    const { xa, ya, za } = req.body;

    // Definimos el esquema Joi
    const aircraftCoordinatesSchema = Joi.object({
        xa: Joi.number().required(),
        ya: Joi.number().required(),
        za: Joi.number().required()
    });

    // Validamos el body
    const { error } = aircraftCoordinatesSchema.validate({ xa, ya, za });

    // Si hay error → devolver 400 con mensaje claro
    if (error) {
        return res.status(400).json({
            error: "xa, ya y za deben ser números válidos."
        });
    }

    // Si pasa la validación → continuar
    return next();
};

export default {
    validateId,
    validateCoordinates,
};
