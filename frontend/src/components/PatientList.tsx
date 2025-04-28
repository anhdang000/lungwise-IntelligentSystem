
import React, { useState } from "react";
import { patients } from "../data/patients";
import PatientCard from "./PatientCard";
import { Search, Filter, Users, AlertTriangle, LayoutGrid, LayoutList } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const filteredPatients = patients.filter(patient => {
    // Apply search filter
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply risk filter
    const matchesRisk = riskFilter === null || 
      (riskFilter === "high" && patient.diagnosis.aiPrediction) ||
      (riskFilter === "low" && !patient.diagnosis.aiPrediction);
    
    return matchesSearch && matchesRisk;
  });
  
  const highRiskCount = patients.filter(p => p.diagnosis.aiPrediction).length;
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Patient Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage and monitor your patients</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent w-full md:w-auto"
              />
            </div>
            
            <div className="relative">
              <select
                value={riskFilter || ""}
                onChange={e => setRiskFilter(e.target.value || null)}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent"
              >
                <option value="">All Risks</option>
                <option value="high">High Risk</option>
                <option value="low">Low Risk</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <LayoutList size={18} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel rounded-xl p-5 flex items-center">
          <div className="w-12 h-12 rounded-full bg-medical/10 flex items-center justify-center mr-4">
            <Users size={24} className="text-medical" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-2xl font-semibold">{patients.length}</p>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-5 flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">High Risk Patients</p>
            <p className="text-2xl font-semibold">{highRiskCount}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Patient List</h3>
        {filteredPatients.length === 0 ? (
          <div className="text-center py-8 bg-white/70 rounded-xl">
            <p className="text-gray-500">No patients found matching your criteria.</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "flex flex-col space-y-4"
          }>
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
