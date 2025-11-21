import Reflection from "../models/Reflection.js";

export const getReflections = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Find all reflections for the user, sorted by newest first
    const reflections = await Reflection.find({ userId }).sort({ timestamp: -1 });

    return res.status(200).json({
      message: "Reflections retrieved successfully",
      reflections
    });
  } catch (error) {
    console.error("getReflections error:", error);
    return res.status(500).json({ message: "Error retrieving reflections" });
  }
};

export const createReflection = async (req, res) => {
  try {
    const { userId, text } = req.body;

    // Validate that text exists
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // Create and save new reflection
    const reflection = new Reflection({
      userId,
      text: text.trim()
    });

    const savedReflection = await reflection.save();

    // Return saved reflection
    return res.status(201).json({
      message: "Reflection saved successfully",
      reflection: savedReflection
    });
  } catch (error) {
    console.error("createReflection error:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error saving reflection" });
  }
};

