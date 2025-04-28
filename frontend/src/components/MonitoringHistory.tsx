
import React from "react";
import { Patient, PatientSymptoms, symptomLabels } from "../data/patients";
import { Calendar, FileText, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";

interface MonitoringHistoryProps {
  patient: Patient;
}

const MonitoringHistory: React.FC<MonitoringHistoryProps> = ({ patient }) => {
  // Combine current diagnosis with history for complete timeline
  const timeline = [
    {
      date: patient.diagnosis.date,
      notes: "Current diagnosis",
      symptoms: patient.symptoms,
      diagnosis: patient.diagnosis.aiPrediction
    },
    ...patient.history
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Function to count changed symptoms
  const getSymptomChanges = (currentSymptoms: Partial<PatientSymptoms>, index: number) => {
    if (index === timeline.length - 1) return { added: [], removed: [] };
    
    const previousSymptoms = timeline[index + 1].symptoms;
    const added: string[] = [];
    const removed: string[] = [];
    
    Object.entries(currentSymptoms).forEach(([key, value]) => {
      const symptomKey = key as keyof PatientSymptoms;
      if (value && !previousSymptoms[symptomKey]) {
        added.push(symptomLabels[symptomKey]);
      }
    });
    
    Object.entries(previousSymptoms).forEach(([key, value]) => {
      const symptomKey = key as keyof PatientSymptoms;
      if (value && !currentSymptoms[symptomKey]) {
        removed.push(symptomLabels[symptomKey]);
      }
    });
    
    return { added, removed };
  };
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-glass border border-white/20">
      <h3 className="text-lg font-medium mb-5">Monitoring History</h3>
      
      <div className="space-y-6">
        {timeline.map((entry, index) => {
          const { added, removed } = getSymptomChanges(entry.symptoms, index);
          
          return (
            <div key={entry.date} className="relative">
              {/* Timeline line */}
              {index < timeline.length - 1 && (
                <div className="absolute left-3.5 top-6 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-medical-light text-medical-dark">
                    <Calendar size={14} />
                  </div>
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-base font-medium">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    
                    {entry.diagnosis !== null && (
                      <div 
                        className={`mt-1 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          entry.diagnosis
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {entry.diagnosis ? (
                          <>
                            <AlertTriangle size={12} className="mr-1" />
                            High Risk
                          </>
                        ) : (
                          <>
                            <CheckCircle size={12} className="mr-1" />
                            Low Risk
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-start">
                      <FileText size={16} className="mt-0.5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-700">{entry.notes}</p>
                    </div>
                  </div>
                  
                  {(added.length > 0 || removed.length > 0) && (
                    <div className="mt-2 text-sm">
                      {added.length > 0 && (
                        <div className="flex items-center text-red-600">
                          <span className="font-medium mr-1">New symptoms:</span>
                          <span>{added.join(", ")}</span>
                        </div>
                      )}
                      
                      {removed.length > 0 && (
                        <div className="flex items-center text-green-600 mt-1">
                          <span className="font-medium mr-1">Improved:</span>
                          <span>{removed.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonitoringHistory;
