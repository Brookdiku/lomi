const employees = require("../Model/Employee");

const handleGetEmployees = async (req, res) => {
  res.json(await employees.find({}).exec());
};
const handleRegisterEmployee = async (req, res) => {
  if (!req?.body)
    return res
      .status(400)
      .json({ message: "firstname and lastname required!" });
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname)
    return res
      .status(400)
      .json({ message: "firstname and lastname required!" }); //bad request
  const duplicate = await employees.findOne({
    $and: [
      { first_name: firstname.toLowerCase() },
      { last_name: lastname.toLowerCase() },
    ],
  });
  if (duplicate) return res.status(409).json({ message: "Employee exist!" });
  const result = await employees.create({
    first_name: firstname.toLowerCase(),
    last_name: lastname.toLowerCase(),
  });
  if (result) res.status(200).json({ message: "Employee added successfully!" });
};
const handleDeleteEmployee = async (req, res) => {
  if (!req?.params.id) return res.sendStatus(400);
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    employees
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        if (!result)
          return res.status(204).json({ message: "no employee found." });
        res.status(200).json({ message: "employee deleted successfully." });
      })
      .catch((err) => console.log(err));
  } else res.sendStatus(400); // bad request
};
const handleGetEmployee = async (req, res) => {
  if (!req?.params.id) return res.sendStatus(400);
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    await employees
      .findOne({ _id: req.params.id })
      .then((result) => {
        if (!result)
          return res.status(204).json({ message: "no employee found." });
        return res.status(200).json({ result });
      })
      .catch((err) => console.log(err));
  } else res.sendStatus(400);
};
const handleUpdateEmployee = async (req, res) => {
  if (!req?.params.id) return res.sendStatus(400);
  if (!req.body)
    return res.status(400).json({ message: "firstname or lastname required!" });
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname)
    return res.status(400).json({ message: "firstname or lastname required!" });
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    await employees.findOne({ _id: req.params.id }).then((result) => {
      if (!result)
        return res.status(404).json({ message: "no employee found" });
      employees
        .updateOne(
          { _id: req.params.id },
          {
            first_name: firstname.toLowerCase(),
            last_name: lastname.toLowerCase(),
          }
        )
        .then((result) => {
          console.log(result);
          if (!result)
            return res.status(204).json({ message: "no employee found." });
          return res
            .status(200)
            .json({ message: "employee updated successfully." });
        })
        .catch((err) => console.log(err));
    });
  } else res.sendStatus(400);
};
module.exports = {
  handleDeleteEmployee,
  handleUpdateEmployee,
  handleGetEmployee,
  handleGetEmployees,
  handleRegisterEmployee,
};
