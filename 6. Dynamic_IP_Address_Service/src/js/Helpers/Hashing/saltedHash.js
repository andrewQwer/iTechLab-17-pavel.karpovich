import crypto from "crypto";

export default class SaltedHash {
	constructor(password) {
		this._length = 64;
		this._salt = this.GenSalt();
		this._hash = SaltedHash.ComputeHash(password, this._salt);
	}

	GetSalt() {
		return this._salt;
	}

	GetHash() {
		return this._hash;
	}

	GenSalt() {
		return crypto
			.randomBytes(Math.ceil(this._length))
			.toString("hex")
			.slice(0, this._length);
	}

	static ComputeHash(pass, salt) {
		return crypto.createHmac("sha512", salt).update(pass).digest("hex");
	}

	static Verify(password, hash, salt) {
		let hashAttempt = SaltedHash.ComputeHash(password, salt);
		return hash === hashAttempt;
	}
}
