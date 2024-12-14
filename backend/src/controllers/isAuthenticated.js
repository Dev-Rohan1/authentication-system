const isAuthenticated = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "User is authenticated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unauthunticated user" });
  }
};

export default isAuthenticated;
