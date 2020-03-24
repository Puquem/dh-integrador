module.exports = (sequelize, dataTypes) => {
	const Field = sequelize.define('Fields', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name: dataTypes.STRING,
        fieldType: dataTypes.INTEGER,
        price: dataTypes.INTEGER,
        image1: dataTypes.STRING,
        image2: dataTypes.STRING,
        image3: dataTypes.STRING,
        complex_id: dataTypes.INTEGER,
		type_id: dataTypes.INTEGER,
	});

	Field.associate = (models) => {
		Field.belongsTo(models.Complexes, {
			as: 'complex',
			foreignKey: 'complex_id'
		});
    }

    Field.associate = (models) => {
		Field.belongsTo(models.FieldTypes, {
			as: 'fieldType',
			foreignKey: 'fieldType_id'
		});
    }

	return Field;
}