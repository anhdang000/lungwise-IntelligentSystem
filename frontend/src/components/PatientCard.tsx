
import React from "react";
import { User, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { Patient } from "../data/patients";
import { Link } from "react-router-dom";

interface PatientCardProps {
  patient: Patient;
  viewMode?: "grid" | "list";
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, viewMode = "grid" }) => {
  const { id, name, age, gender, diagnosis, dateAdded } = patient;
  
  const riskStatus = diagnosis.aiPrediction
    ? "high"
    : "low";
    
  const statusColors = {
    high: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-100",
      icon: <AlertTriangle size={16} className="text-red-500" />
    },
    low: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-100",
      icon: <CheckCircle size={16} className="text-green-500" />
    }
  };
  
  const status = statusColors[riskStatus];
  
  return (
    <Link 
      to={`/patients/${id}`}
      className={`block ${viewMode === "list" ? "w-full" : ""}`}
    >
      <div className={`card-glass rounded-xl p-5 card-hover ${viewMode === "list" ? "flex items-center justify-between" : ""}`}>
        {viewMode === "grid" ? (
          // Grid view layout
          <>
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-medical-light flex items-center justify-center">
                    <User size={16} className="text-medical-dark" />
                  </div>
                  <h3 className="font-medium text-base">{name}</h3>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                  <span>{age} yrs</span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100">
                    {gender === "M" ? "Male" : "Female"}
                  </span>
                </div>
              </div>
              
              <div 
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1 ${status.bg} ${status.text} ${status.border}`}
              >
                {status.icon}
                <span>{riskStatus === "high" ? "High Risk" : "Low Risk"}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 mt-2 pt-3">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1.5" />
                <span>Added on {new Date(dateAdded).toLocaleDateString()}</span>
              </div>
            </div>
          </>
        ) : (
          // List view layout
          <>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center">
                <User size={20} className="text-medical-dark" />
              </div>
              <div>
                <h3 className="font-medium text-base">{name}</h3>
                <div className="flex items-center text-sm text-gray-500 space-x-3">
                  <span>{age} yrs</span>
                  <span>{gender === "M" ? "Male" : "Female"}</span>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1.5" />
                    <span>{new Date(dateAdded).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center space-x-1 ${status.bg} ${status.text} ${status.border}`}
            >
              {status.icon}
              <span>{riskStatus === "high" ? "High Risk" : "Low Risk"}</span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default PatientCard;
