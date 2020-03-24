module.exports = (sequelize, dataTypes) => {
	const Complex = sequelize.define('Complexes', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        complex: dataTypes.STRING,
        address: dataTypes.STRING,
        phone: dataTypes.INTEGER,
        description: dataTypes.STRING
	});
        
	return Complex;
}