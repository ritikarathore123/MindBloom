import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: "Unauthorized: Token missing" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.admin = decoded;
    next();
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// export const authUser = (req, res, next) => {
//   try {
//     let token = req.cookies.token;


//     if (!token)
//       return res.status(401).json({ message: "Unauthorized: Token missing" });

//     console.log('Token received:', token.substring(0, 20) + '...'); 
//     console.log('SECRET_KEY loaded:', process.env.SECRET_KEY ? 'Yes' : 'No'); 

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Auth middleware error:', error.message);
//     if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//     }
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const authUser = (req, res, next) => {
  try {
    let token = req.cookies.token;

    // Agar cookie me token nahi hai, to headers check karo
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
export const authMiddleware = authUser;



// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();


// export const authUser = (req, res, next) => {
//   try {
//     let token = req.cookies.token;


//     if (!token)
//       return res.status(401).json({ message: "Unauthorized: Token missing" });

//     console.log('Token received:', token.substring(0, 20) + '...'); 
//     console.log('SECRET_KEY loaded:', process.env.SECRET_KEY ? 'Yes' : 'No'); 

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('Auth middleware error:', error.message);
//     if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
//     }
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const authMiddleware = authUser;


