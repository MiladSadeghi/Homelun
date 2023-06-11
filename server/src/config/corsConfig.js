let whitelist = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://homelun.miladsdgh.ir",
  "http://localhost",
  "http://192.168.1.2:5173",
  "http://192.168.1.2:5174",
  "http://192.168.1.5:5173",
  "http://192.168.1.5",
  "https://homelun.miladsdgh.ir/",
];
export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
		console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
