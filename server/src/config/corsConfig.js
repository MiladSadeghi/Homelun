let whitelist = [
  "http://localhost:5173",
  "https://homelun.miladsdgh.ir",
  "http://localhost",
];
export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
