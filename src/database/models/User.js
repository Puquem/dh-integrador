module.exports = (sequelize, dataTypes) => {
	const User = sequelize.define('Users', {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: dataTypes.STRING,
		surname: dataTypes.STRING,
		email: dataTypes.STRING,
        password: dataTypes.STRING,
        avatar: dataTypes.STRING,
	});

    //Método del modelo para pasar nombre completo
	User.prototype.getFullName = function () {
		return `${this.name} ${this.surname}`;
	}

	return User;
}