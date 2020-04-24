import { Country } from "../store/reducers/trips"
import { EmailValidationType, PasswordValidationType } from '../containers/Auth/Auth'

export const sortByName = (obj: Array<Country>, request: string): Array<Country> => {
	const newObj = obj.filter((elem) => {
		return elem.value.toLowerCase().indexOf(request.toLowerCase()) === 0
	})
	return newObj
}

export const checkValidaty = (value: string, rules: EmailValidationType & PasswordValidationType) => {
	let isValid = true

	if (!rules) {
		return true
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid
	}

	if (rules.isEmail) {
		const pattern = /^[.a-z0-9_-]+@[а-яА-Яa-z0-9-]+\.[а-яА-Яa-zA-Z]{2,6}$/i
		isValid = pattern.test(value) && isValid
	}

	return isValid
}
