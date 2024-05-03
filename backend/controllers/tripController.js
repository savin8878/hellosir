// controllers/tripController.js
import { Data } from "../db.js";
import { updateSheetWithData } from "../googleSheets.js";

export async function handleTripDataPost(req, res) {
    const { tripTableData, employee, employeename, type, department, sno } = req.body;
    const data = new Data({
        EmployeeId: employee,
        EmployeeName: employeename,
        Type: type,
        Department: department,
        SRNumber: sno || 2,
        Data: tripTableData,
    });
    try {
        await data.save();
        res.status(204).send();
        sample();
    } catch (error) {
        console.error("Error saving trip data:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function sample() {
    try {
        const documents = await Data.find({});
        let arr = [];
        for (let i = 0; i < documents.length; i++) {
            const { EmployeeId, EmployeeName, Type, Department, SRNumber, Data: tripData } = documents[i];
            for (let j = 0; j < tripData.length; j++) {
                const { Date, Day, Country, State, City, ClientName, Purpose, Remarks } = tripData[j];
                arr.push([EmployeeId.join(", "), EmployeeName.join(", "), Type, Department, SRNumber, Date, Day, Country, State, City, ClientName, Purpose, Remarks]);
            }
        }
        console.log(arr);
        await updateSheetWithData(arr);
    } catch (error) {
        console.error("Error processing trip data:", error);
    }
}

export async function getData(req, res) {
    try {
        const documents = await Data.find({});
        const formattedData = documents.flatMap(doc => {
            const { EmployeeId, EmployeeName, Type, Department, SRNumber, Data: tripData } = doc;
            return tripData.map(({ Date, Day, Country, State, City, ClientName, Purpose, Remarks }) => ({
                EmployeeId: EmployeeId.join(", "),
                EmployeeName: EmployeeName.join(", "),
                Type,
                Department,
                SRNumber,
                Date,
                Day,
                Country,
                State,
                City,
                ClientName,
                Purpose,
                Remarks
            }));
        });
        res.json(formattedData);
    } catch (error) {
        console.error("Error retrieving trip data:", error);
        res.status(500).send("Internal Server Error");
    }
}