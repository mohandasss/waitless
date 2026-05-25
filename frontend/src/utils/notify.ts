import noti from "@mantine/notifications";

export const notify = {
   success: (message: string) =>
      addNotification({
         message,
         type: "success",
      }),

   error: (message: string) =>
      addNotification({
         message,
         type: "error",
      }),

   warning: (message: string) =>
      addNotification({
         message,
         type: "warning",
      }),
};