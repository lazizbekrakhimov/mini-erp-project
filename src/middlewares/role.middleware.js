import { ApiError } from "../utils/custom-error.js";

const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        // user authMiddleware orqali kelmagan bo‘lsa
        throw new ApiError("Unauthorized: User not found", 401);
      }

      if (!roles.includes(req.user.role)) {
        // user roli ruxsat etilgan roldan emas
        throw new ApiError("Forbidden: You do not have permission", 403);
      }

      next(); // rol mos keldi, route’ga davom et
    } catch (err) {
      next(err); // global error handler ga yuborish
    }
  };
};

export default roleMiddleware;
