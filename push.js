const webPush = require("web-push");

const pushSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/enTIWwpCWHM:APA91bHr4uz_H8ANVZPrmNbWZqibYOR8tZOOGH5Alm0RSb6_xrZF5x_KRi-qZLYfxLSvmz6opBE3dNhFgvhMb_zlGSUMlU-3f4AODigJsiOZZBCRi-b2HXN7MxANH11QZnl-7Tp37aDe",
  keys: {
    p256dh: "BJLDPILLX/RwF55UvsTvQ4y/NSSgGXIcQvbXvhdoExIs+S7L+yqIG9eDLKpMfcMEKFCyqcmPesrTN1hGKBZ/nKU=",
    auth: "WQtDZAceJUd1KF4M86fNzg==",
  },
};

const payload = "Congratulations! Push notification is working!";

const options = {
  gcmAPIKey: "516579231226",
  TTL: 60,
  vapidDetails: {
    subject: "mailto:test@mail.com",
    publicKey:
      "BC2772s1DVR40hrwya7iXEm_-Kry8Ion-DPqATHLk3l2pfF7RrB94kurlbBE4TilI1QnIWEqGKKloIOpVVNYeLw",
    privateKey: "WuheQfOHNzkWZ6sqHppASI-Fitb8rQJ6QpEZ23aHV1M",
  },
};

webPush.sendNotification(pushSubscription, payload, options);
