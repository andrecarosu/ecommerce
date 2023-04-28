/**
 * !TODO: Este middleware funcionara para los mensajes de errores en los controladores
 */
const handlerHttpError = (res, message = "PROCESO_NO_ESPERADO", code = 500) => {
  return res.status(code).json({ error: message });
};

module.exports = handlerHttpError;
