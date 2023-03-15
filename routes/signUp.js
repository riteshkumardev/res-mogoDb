const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const signUp = require("../model/signUp");

// router.get("/", (req, res) => {
//   const date = new Date();
//   Handpicked.find()
//     .select(
//       "title news1 news1Link news2  news2Link news3 news3Link news4 news4Link news5 news5Link date lastUpdated  _id image"
//     )
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         handpickedData: docs.map((doc) => {
//           const news1 = doc.news1;
//           return {
//             title: doc.title,
//             date: doc.date,
//             image: doc.image,
//             news: [
//               { news: doc.news1, link: doc.news1Link },
//               { news: doc.news2, link: doc.news2Link },
//               { news: doc.news3, link: doc.news3Link },
//               { news: doc.news4, link: doc.news4Link },
//               { news: doc.news5, link: doc.news5Link },
//             ],

//             lastUpdated: doc.lastUpdated,

//             _id: doc._id,
//           };
//         }),
//       };
//       //   if (docs.length >= 0) {
//       res.status(200).json(response);
//       //   } else {
//       //       res.status(404).json({
//       //           message: 'No entries found'
//       //       });
//       //   }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.get("/", (req, res, next) => {
  signUp
    .find()
    .select("_id email username mobile password")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        success: true,
        userData: data.map((doc) => {
          return {
            email: doc.email,
            password: doc.password,
            mobile: doc.mobile,
            username: doc.username,
            _id: doc._id,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.post("/signup", async (req, res, next) => {
  const user = new signUp({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });
  const checkSave = await user.save();
  res.status(200).send({
    success: true,
    message: "Added User Successfully",
    data: checkSave,
  });
});
router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const deleteUser = await signUp.findByIdAndDelete(req.params.id);

  res.send({ success: true, data: deleteUser, message: "user Deleted" });
});

// router.get("/:id", (req, res, next) => {
//   const id = req.params.id;
//   Handpicked.findById(id)
//     .select(
//       "title news1 news1Link news2  news2Link news3 news3Link news4 news4Link news5 news5Link date lastUpdated  _id image"
//     )
//     .exec()
//     .then((doc) => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           handpickedData: doc,
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

module.exports = router;
