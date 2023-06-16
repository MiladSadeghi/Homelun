let whitelist = [
  "http://localhost:5173",
  "https://homelun.miladsdgh.ir/",
  "http://localhost:4173",
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
