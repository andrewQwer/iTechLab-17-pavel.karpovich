import { Error, ErrorCodes } from "../../../index";

export default class Errors {
	static GetErrorByCode(code) {
		let errors = [
			new Error(
				ErrorCodes.UNDEF_CODE,
				"Error code is not defined!"),
			new Error(
				ErrorCodes.REGISTER_LOGIN_OR_EMAIL_UNAVAILABLE,
				"Sorry, this login or email already used!"
			),
			new Error(
				ErrorCodes.INCORRECT_LOGIN_OR_PASSWORD,
				"Sorry, incorrect login or password! Please, try again."
			),
			new Error(
				ErrorCodes.DOMAIN_UNAVAILABLE,
				"Sorry, this domain unavailable!"
			),
			new Error(
				ErrorCodes.INCORRECT_IP_ADDRESS,
				"Please, check ip address!"
			),
			new Error(
				ErrorCodes.EXCEEDED_DOMAIN_COUNT_LIMIT,
				"Exceeded domain count limit!"
			)
		];

		let error = errors.find(item => item.Code === code);
		return !!error ? error : errors[0];
	}
}
