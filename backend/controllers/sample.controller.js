const sampleController = async(req, res) => {
  try {
    const data = "Sample data processed successfully" ;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in sampleController:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}

module.exports = {
  sampleController
};