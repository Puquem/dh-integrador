module.exports = (sequelize, dataTypes) => {
	const Field = sequelize.define('Fields', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
		description: dataTypes.STRING,
        price: dataTypes.INTEGER,
        image1: dataTypes.STRING,
        image2: dataTypes.STRING,
        image3: dataTypes.STRING,
        complex_id: dataTypes.INTEGER,
		category_id: dataTypes.INTEGER,
	});

	Field.associate = (models) => {
		Field.belongsTo(models.Complexes, {
			as: 'complex',
			foreignKey: 'complex_id'
		});

		Field.belongsTo(models.Categories, {
		 	as: 'category',
			foreignKey: 'category_id'
		});
    }

	return Field;
}