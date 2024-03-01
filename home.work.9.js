

//Формирование ошибки в number инпуте
const numberInputError = () => {
	return document.querySelector(".number-input-text-error").innerHTML = "<span>Номер страницы вне диапазона от 1 до 10</span>";
}
//Формирование ошибки в limit инпуте
const limitInputError = () => {
	return document.querySelector(".limit-input-text-error").innerHTML = "<span>Лимит вне диапазона от 1 до 10</span>";
}

//Функция записи данных в localstorage
const saveLocalSorage = (imageUrl, i) => {
	localStorage.setItem(`image${i}`, imageUrl);
}
//Функция для получение данных из localStorage во время загрузки страницы
const getLocalStorage = (i) => {
	let a = localStorage.getItem(`image${i}`)
	return a

}

const LoadImages = () => {
	try {

		let b = 1
		let a = String(b)
		console.log(getLocalStorage())
		while (typeof getLocalStorage(a) != null && b <= 10) {
			const container = document.querySelector(".images")
			let z = String(b)
			console.log(`Урлы картинок ${getLocalStorage(b)}`)
			const image = document.createElement("img")
			image.src = getLocalStorage(b)
			container.append(image)
			b++
			// const image = document.createElement("img")
			// image.src = a
			// container.append(a)
			// b++


		}
	} catch (error) {

	}
}

async function Images ()  {
	const url = `https://jsonplaceholder.typicode.com/photos?_page=${SecondInputValue}&_limit=${SecondInputValue}`
	const container = document.querySelector(".images")
	const req = await fetch(url)
		.then(res => res.json())
		// .then(data => console.log(data))
		.then(data => {
			let i = 1;
			while (i <= SecondInputValue) {
				const image = document.createElement("img");
				imageUrl = data[i - 1]["url"]
				image.src = imageUrl;
				container.append(image);
				saveLocalSorage(imageUrl, i)
				// getLocalStorage("1")
				i++;
			}

		});
}



const clearLocalstorage = () => {
	return localStorage.clear()
}

//Функция получение значений из двух инпутов
const getFirstInputValue = () => {
	//Получение значения из первого инпута(Номер)
	let firstInputValue = document.getElementById("number-input").value;
	//Преобразование типа отдаваемых данных из строк  в тип number. Value всегда отдает тип данных "строка"
	//Также в DOM дереве стоит input type = number. Проверка на тип данных в данном случае бессмысленна, так как мы физически не можем ввести строку в инпут.
	let firstInputTypeNumber = +firstInputValue;
	return firstInputTypeNumber;
}



const getSecondInputValue = () => {
	//Получение значения из первого инпута(Лимит)
	let secondInputValue = document.getElementById("limit-input").value
	//Проверка типа данных в инпуте
	let secondInputNumberType = +secondInputValue;
	return secondInputNumberType;

}




async function twoInputs (FirstInputValue, SecondInputValue) {
	try {
		clearLocalstorage()
		//Проверка, что значения первого инпута <= 10
		if (FirstInputValue > 10) {
			// document.querySelector(".number-input-text-error").innerHTML = "<span>Номер страницы вне диапазона от 1 до 10</span>"
			numberInputError()
		} else {

		}
		// Проверка, что значение второго инпута <= 10
		if (SecondInputValue > 10) {
			// document.querySelector(".number-input-text-error").innerHTML = "<span>Лимит вне диапазона от 1 до 10</span>"
			limitInputError()
		} else {

		}
		//Проверка на кейс, если в number инпуте и limit инпуте значения > 10
		if (FirstInputValue > 10 && SecondInputValue > 10) {
			numberInputError()
			limitInputError()
		}
		//Проверка на кейс, когда лимит меньше, чем номер страницы
		else if (SecondInputValue < FirstInputValue && FirstInputValue < 10 && SecondInputValue < 10) {
			const url = `https://jsonplaceholder.typicode.com/photos?_page=${SecondInputValue}&_limit=${SecondInputValue}`
			const container = document.querySelector(".images")
			const req = await fetch(url)
				.then(res => res.json())
				// .then(data => console.log(data))
				.then(data => {
					let i = 1;
					while (i <= SecondInputValue) {
						const image = document.createElement("img");
						imageUrl = data[i - 1]["url"]
						image.src = imageUrl;
						container.append(image);
						saveLocalSorage(imageUrl, i)
						// getLocalStorage("1")
						i++;
					}

				});
		} else if (FirstInputValue < 10 && SecondInputValue < 10) {
			const url = `https://jsonplaceholder.typicode.com/photos?_page=${FirstInputValue}&_limit=${SecondInputValue}`
			const container = document.querySelector(".images")
			const req = await fetch(url)
				.then(res => res.json())
				// .then(data => console.log(data))
				.then(data => {
					let i = 1;
					while (i <= FirstInputValue) {
						const image = document.createElement("img");
						imageUrl = data[i - 1]["url"]
						image.src = imageUrl;
						container.append(image);
						saveLocalSorage(imageUrl, i)
						i++
					}
				});

		}

	} catch (error) {

	}

}













