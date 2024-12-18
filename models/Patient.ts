import mongoose, { Schema, model } from "mongoose";

// Define the PatientDocument interface
export interface PatientDocument {
  _id: string; // Corresponds to UserDocument._id
  birthDate: Date;
  gender: "Male" | "Female" | "Other";
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocument: Buffer; // Array to store file paths or URLs
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Patient schema
const PatientSchema = new Schema<PatientDocument>(
  {
    _id: {
        type: String,
        required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: false,
    },
    emergencyContactName: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number"],
    },
    primaryPhysician: {
      type: String,
      required: false,
    },
    insuranceProvider: {
      type: String,
      required: false,
    },
    insurancePolicyNumber: {
      type: String,
      required: false,
    },
    allergies: {
      type: String,
      required: false,
    },
    currentMedication: {
      type: String,
      required: false,
    },
    familyMedicalHistory: {
      type: String,
      required: false,
    },
    pastMedicalHistory: {
      type: String,
      required: false,
    },
    identificationType: {
      type: String,
      required: false,
    },
    identificationNumber: {
      type: String,
      required: false,
    },
    identificationDocument: {
      type: Buffer, // Array of strings for file paths or URLs
      required: false,
    },
    treatmentConsent: {
      type: Boolean,
      required: true,
    },
    disclosureConsent: {
      type: Boolean,
      required: true,
    },
    privacyConsent: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Define the Patient model
const Patient = mongoose.models?.Patient || model<PatientDocument>("Patient", PatientSchema);
export default Patient;
