module.exports = (sequelize, dataTypes) => {
	const FieldType = sequelize.define('FieldTypes', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        type: dataTypes.STRING
	});

	return FieldType;
}