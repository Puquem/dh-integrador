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
	});

	Complex.associate = (models) => {
		Complex.hasMany(models.Fields, {
			as: 'fields',
			foreignKey: 'complexes_id'
		});
	}
        
	return Complex;
}