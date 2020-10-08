const getHomePage = (req, res) => {
     res.render("index")
}

const getWelcomePage = (req, res) => {
     res.render("welcome")
}

module.exports = {
     getHomePage,
     getWelcomePage
}