

// import { Score } from "../models/Score.js";
// import { User } from "../models/User.js";
// import jwt from "jsonwebtoken";

 
 
// export const getAllScores = async (req, res) => { 
//   try {
//     const scores = await Score.find(); 
//     return res.status(200).json({message: 'Data Fetched',results: scores.length,data:{scores}});
//   } catch (err) {
//     return res.status(500).json({error: 'Internal Server Error'});
//   }
// };

//  export const getScoreByRange = async (req, res) => {  
//   try {
//     let total_score = Number(req.params.range)
     
//      if (total_score >= 0 && total_score <= 4) {
//       total_score = "0 – 4"; 
//     } else if (total_score >= 5 && total_score <= 9) {
//       total_score = "5 – 9"; 
//     } else if (total_score >= 10 && total_score <= 14) {
//       total_score = "10 – 14"; 
//     } else if (total_score >= 15 && total_score <= 19) {
//       total_score = "15 – 19"; 
//     } else if (total_score >= 20 && total_score <= 27) {
//       total_score = "20 – 27";  
//     } else if (total_score > 27) {
//       total_score = "Above 27";
//     } else {
//       console.error("Invalid numerical score provided.");
//       return res.status(400).json({ message: "Invalid numerical score provided. Please provide a valid number." });
//     }
 
//     let score = await Score.findOne({ total_score});  
//     if (score) {
//       // Optionally link to user if token provided
//       try {
//         const token = req.cookies?.token || req.headers?.authorization?.replace(/^Bearer\s+/i, "");
//         if (token) {
//           const decoded = jwt.verify(token, process.env.SECRET_KEY);
//           if (decoded?.id) {
//             await User.findByIdAndUpdate(decoded.id, { $addToSet: { scores: score._id } });
//           }
//         }
//       } catch (_) {}

//       return res.status(200).json({message: 'Score Matched',score});
//     }

//     // Fallback response if DB not seeded
//     const defaultsByRange = {
//       "0 – 4": {
//         total_score: "0 – 4",
//         what_it_means: "Minimal depression",
//         detailed_meaning_and_actions: "Monitor your mood; continue healthy habits like sleep, exercise, and social connection.",
//         inspiring_quote: "Small steps each day add up",
//         call_to_action: "Keep doing what works; check-in weekly."
//       },
//       "5 – 9": {
//         total_score: "5 – 9",
//         what_it_means: "Mild depression",
//         detailed_meaning_and_actions: "Try lifestyle adjustments and coping strategies like journaling, mindfulness, and routine.",
//         inspiring_quote: "Progress, not perfection",
//         call_to_action: "Add daily walks and short mindfulness sessions."
//       },
//       "10 – 14": {
//         total_score: "10 – 14",
//         what_it_means: "Moderate depression",
//         detailed_meaning_and_actions: "Consider talking to a counselor and share how you feel with someone you trust.",
//         inspiring_quote: "You are not alone",
//         call_to_action: "Schedule a counseling session; build a weekly support routine."
//       },
//       "15 – 19": {
//         total_score: "15 – 19",
//         what_it_means: "Moderately severe depression",
//         detailed_meaning_and_actions: "Professional support recommended. Treatment options can help you feel better.",
//         inspiring_quote: "Asking for help is strength",
//         call_to_action: "Consult a mental health professional this week."
//       },
//       "20 – 27": {
//         total_score: "20 – 27",
//         what_it_means: "Severe depression",
//         detailed_meaning_and_actions: "Immediate professional help is important. You deserve care and support.",
//         inspiring_quote: "Your story matters",
//         call_to_action: "Contact a professional or helpline today."
//       },
//       "Above 27": {
//         total_score: "Above 27",
//         what_it_means: "Severe depression",
//         detailed_meaning_and_actions: "Immediate professional help is important. You deserve care and support.",
//         inspiring_quote: "Your story matters",
//         call_to_action: "Contact a professional or helpline today."
//       }
//     };
//     const fallback = defaultsByRange[total_score];

//     // Create minimal score doc so it can be linked to users going forward
//     let createdScore;
//     try {
//       createdScore = await Score.create({
//         total_score: fallback.total_score,
//         what_it_means: fallback.what_it_means,
//         detailed_meaning_and_actions: fallback.detailed_meaning_and_actions,
//         inspiring_quote: fallback.inspiring_quote,
//         call_to_action: fallback.call_to_action
//       });
//     } catch (_) {}

