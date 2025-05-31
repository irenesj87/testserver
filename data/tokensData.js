/**
 *
 * ejemplo: {
 *    "98234ygh9238": "usuario1@mail.com"
 * }
 */

// Array para guardar los tokens de los usuarios que se loguean o registran. Su token está asociado con su correo (mapa).
// En la aplicación (ejemplo: en login.js, token.js), se están modificando las propiedades de este objeto
// (ejemplo: tokens[token] = mail;, delete tokens[token];). Pero no se está reasignando la propia variable tokens
// a un objeto completamente nuevo (ejemplo: tokens = someOtherObject;). const previene que la variable tokens se asigne
// a un objeto diferente. Sin embargo, sí que permite la modificación de las propiedades del objeto que referencia.
// Este es el comportamiento que se quiere para los tokens. Asegura que los tokens siempre apunten a la misma memory store,
// mientras que deja el actualizar esa store.
const tokens = {};

module.exports = tokens;
