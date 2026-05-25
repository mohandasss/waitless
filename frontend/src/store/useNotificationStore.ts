import { create } from "zustand";

export type NotificationType =
	| "success"
	| "error"
	| "info"
	| "warning";

export interface Notification {
	id: string;
	message: string;
	type: NotificationType;
	duration?: number;
}

interface NotificationState {
	notifications: Notification[];

	show: (
		type: NotificationType,
		message: string,
		duration?: number
	) => void;

	success: (
		message: string,
		duration?: number
	) => void;

	error: (
		message: string,
		duration?: number
	) => void;

	warning: (
		message: string,
		duration?: number
	) => void;

	info: (
		message: string,
		duration?: number
	) => void;

	removeNotification: (id: string) => void;
}

export const useNotificationStore =
	create<NotificationState>((set) => {
		const createNotification = (
			type: NotificationType,
			message: string,
			duration = 2000
		) => {
			const id = crypto.randomUUID();

			const notification: Notification = {
				id,
				type,
				message,
				duration,
			};

			// Replace existing notification
			set({
				notifications: [notification],
			});

			// Auto remove
			if (duration > 0) {
				setTimeout(() => {
					set((state) => ({
						notifications:
							state.notifications.filter(
								(n) => n.id !== id
							),
					}));
				}, duration);
			}
		};

		return {
			notifications: [],

			show: (
				type,
				message,
				duration
			) => {
				createNotification(
					type,
					message,
					duration
				);
			},

			success: (
				message,
				duration
			) => {
				createNotification(
					"success",
					message,
					duration
				);
			},

			error: (
				message,
				duration
			) => {
				createNotification(
					"error",
					message,
					duration
				);
			},

			warning: (
				message,
				duration
			) => {
				createNotification(
					"warning",
					message,
					duration
				);
			},

			info: (
				message,
				duration
			) => {
				createNotification(
					"info",
					message,
					duration
				);
			},

			removeNotification: (
				id
			) =>
				set((state) => ({
					notifications:
						state.notifications.filter(
							(n) => n.id !== id
						),
				})),
		};
	});