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
        complexes_id: dataTypes.INTEGER,
		categories_id: dataTypes.INTEGER,
	});

	Field.associate = (models) => {
		Field.belongsTo(models.Complexes, {
			as: 'complexes',
			foreignKey: 'complexes_id'
		});

		Field.belongsTo(models.Categories, {
		 	as: 'categories',
			foreignKey: 'categories_id'
		});

		Field.belongsTo(models.Grasses, {
			as: 'grasses',
		   foreignKey: 'grasses_id'
	   });
    }

	return Field;
}