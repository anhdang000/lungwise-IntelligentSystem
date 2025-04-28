
import React, { useState } from "react";
import { Patient, PatientSymptoms } from "../data/patients";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SymptomsSummary from "./SymptomsSummary";
import DiagnosisPanel from "./DiagnosisPanel";
import MonitoringHistory from "./MonitoringHistory";
import { useToast } from "@/hooks/use-toast";

interface PatientDashboardProps {
  patient: Patient;
  onUpdatePatient?: (updatedPatient: Patient) => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, onUpdatePatient }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastSymptomUpdate, setLastSymptomUpdate] = useState<string | undefined>(
    patient.history.length > 0 ? patient.history[0].date : undefined
  );
  
  // Check if we can edit symptoms today (once per day)
  const canUpdateSymptoms = () => {
    if (!lastSymptomUpdate) return true;
    
    const lastUpdate = new Date(lastSymptomUpdate);
    const today = new Date();
    
    // Reset hours, minutes, seconds and milliseconds to compare dates only
    lastUpdate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    // Allow update if the last update was not today
    return lastUpdate.getTime() !== today.getTime();
  };
  
  const handleUpdateSymptoms = (symptoms: PatientSymptoms, notes: string) => {
    if (!onUpdatePatient) return;
    
    const now = new Date().toISOString();
    
    // Update patient history with new symptoms record
    const updatedHistory = [
      {
        date: now,
        notes: notes,
        symptoms: symptoms,
        diagnosis: null,
      },
      ...patient.history,
    ];
    
    // Create updated patient object
    const updatedPatient = {
      ...patient,
      symptoms: symptoms,
      history: updatedHistory,
    };
    
    // Update the patient
    onUpdatePatient(updatedPatient);
    setLastSymptomUpdate(now);
    
    // Show success toast
    toast({
      title: "Symptoms updated",
      description: "Patient symptoms have been successfully updated.",
    });
  };
  
  if (!patient) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Patient not found</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-medical text-white rounded-md hover:bg-medical-dark"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-medical transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="glass-panel rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mr-4">
              <User size={28} className="text-medical-dark" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{patient.name}</h2>
              <div className="flex items-center mt-1 space-x-4 text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{patient.age} years</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-gray-100">
                  {patient.gender === "M" ? "Male" : "Female"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-1" />
            <span>Patient since {new Date(patient.dateAdded).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SymptomsSummary 
          symptoms={patient.symptoms} 
          patientId={patient.id}
          lastUpdated={lastSymptomUpdate}
          onUpdateSymptoms={canUpdateSymptoms() ? handleUpdateSymptoms : undefined} 
        />
        <DiagnosisPanel patient={patient} />
      </div>
      
      <div className="mb-6">
        <MonitoringHistory patient={patient} />
      </div>
    </div>
  );
};

export default PatientDashboard;
