import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./js";
import { ConfigureStore } from "./js/app";
import { Admin, PremiumUser } from "./js/user";

var month = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

Date.prototype.format = function(format) {
	let dataFormatRegex = {
		"y{4}": this.getFullYear(),
		"M{4}": month[this.getMonth()],
		"M{2}": this.getMonth() + 1, // month start with zero
		"d{2}": this.getDate()
	};

	for (var regex in dataFormatRegex) {
		if (/(y+)/.test(format))
			format = format.replace(
				RegExp.$1,
				(this.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		if (new RegExp("(" + regex + ")").test(format)) {
			format = format.replace(
				RegExp.$1,
				RegExp.$1.length == 1 || RegExp.$1 == "MMMM"
					? dataFormatRegex[regex]
					: ("00" + dataFormatRegex[regex]).substr(
							("" + dataFormatRegex[regex]).length
						)
			);
		}
	}
	return format;
};

let initial = {
	user: {
		uuid: null,
		isLogin: false,
		users: [
			{
				email: "tallerstk97@gmail.com",
				firstName: "Pavel",
				hash:
					"1722fef18f2eec5a3b802638e7ddfa8bc746d0a456842187f760000f5aebb6da017c1efedb1b6493f1b57d2771d74fd1f952c115b9d098b6c143b5dd0596b00f",
				ip: [],
				lastName: "Karpovich",
				login: "taller",
				salt:
					"a96484211ab6d5d0b392109202c256bb444afb0b604b970ccf1cb42ae78b2489",
				type: new Admin(),
				uuid: "5f0f0825-e2a6-49b7-997e-af60733a1870"
			},
			{
				email: "Liza98@gmail.com",
				firstName: "Liza",
				hash:
					"0a9afbfdf5d0859ed9ca7809f3ba7d5d0308eeeeb9623da6ab14e62ee0053ec79e04ddfad78b51aefc449bb3e9a14aef3acc1100c2a7e78d56268f0dca1c374f",
				ip: [],
				lastName: "Kolyago",
				login: "liza98",
				salt:
					"3e84daa1a82c43b6613abf50bbaabaa01ba1d08e3b81442c55a566df8188d63d",
				type: new PremiumUser(),
				uuid: "1a414239-3480-43fa-8e7e-06494971a486"
			}
		],
		basket: []
	},
	ip: {
		ips: [
			{
				uuid: "1a414789-3480-43fa-8e7e-06494971a486",
				ownerUuid: "1a414239-3480-43fa-8e7e-06494971a486",
				ip: "192.168.5.5",
				domain: "liza",
				updateDate: new Date()
			},
			{
				uuid: "1q414789-3480-43fa-8e7e-06494971a486",
				ownerUuid: "1a414239-3480-43fa-8e7e-06494971a486",
				ip: "192.168.5.6",
				domain: "liza2",
				updateDate: new Date()
			},
			{
				uuid: "12414789-3480-43fa-8e7e-06494971a486",
				ownerUuid: "1a414239-3480-43fa-8e7e-06494971a486",
				ip: "192.168.5.5",
				domain: "liza3",
				updateDate: new Date()
			},
			{
				uuid: "19414789-3480-43fa-8e7e-06494971a486",
				ownerUuid: "1a414239-3480-43fa-8e7e-06494971a486",
				ip: "192.168.5.5",
				domain: "liza4",
				updateDate: new Date()
			},
			{
				uuid: "18414789-3480-43fa-8e7e-06494971a486",
				ownerUuid: "1a414239-3480-43fa-8e7e-06494971a486",
				ip: "192.168.5.5",
				domain: "liza4",
				updateDate: new Date()
			},
			{
				uuid: "5f0f0825-e8a6-49b7-997e-af60733a1870",
				ownerUuid: "5f0f0825-e2a6-49b7-997e-af60733a1870",
				ip: "192.168.5.1",
				domain: "taller4",
				updateDate: new Date()
			}
		]
	}
};
const store = ConfigureStore(initial);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
