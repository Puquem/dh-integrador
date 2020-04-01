module.exports = (sequelize, dataTypes) => {
	const Grass = sequelize.define('Grasses', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        type: dataTypes.STRING
	});

	return Grass;
}