//     // Optionally link to user if token provided
//     try {
//       const token = req.cookies?.token || req.headers?.authorization?.replace(/^Bearer\s+/i, "");
//       if (token && createdScore?._id) {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         if (decoded?.id) {
//           await User.findByIdAndUpdate(decoded.id, { $addToSet: { scores: createdScore._id } });
//         }
//       }
//     } catch (_) {}

//     return res.status(200).json({message: 'Score Matched (fallback)', score: fallback});
//   } catch (err) {
//     console.log(err);    
//     return res.status(500).json({message: 'Internal Server Error'});
//   }
// };

 
// export const createScore = async (req, res) => { 
//   try {
//     const newScore = await Score.insertMany(req.body);
//     return res.status(201).json({message: 'Data Added'});
//   } catch (err) {
//     return res.status(400).json({message: "Internal Server Error"});
// }
// };

// // Link a computed score range to the authenticated user
// export const submitUserScore = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const rawScore = Number(req.body?.score);

//     if (!userId) return res.status(401).json({ message: "Unauthorized" });
//     if (Number.isNaN(rawScore)) return res.status(400).json({ message: "Invalid score" });

//     // Map numeric score to range key
//     let rangeKey;
//     if (rawScore >= 0 && rawScore <= 4) rangeKey = "0 – 4";
//     else if (rawScore <= 9) rangeKey = "5 – 9";
//     else if (rawScore <= 14) rangeKey = "10 – 14";
//     else if (rawScore <= 19) rangeKey = "15 – 19";
//     else if (rawScore <= 27) rangeKey = "20 – 27";
//     else rangeKey = "Above 27";

//     // Find Score doc for that range (seeded or fallback create temporary doc?)
//     let scoreDoc = await Score.findOne({ total_score: rangeKey });

//     // If not seeded, create a minimal doc so it can be referenced
//     if (!scoreDoc) {
//       scoreDoc = await Score.create({
//         total_score: rangeKey,
//         what_it_means: "",
//         detailed_meaning_and_actions: "",
//         inspiring_quote: "",
//         call_to_action: ""
//       });
//     }

//     // Push reference onto user's scores
//     await User.findByIdAndUpdate(userId, { $addToSet: { scores: scoreDoc._id } });

//     return res.status(200).json({ message: "Score linked to user", scoreId: scoreDoc._id, range: rangeKey });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


import { Score } from "../models/Score.js";
import { User } from "../models/User.js";

export const getAllScores = async (req, res) => {
  try {
    const scores = await Score.find();
    return res.status(200).json({
      message: "Data Fetched",
      results: scores.length,
      data: scores,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getScoreByRange = async (req, res) => {
  try {
    let total_score = Number(req.params.range);

    if (total_score >= 0 && total_score <= 4) total_score = "0 – 4";
    else if (total_score <= 9) total_score = "5 – 9";
    else if (total_score <= 14) total_score = "10 – 14";
    else if (total_score <= 19) total_score = "15 – 19";
    else if (total_score <= 27) total_score = "20 – 27";
    else if (total_score > 27) total_score = "Above 27";
    else
      return res
        .status(400)
        .json({ message: "Invalid numerical score provided." });

    const score = await Score.findOne({ total_score });

    if (!score)
      return res.status(404).json({ message: "Score range not found in DB" });

    return res.status(200).json({ message: "Score Matched", score });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const createScore = async (req, res) => {
  try {
    await Score.insertMany(req.body);
    return res.status(201).json({ message: "Scores Added" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid Data Format" });
  }
};


export const submitUserScore = async (req, res) => {
  try {
    const userId = req.user?.id;
    const rawScore = Number(req.body?.score);

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (Number.isNaN(rawScore))
      return res.status(400).json({ message: "Invalid score" });

    let rangeKey;
    if (rawScore >= 0 && rawScore <= 4) rangeKey = "0 – 4";
    else if (rawScore <= 9) rangeKey = "5 – 9";
    else if (rawScore <= 14) rangeKey = "10 – 14";
    else if (rawScore <= 19) rangeKey = "15 – 19";
    else if (rawScore <= 27) rangeKey = "20 – 27";
    else rangeKey = "Above 27";

    const scoreDoc = await Score.findOne({ total_score: rangeKey });
    if (!scoreDoc)
      return res
        .status(404)
        .json({ message: "Score range not found, please seed data first" });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { scores: scoreDoc._id },
    });

    return res.status(200).json({
      message: "Score linked to user",
      scoreId: scoreDoc._id,
      range: rangeKey,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};