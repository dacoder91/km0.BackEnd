/**
 * Convierte una cadena de fecha en formato DD/MM/YYYY a un objeto Date
 * @param {string} dateString - Fecha en formato DD/MM/YYYY
 * @returns {Date} - Objeto Date
 */
exports.parseDate = function(dateString) {
    // Verificar si la fecha viene en formato DD/MM/YYYY
    if (dateString && dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }
    // Si no viene en ese formato, intentamos parsear directamente
    return new Date(dateString);
};



/**
 * Convierte un objeto Date a una cadena en formato DD/MM/YYYY
 * @param {Date} date - Objeto Date
 * @returns {string} - Fecha en formato DD/MM/YYYY
 */
exports.formatDate = function(date) {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

/**
 * Formatea todas las propiedades de fecha de un documento a formato DD/MM/YYYY
 * @param {Object} doc - Documento de Mongoose
 * @param {Array} dateFields - Array con los nombres de los campos de fecha
 * @returns {Object} - Documento con fechas formateadas
 */
exports.formatDocumentDates = function(doc, dateFields = ['fechaInicio', 'fechaFin', 'fechaCreacion', 'foundationDate', 'signUpDate', 'lastAccessDate']) {
    if (!doc) return doc;
    
    // Si es un documento de Mongoose, convertirlo a objeto plano
    const obj = doc.toObject ? doc.toObject() : {...doc};
    
    // Formatear cada campo de fecha
    dateFields.forEach(field => {
        if (obj[field]) {
            obj[field] = this.formatDate(obj[field]);
        }
    });
    
    return obj;
};

/**
 * Formatea las fechas de una colección de documentos
 * @param {Array} docs - Array de documentos
 * @param {Array} dateFields - Array con los nombres de los campos de fecha
 * @returns {Array} - Array de documentos con fechas formateadas
 */
exports.formatCollectionDates = function(docs, dateFields) {
    return docs.map(doc => this.formatDocumentDates(doc, dateFields));
};