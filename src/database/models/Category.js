module.exports = (sequelize, dataTypes) => {
	const Category = sequelize.define('Categories', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        category: dataTypes.STRING
	});

	return Category;
}