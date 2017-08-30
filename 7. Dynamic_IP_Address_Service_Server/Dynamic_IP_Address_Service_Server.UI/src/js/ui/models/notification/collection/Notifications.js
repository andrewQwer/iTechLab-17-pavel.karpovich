import { Notification, NotificationConst } from "../../../index";

export default class Notifications {
    static GetNotification(notification) {
        let notifications = [
            new Notification(NotificationConst.SUCCESS_REGISTRATION)
        ];

        return notification.find(item => item.Message == notification);
    }
}