import allowedOrigins from "./allowedOrigins";

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== 1) {
      callback(null, true);
    } else {
      callback(null, new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

export default corsOptions;
