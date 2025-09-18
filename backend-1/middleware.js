import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Jok3r";

export function middleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(403).json({ message: "Unauthorized - Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(403).json({ message: "Unauthorized - Invalid token" });
  }
}
