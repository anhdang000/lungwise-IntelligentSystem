import React, { useState } from "react";
import { Patient } from "../data/patients";
import { AlertTriangle, CheckCircle, Brain, UserCircle, Edit, Save } from "lucide-react";
import { Button } from "./ui/button";

interface DiagnosisPanelProps {
  patient: Patient;
}

const DiagnosisPanel: React.FC<DiagnosisPanelProps> = ({ patient }) => {
  const [editMode, setEditMode] = useState(false);
  const [doctorDiagnosis, setDoctorDiagnosis] = useState<boolean | null>(
    patient.diagnosis.doctorDiagnosis
  );
  const [notes, setNotes] = useState("");
  
  const aiRisk = patient.diagnosis.aiPrediction;
  const riskPercentage = Math.round(patient.diagnosis.confidence * 100);
  
  const handleSave = () => {
    // In a real app, save changes to backend
    setEditMode(false);
    console.log("Saving diagnosis:", { doctorDiagnosis, notes });
  };
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-glass border border-white/20">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-medium">Diagnosis</h3>
        {!editMode ? (
          <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="gap-1">
            <Edit size={14} />
            <span>Edit</span>
          </Button>
        ) : (
          <Button onClick={handleSave} className="gap-1">
            <Save size={14} />
            <span>Save</span>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-medical-light/50 p-4 rounded-lg border border-medical-light">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-medical-light flex items-center justify-center mr-2">
              <Brain size={18} className="text-medical-dark" />
            </div>
            <span className="font-medium">AI Assessment</span>
          </div>
          
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Risk Level</span>
              <span className="text-sm font-medium">{riskPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  aiRisk ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${riskPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center">
            {aiRisk ? (
              <>
                <AlertTriangle size={18} className="text-red-500 mr-2" />
                <span className="text-red-700 font-medium">High risk of lung cancer</span>
              </>
            ) : (
              <>
                <CheckCircle size={18} className="text-green-500 mr-2" />
                <span className="text-green-700 font-medium">Low risk of lung cancer</span>
              </>
            )}
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            Last updated: {new Date(patient.diagnosis.date).toLocaleDateString()}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <UserCircle size={18} className="text-gray-700" />
            </div>
            <span className="font-medium">Doctor's Assessment</span>
          </div>
          
          {editMode ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="diagnosis"
                      checked={doctorDiagnosis === true}
                      onChange={() => setDoctorDiagnosis(true)}
                      className="mr-2 h-4 w-4 text-medical border-gray-300 focus:ring-medical"
                    />
                    <span>Positive</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="diagnosis"
                      checked={doctorDiagnosis === false}
                      onChange={() => setDoctorDiagnosis(false)}
                      className="mr-2 h-4 w-4 text-medical border-gray-300 focus:ring-medical"
                    />
                    <span>Negative</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent"
                  rows={3}
                  placeholder="Enter your diagnostic notes..."
                />
              </div>
            </>
          ) : doctorDiagnosis === null ? (
            <div className="text-gray-500 italic">
              No doctor's assessment yet. Click edit to add your diagnosis.
            </div>
          ) : (
            <div className="flex items-center">
              {doctorDiagnosis ? (
                <>
                  <AlertTriangle size={18} className="text-red-500 mr-2" />
                  <span className="text-red-700 font-medium">Positive for lung cancer</span>
                </>
              ) : (
                <>
                  <CheckCircle size={18} className="text-green-500 mr-2" />
                  <span className="text-green-700 font-medium">Negative for lung cancer</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPanel;
