import jwt from "jsonwebtoken";
import { ApiError } from "../utils/custom-error.js";
import User from "../schemas/user.schema.js"; // agar foydalanuvchi ma’lumotini DB’dan olish kerak bo‘lsa
import { envConfig } from "../config/env.js"; // .env faylidan JWT secret

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Authorization header ni olish
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError("Unauthorized: No token provided", 401);
    }

    // 2️⃣ Tokenni ajratish
    const token = authHeader.split(" ")[1];

    // 3️⃣ Tokenni verify qilish
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    // 4️⃣ User ma’lumotini olish (DB’dan)
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new ApiError("Unauthorized: User not found", 401);
    }

    // 5️⃣ Requestga user ni qo‘yish
    req.user = user;

    next(); // middleware muvaffaqiyatli o‘tdi, route’ga davom et
  } catch (err) {
    // JWT xato yoki expired bo‘lsa
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next(err); // boshqa xatolarni global error handler ga yuborish
  }
};

export default authMiddleware;
