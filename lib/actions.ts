"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { parseStringify } from "./utils";
import { query } from '@/lib/MySQL/db';
import Patient from "@/models/Patient";
import { RowDataPacket } from 'mysql2';
//import { Doctor } from "@/types/index";

export const register = async (values: any) => {
    const { email, password, name, phone } = values;

    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name,
          email,
          password: hashedPassword,
          phone
        });
        const savedUser = await user.save();
        //console.log("User created with ID:", savedUser);

        return  savedUser._id.toString();

    }catch(e){
        console.log(e);
    }
}

export const UpdatePatient = async (patient: any) => {
    const {
        _id,
        name,
        email,
        phone,
        birthDate,
        gender,
        address,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        primaryPhysician,
        insuranceProvider,
        insurancePolicyNumber,
        allergies,
        currentMedication,
        familyMedicalHistory,
        pastMedicalHistory,
        identificationType,
        identificationNumber,
        identificationDocument,
        treatmentConsent,
        disclosureConsent,
        privacyConsent,
    } = patient;

    try {
        // Connect to MongoDB
        await connectDB();

        // Update MongoDB patient data
        const updatedPatientMDB = await Patient.findByIdAndUpdate(
            _id,
            {
                birthDate,
                gender,
                address,
                occupation,
                emergencyContactName,
                emergencyContactNumber,
                primaryPhysician,
                insuranceProvider,
                insurancePolicyNumber,
                allergies,
                currentMedication,
                familyMedicalHistory,
                pastMedicalHistory,
                identificationType,
                identificationNumber,
                identificationDocument,
                treatmentConsent,
                disclosureConsent,
                privacyConsent,
            },
            { new: true } // Ensures the returned document is the updated one
        );

        await User.findByIdAndUpdate(
            _id,
            {
                name,
                email,
                phone,
            },
            { new: true } // Ensures the returned document is the updated one
        )

        // Prepare SQL data
        const patientDataSQL = {
            name,
            email,
            phone,
            birthDate,
        };

        // Update SQL patient data
        const sql = "UPDATE patient SET ? WHERE _id = ?";
        await query(sql, [patientDataSQL, _id]);

        return updatedPatientMDB._id.toString();
    } catch (error) {
        console.error("Error updating patient:", error);
        throw error; // Propagate the error
    }
};





export const getUser = async (userId: string) => {
    try {
        await connectDB();
        const user = await User.findById(userId);
        return parseStringify(user);
    } catch (e) {
        console.log(e);
    }
}

export const getAllPatientUserIds = async () => {
    try {
        //console.log("Fetching patient userIds...");
      // Query to get all userIds from the patients table
        const sql = 'SELECT * FROM patient';
        const results = await query(sql, []);
        return results;
        

      
      // Log all userIds to the console
    } catch (error) {
        return error;
      console.error("Error fetching patient userIds:", error);
    }
};
  
export const RegisterPatient = async (patient: any) => {
    const { _id, name, email, phone, birthDate, gender, address, occupation, emergencyContactName, emergencyContactNumber, primaryPhysician, insuranceProvider, insurancePolicyNumber, allergies, currentMedication, familyMedicalHistory, pastMedicalHistory, identificationType, identificationNumber, identificationDocument, treatmentConsent, disclosureConsent, privacyConsent, } = patient;
    
    try {
        const patientDataMDB = new Patient({
            _id,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            identificationDocument, // Array to store file paths or URLs
            treatmentConsent,
            disclosureConsent,
            privacyConsent
        });

        const patientDataSQL = {
            _id,
            name,
            email,
            phone,
            birthDate
        }
    
         await connectDB();

        const response = await patientDataMDB.save();

        const sql = 'INSERT INTO patient SET ?';

        await query(sql, [patientDataSQL]);

        return response._id.toString();
    } catch (error) {
        console.log(error);
        return error;
    }
};
    
export const getAppointments = async (userId: string) => {

};

export const getPatient = async (userId: string) => {
    try {
        const sql = 'SELECT * FROM patient WHERE _id = ?';
        const rows = await query(sql, [userId]);
        if ((rows as any).length > 0) {
            return true;
        } else { return false; }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getDoctors = async () => { 
   
    const sql = 'select * from doctors';
    const rows = await query(sql, []) ;
    return rows;

}

export const createAppointment = async (appointment: any) => { 
    const { userId, doctorId, schedule, reason, notes, status } = appointment;
    try {
        const app_sql = {
            user_id: userId, 
            doctor_id: doctorId,
            schedule: schedule,
            reason: reason,
            notes: notes,
            status: status
        }
        const sql = 'INSERT INTO appointments SET ?';

        const response = await query(sql, [app_sql]);
        console.log("LOOOOOOKKK",response);
        if(response === undefined){return "Error: Duplicate appointment: A doctor cannot have more than one appointment at the same schedule."}

        return (response as any).insertId; 


        
    } catch (error) {
        console.log(error);
        return error;
    }

}

export const getAppointment = async (appointmentId: string) => { 

    const sql = 'SELECT * FROM appointments WHERE id = ?';
    const rows = await query(sql, [appointmentId]);
    return rows;
}


export const getDoctorbyId = async (doctor_id: Number) => { 

    const sql = 'SELECT * FROM doctors where id = ?';
    const rows = await query(sql, [doctor_id]) ;
    return rows;
}

export const getRecentAppointmentList = async (userId: string) => { 
    const sql = 'SELECT * FROM appointments WHERE user_id = ? ORDER BY schedule DESC';
    const rows = await query(sql, [userId]);
    return rows;
}

export const cancelappt = async (appointmentId: Number) => {
    const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
    const status = "cancelled"; // The new status for the appointment
    await query(sql, [status, appointmentId]);
};



export const getPatientData = async (userId: string) => { 
    await connectDB();
    const patient = await Patient.findOne({ _id: userId });
    return parseStringify(patient);
}



export const login = async (values: { email: any; password: any; }) => {
        const { email, password } = values;
    
        try {
            // Connect to the database
            await connectDB();
    
            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    error: 'User not found!',
                };
            }
    
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    error: 'Invalid password!',
                };
            }
    
            return {
                userId: user._id.toString(),
            };
        } catch (error) {
            console.error(error);
            return {
                error: 'An error occurred during login. Please try again later.',
            };
        }
    };
    

