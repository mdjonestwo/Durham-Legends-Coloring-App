const ColoringSheet = require("../models/coloringSheets");

module.exports = (app) => {
  //GET ONE IMAGE
  app.get("/api/:id", (req, res) => {
    ColoringSheet.find({ _id: req.params.id })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //GET ALL IMAGES
  app.get("/api/", (req, res) => {
    ColoringSheet.find({})
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //ADD IMAGE
  app.post("/api/", (req, res) => {
    ColoringSheet.create(req.body)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
