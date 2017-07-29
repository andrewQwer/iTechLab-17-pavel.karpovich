import TicketController from "../TicketController";
import SimpleTicket from "../../models/ticket/SimpleTicket";
import IObserver from "../../models/observer/IObserver";
import DateTime from "../../helpers/DateTime";
import UI from "./UI";

let instance;

let $ticketList = $("#ticketList");
let $ticketInputTitle = $("#ticketTitle");
let $ticketInputDueDate = $("#ticketDueDate");
let $ticketInputDueTime = $("#ticketDueTime");
let $ticketInputStatus = $("#ticketStatus");
let $addTicketMenu = $("#addTicketMenu");
let $ticketAddButton = $("#addTicketButton");
let $ticketSaveButton = $("#saveTicketButton");
let $ticketSaveEditButton = $("#editTicketButton");
let $ticketCancelButton = $("#cancelTicketButton");
let $ticketDeleteButton = $("#ticketDeleteButton");
let $ticketEditButton = $("#ticketEditButton");

let ticketsId = 0;
let editId = 0;

class TicketUIController extends IObserver {
	constructor() {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		this.PlugEvent();
		this.ticketController = new TicketController();
	}

	PlugEvent() {
		$ticketAddButton.click(() => UI.ShowBlackout("ticket"));
		$ticketCancelButton.click(() => this.ClearTicketMenu());
		$ticketSaveButton.click(() => this.AddTicket());
		$ticketSaveEditButton.click(() => this.SaveEditTicket());
		$("body").on("click", ".ticketDeleteButton", () => {
			this.DeleteTicket(this.GetSelectedId(event));
		});
		$("body").on("click", ".ticketEditButton", () => {
			$ticketSaveButton.hide();
			$ticketSaveEditButton.show();
			editId = this.GetSelectedId(event);
			this.EditTicket(editId);
		});
	}

	get TicketMenuValue() {
		return {
			title: $ticketInputTitle.val(),
			dueDate: new Date(
				`${$ticketInputDueDate.val()} ${$ticketInputDueTime.val()}`
			),
			status: $("#ticketStatus option:selected").val()
		};
	}

	set TicketMenuValue({ title, dueDate, status }) {
		$ticketInputTitle.val(title);
		$ticketInputDueDate.val(dueDate != null ? DateTime.GetDate(dueDate) : "");
		$ticketInputDueTime.val(dueDate != null ? DateTime.GetTime(dueDate) : "");
		$ticketInputStatus.val(status);
	}

	GetSelectedId(event) {
		return event.target.closest(".ticket__item").attributes["guid"].value;
	}

	CheckInputData() {
		let ext = /[\w\d]+/;
		let ticketMenuValue = this.TicketMenuValue;
		if (!ext.test(ticketMenuValue.title)) {
			alert("Please, check title");
			throw "Please, check title";
		}
		if (DateTime.CompareDate(ticketMenuValue.dueDate, Date.now()) == -1) {
			alert("Please, select correct date");
			throw "Please, select correct date";
		}
	}

	ClearTicketMenu() {
		this.TicketMenuValue = {
			title: "",
			dueDate: null,
			status: "Open"
		};
		UI.HideBlackout();
	}

	AddTicket() {
		this.CheckInputData();
		let ticketMenuValue = this.TicketMenuValue;
		this.ticketController.Add(
			new SimpleTicket(
				ticketsId++,
				ticketMenuValue.title,
				ticketMenuValue.dueDate,
				ticketMenuValue.status
			)
		);
		alert("Ticket successfully added !");
		this.ClearTicketMenu();
	}

	DeleteTicket(id) {
		this.ticketController.Remove(id);
		alert("Ticket successfully delete!");
	}

	EditTicket(id) {
		let editTicket = this.ticketController.GetTicketById(id);
		this.TicketMenuValue = {
			title: editTicket.Title,
			dueDate: editTicket.DueDate,
			status: editTicket.Status
		};
		UI.ShowBlackout("ticket");
	}

	SaveEditTicket() {
		$ticketSaveButton.show();
		$ticketSaveEditButton.hide();
		this.CheckInputData();
		this.ticketController.Edit(editId, this.TicketMenuValue);
		$addTicketMenu.hide();
		alert("Ticket change successfully!");
		this.ClearTicketMenu();
	}

	Update() {
		let result = "";
		for (let item of this.ticketController.ticketList) {
			result += item.toString();
		}
		$ticketList.html(result);
	}
}

export default TicketUIController;
