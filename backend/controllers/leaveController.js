const Joi = require("joi");
const { Employee } = require("../models/employeeModel");
const { LeaveApplication } = require("../models/leaveModel");
const {
  LeaveApplicationValidation,
  LeaveApplicationHRValidation
} = require("../validations/leavelValidation");

// find  all LeaveApplication Employee
const getAllLeaveApplication = async (req, res) => {
  console.log("byeeee", req.params.id);
  Employee.findById(req.params.id)
    .populate({
      path: "leaveApplication"
    })
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(employee);
      }
    });
};

// find  all LeaveApplication Admin Hr
const getAllLeaveApplicationHr = async (req, res) => {
  const { hr, manager } = req.body;

  // Build the match condition based on whether hr or manager is provided
  let matchCondition = {};
  if (hr) {
    matchCondition = {
      $or: [{ "employeeDetails.reportHr": hr }, { aditionalManager: hr }]
    };
  } else if (manager) {
    matchCondition = {
      $or: [
        { "employeeDetails.reportManager": manager },
        { aditionalManager: manager }
      ]
    };
  }

  try {
    const leaveApplications = await LeaveApplication.aggregate([
      {
        $lookup: {
          from: "employees", // The name of the employee collection
          localField: "employee", // The field in the LeaveApplication collection that references the employee
          foreignField: "_id", // The field in the employee collection to match
          as: "employeeDetails"
        }
      },
      {
        $unwind: "$employeeDetails"
      },
      {
        $match: matchCondition
      },
      {
        $project: {
          FirstName: "$employeeDetails.FirstName",
          LastName: "$employeeDetails.LastName",
          empID: "$employeeDetails.empID",
          Email: "$employeeDetails.Email",
          empObjID: "$employeeDetails._id",
          reportHr: "$employeeDetails.reportHr",
          reportManager: "$employeeDetails.reportManager",
          Leavetype: 1,
          FromDate: 1,
          ToDate: 1,
          Reasonforleave: 1,
          Status: 1,
          aditionalManager: 1,
          createdOn: 1,
          reasonOfRejection: 1,
          updatedBy: 1
        }
      }
    ]);

    res.send(leaveApplications);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

// create a LeaveApplication
const createLeaveApplication = async (req, res) => {
  console.log("body1111111111111111111", req.body);
  Joi.validate(req.body, (err, result) => {
    if (err) {
      console.log("hiiiiii", err);
      res.status(400).send(err.details[0].message);
    } else {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          let newLeaveApplication;
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id,
            aditionalManager: req.body.aditionalManager,
            managerEmail: req.body.managerEmail
          };
          console.log(newLeaveApplication);
          console.log("errr1");

          LeaveApplication.create(
            newLeaveApplication,
            function (err, leaveApplication) {
              if (err) {
                console.log("errr1", err);
                res.send("error");
              } else {
                employee.leaveApplication.push(leaveApplication);
                employee.save(function (err, data) {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log(data);
                    res.send(leaveApplication);
                  }
                });
                console.log("new leaveApplication Saved");
              }
            }
          );
          console.log(req.body);
        }
      });
    }
  });
};

// find and update the LeaveApplication
const updateLeaveApplication = async (req, res) => {
  Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;

      newLeaveApplication = {
        Leavetype: req.body.Leavetype,
        FromDate: req.body.FromDate,
        ToDate: req.body.ToDate,
        Reasonforleave: req.body.Reasonforleave,
        Status: req.body.Status,
        employee: req.params.id
      };

      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        newLeaveApplication,
        function (err, leaveApplication) {
          if (err) {
            res.send("error");
          } else {
            res.send(newLeaveApplication);
          }
        }
      );
    }
  });
};

// find and update the LeaveApplication adminHr
const updateLeaveApplicationHr = async (req, res) => {
  //   Joi.validate(req.body, LeaveApplicationHRValidation, (err, result) => {
  Joi.validate(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    } else {
      let newLeaveApplication;
      // console.log(req.body);
      newLeaveApplication = {
        Status: req.body.Status,
        updatedBy: req.body.updatedBy,
        reasonOfRejection: req.body.reasonOfRejection
      };
      LeaveApplication.findByIdAndUpdate(
        req.params.id,
        {
          $set: newLeaveApplication
        },
        function (err, numberAffected) {
          // console.log(numberAffected);
          res.send(newLeaveApplication);
        }
      );
    }
  });
};

// // find and delete the LeaveApplication Employee
const deleteLeaveApplication = async (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      LeaveApplication.findByIdAndRemove(
        { _id: req.params.id2 },
        function (err, leaveApplication) {
          if (!err) {
            console.log("LeaveApplication deleted");
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        }
      );
      console.log("delete");
      console.log(req.params.id);
    }
  });
};

// // find and delete the LeaveApplication AdminHr
const deleteLeaveApplicationHr = async (req, res) => {
  Employee.findById({ _id: req.params.id }, function (err, employee) {
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      LeaveApplication.findByIdAndRemove(
        { _id: req.params.id2 },
        function (err, leaveApplication) {
          if (!err) {
            console.log("LeaveApplication deleted");
            Employee.update(
              { _id: req.params.id },
              { $pull: { leaveApplication: req.params.id2 } },
              function (err, numberAffected) {
                console.log(numberAffected);
                res.send(leaveApplication);
              }
            );
          } else {
            console.log(err);
            res.send("error");
          }
        }
      );
      console.log("delete");
      console.log(req.params.id);
    }
  });
};


const moments = require('moment-timezone');
const getLeaveApplicationNo = async (req, res) => {
 try {
   const { email } = req.body;
   console.log('Email:', email);

   // Find the list of employees reporting to the given email
   const listOfEmployees = await Employee.find({
     $or: [{ reportHr: email }, { reportManager: email }]
    // Account: { $in: [2, 3, 4] }
   }).select("_id");

   // Calculate today's date in 'YYYY-MM-DD' format
   const today = moments().tz('Asia/Kolkata').format('YYYY-MM-DD');
   console.log('Today (IST):', today);

   // Map over the list of employees to find leave applications with the given conditions
   const leaveRequestPromises = listOfEmployees.map((val) => {
   
     const query = {
       employee: val._id,
       Status: "2",
       $expr: {
         $and: [
           { $gte: [{ $dateToString: { format: "%Y-%m-%d", date: "$FromDate" } }, today] },
           { $lte: [{ $dateToString: { format: "%Y-%m-%d", date: "$ToDate" } }, today] }
         ]
       }
     };
 
   
     return LeaveApplication.find(query);
   });

   // Await the completion of all leave application queries
   const leaveRequests = await Promise.all(leaveRequestPromises);
 

   // Flatten the array of leave requests
   const flattenedLeaveRequests = leaveRequests.flat();
   const obj= {
     totalEmployee: listOfEmployees.length,
     onLeave: flattenedLeaveRequests.length,
   
   }


   // Send the result as a response
   res.status(200).json(obj);
 } catch (error) {
   console.error('Error fetching leave applications:', error);
   res.status(500).json({ error: 'Internal Server Error' });
 }
};


module.exports = {
  getAllLeaveApplication,
  getAllLeaveApplicationHr,

  createLeaveApplication,

  updateLeaveApplication,
  updateLeaveApplicationHr,

  deleteLeaveApplication,
  deleteLeaveApplicationHr,
  getLeaveApplicationNo
};
