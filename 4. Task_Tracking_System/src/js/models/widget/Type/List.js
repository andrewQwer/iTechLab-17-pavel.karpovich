import WidgetType from "./WidgetType";

class List extends WidgetType {
	GetType() {
		return "List";
	}

	GetGraphic(div, percents) {
		return $(div).append(`<li>
							Type: ${this.GetType()}, 
							Count: <span class="widget__list">${percents.count}</span>, 
							Open: <span class="widget__list">${percents.openPercent}%</span>, 
							Closed: <span class="widget__list">${percents.closedPercent}%</span>, 
							InProgress: <span class="widget__list">${percents.inProgressPercent}%</span>
						</li>`);
	}
}

export default List;
