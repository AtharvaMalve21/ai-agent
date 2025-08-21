const List = require("../models/List");
const Agent = require("../models/Agent");
const csv = require("csv-parser");

exports.addList = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No CSV file uploaded." });
    }

    const filePath = req.file.path;
    const results = [];

    // Parse CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        // Clean and validate data
        const firstName =
          data["FirstName"] || data["firstname"] || data["First Name"] || "";
        const phone =
          data["Phone"] ||
          data["phone"] ||
          data["Mobile"] ||
          data["mobile"] ||
          "";
        const notes = data["Notes"] || data["notes"] || data["Note"] || "";

        if (firstName.trim() && phone.trim()) {
          results.push({
            firstName: firstName.trim(),
            phone: phone.trim(),
            notes: notes.trim(),
          });
        }
      })
      .on("end", async () => {
        try {
          if (results.length === 0) {
            fs.unlinkSync(filePath); // Clean up
            return res
              .status(400)
              .json({ message: "CSV file contains no valid data." });
          }

          // Get all agents
          const agents = await Agent.find().select("-password");
          if (agents.length === 0) {
            fs.unlinkSync(filePath); // Clean up
            return res
              .status(400)
              .json({ message: "No agents available for distribution." });
          }

          // Distribute items among agents
          const distributedData = distributeItems(results, agents);

          // Save to database
          const list = new List({
            filename: req.file.originalname,
            originalData: results,
            distributedData,
          });

          await list.save();

          // Clean up uploaded file
          fs.unlinkSync(filePath);

          res.json({
            message: "CSV processed and distributed successfully",
            totalItems: results.length,
            totalAgents: agents.length,
            listId: list._id,
          });
        } catch (dbError) {
          console.error("Database save error:", dbError);
          fs.unlinkSync(filePath); // Clean up
          res.status(500).json({ message: "Error saving to database" });
        }
      })
      .on("error", (csvError) => {
        console.error("CSV parsing error:", csvError);
        fs.unlinkSync(filePath); // Clean up
        res.status(400).json({ message: "Error parsing CSV file" });
      });
  } catch (error) {
    console.error("Upload error:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up
    }
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find()
      .populate("distributedData.agentId", "name email")
      .sort({ createdAt: -1 });

    res.json(lists);
  } catch (error) {
    console.error("Get lists error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate(
      "distributedData.agentId",
      "name email"
    );

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(list);
  } catch (error) {
    console.error("Get list error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

function distributeItems(items, agents) {
  const itemsPerAgent = Math.floor(items.length / agents.length);
  const remainingItems = items.length % agents.length;

  const distributedData = [];
  let currentIndex = 0;

  agents.forEach((agent, index) => {
    const itemsForThisAgent = itemsPerAgent + (index < remainingItems ? 1 : 0);
    const agentItems = items.slice(
      currentIndex,
      currentIndex + itemsForThisAgent
    );

    distributedData.push({
      agentId: agent._id,
      agentName: agent.name,
      items: agentItems,
    });

    currentIndex += itemsForThisAgent;
  });

  return distributedData;
}
