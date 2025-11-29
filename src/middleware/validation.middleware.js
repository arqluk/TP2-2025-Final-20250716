const validateId = (req, res, next) => {
    const { id } = req.body;
    const regex = /^[A-Z]{3}\d{3}$/;
    const result = regex.test(id);
    console.log("Validating ID:", id, result);
    if (result === false)
        // return res.send(`El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"`);
    return res.status(400).json({ error: `El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"` });
    return next();

    return res.status(400).json({ error: `El id debe ser ...` });
};

const validateCoordinates = (req, res, next) => {
    const { xa, ya, za } = req.body;

    if (
        typeof xa === "number" && !isNaN(xa) &&
        typeof ya === "number" && !isNaN(ya) &&
        typeof za === "number" && !isNaN(za)
    ) {
        return next();
    }
    
    return res.status(400).json({
        error: "xa, ya y za deben ser números.",
    });
    
}

export default {
    validateId,
    validateCoordinates,
};
