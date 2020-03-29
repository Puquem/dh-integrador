//Captura el formulario de creación de producto
let form = document.querySelector("#fieldsForm");

//Captura los elementos del formulario y los convierte en array
let formInputs = Array.from(form.elements);

//Saca al botón "GUARDAR" del array
formInputs.pop();

// Objeto literal donde tengo los campos con error
let inputErrors = {};

//Iteramos el array del formulario
formInputs.forEach(oneInput => {
    //Agrega el evento blur a cada campo
    oneInput.addEventListener("blur", function() {
    //this hace referencia a oneInput que es a quien le ejecuto el evento y captura el valor del campo
        let inputValue = this.value;

        //Valida si el campo está vacío e ignora los espacios en blanco
        if ( validator.isEmpty (inputValue, { ignore_whitespace:true }) ){
            // Agrega la clase error al campo
            this.classList.add('error');
            // Muestra el mensaje de error en el span con clase feedback
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.name}</b> no puede estar vacío`;
        } else {
            // Elimina la clase error del campo
            this.classList.remove('error');
            // Elimina el texto que tenga el feedback
			this.nextElementSibling.innerHTML = ``;
			// Si el campo no tiene errores, eliminamos del objeto de errores esa propiedad
			delete inputErrors[oneInput.name];
		}
		
		console.log(inputErrors);
    });

    // Validando el campo precio de manera particular
    if (oneInput.name === 'price') {
    // Cuando salimos del campo
        oneInput.addEventListener('blur', function () {
        // Captura el valor del campo
        let inputValue = this.value;
        // Si NO está vacío y si el campo NO es un formato de email válido
        if ( !validator.isEmpty(inputValue) && !validator.isNumeric(inputValue, {no_symbols: true}) ) {
            // Agrega la clase error al campo
            this.classList.add('error');
            // Muestra el mensaje de error en el span con clase feedback
            this.nextElementSibling.innerHTML = `El <b>${this.dataset.name}</b> debe ser un formato numérico válido`;
			}
			
			console.log(inputErrors);
        });
    }

    //Validando el campo de imagen
	if (oneInput.name === 'image1', 'image2', 'image3') {

		oneInput.addEventListener('change', function () {
			// Array de extensiones permitidas
			let validExtensions = ['jpg', 'jpeg', 'gif', 'png'];
			// Extensión del archivo que desean subir
			let fileExtension = this.value.split('.').pop();
			// Booleano - true / false, si fileExtension está en el array de extensiones
			let isValidExtension = validExtensions.includes(fileExtension);
			
			// Si la extensión NO está en el array 
			if (!isValidExtension) {
				// Agrego la clase error al campo
				this.classList.add('error');
				// Muestra el mensaje de error en el span con clase feedback
				this.nextElementSibling.innerHTML = `La extensión <b>${fileExtension}</b> no está permitida, solo se admiten <i>${validExtensions}</i>`;
			} else {
				// Elimino la clase error del campo
				this.classList.remove('error');
				// Elimino el texto que tenga el feedback
				this.nextElementSibling.innerHTML = ``;
				delete inputErrors[this.name];
			}

			console.log(inputErrors);
		})
	}

});

// Si se trata de envíar el formulario antes de hacer el blur de los campos
form.addEventListener('submit', function (event) {
	// Iteramos sobre los campos del formulario 
	formInputs.forEach(oneInput => {
		// Capturamos el valor de cada campo
		let inputValue = oneInput.value;
		// Si el campo está vacío
		if (validator.isEmpty(inputValue, { ignore_whitespace: true })) {
			// Agrego una propiedad con el nombre del campo al objeto de error con valor true
			inputErrors[oneInput.name] = true;
			// Agregamos la clase error para el campo
			oneInput.classList.add('error');
			// Agregamos el mensaje de error
			oneInput.nextElementSibling.innerHTML = 'Campo <b>obligatorio</b>'
		}
	})

	if (Object.keys(inputErrors).length > 0) {
		// Evitamos que el formulario se envíe
		event.preventDefault();
	}
});
