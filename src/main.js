import express from "express";

import { envConfig } from "./config/env.js";
import { connectDB } from "./config/db.js";
import router from "./routers/index.route.js";
import { ApiError } from "./utils/custom-error.js";
import { errorHandle } from './middlewares/error-handle.js';

const app = express();
const PORT = envConfig.PORT;

app.use(express.json());
await connectDB();

app.use('/api', router);

app.all(/(.*)/, (_req, _res, next) => {
    next(new ApiError('URL not found', 404))
})

app.use(errorHandle);

app.listen(PORT, () => console.log('Server running on port', PORT));