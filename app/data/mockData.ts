export const user = {
  username: "wexun_user",
  password: "wexun1234",
  plan: "Premium",
  expireDate: "2025-09-01",
  avatar: "WX",
  dataUsed: 45.2,
  dataLimit: 100,
  activeConnections: 3,
  maxConnections: 5,
};

export const configs = [
  {
    id: 1,
    name: "Config Iran - 1",
    protocol: "VLESS",
    server: "ir1.wexun.net",
    port: 443,
    status: "active",
    ping: 32,
    flag: "🇮🇷",
  },
  {
    id: 2,
    name: "Config Germany",
    protocol: "VMess",
    server: "de1.wexun.net",
    port: 8443,
    status: "active",
    ping: 120,
    flag: "🇩🇪",
  },
  {
    id: 3,
    name: "Config Netherlands",
    protocol: "Trojan",
    server: "nl1.wexun.net",
    port: 443,
    status: "inactive",
    ping: 145,
    flag: "🇳🇱",
  },
  {
    id: 4,
    name: "Config USA",
    protocol: "VLESS",
    server: "us1.wexun.net",
    port: 2053,
    status: "active",
    ping: 210,
    flag: "🇺🇸",
  },
];

export const stats = {
  totalDownload: "128 GB",
  totalUpload: "23 GB",
  daysLeft: 42,
  onlineDevices: 2,
};

export const support = {
  telegram: "@Wexun",
  support: "Wexun_support",
};