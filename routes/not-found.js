const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
     res.render("not-found")
})

module.exports = router;

