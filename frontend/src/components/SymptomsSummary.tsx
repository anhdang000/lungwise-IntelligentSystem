import React, { useState } from "react";
import { PatientSymptoms, symptomLabels } from "../data/patients";
import { Check, X, Edit, Save } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Checkbox } from "./ui/checkbox";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface SymptomsSummaryProps {
  symptoms: PatientSymptoms;
  patientId: string;
  lastUpdated?: string;
  onUpdateSymptoms?: (symptoms: PatientSymptoms, notes: string) => void;
}

const SymptomsSummary: React.FC<SymptomsSummaryProps> = ({ 
  symptoms, 
  patientId, 
  lastUpdated,
  onUpdateSymptoms 
}) => {
  const [open, setOpen] = useState(false);
  // Count positive symptoms
  const positiveCount = Object.values(symptoms).filter(Boolean).length;
  const totalSymptoms = Object.keys(symptoms).length;
  const percentage = Math.round((positiveCount / totalSymptoms) * 100);
  
  // Group symptoms into columns for display
  const symptomsEntries = Object.entries(symptoms) as [keyof PatientSymptoms, boolean][];
  const column1 = symptomsEntries.slice(0, Math.ceil(symptomsEntries.length / 2));
  const column2 = symptomsEntries.slice(Math.ceil(symptomsEntries.length / 2));
  
  const canEdit = onUpdateSymptoms !== undefined;
  const lastUpdatedText = lastUpdated 
    ? `Last updated ${formatDistanceToNow(new Date(lastUpdated))} ago` 
    : "";
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-glass border border-white/20">
      <div className="mb-5 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium mb-2">Symptoms Summary</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-100 rounded-full h-2.5 mr-2">
              <div 
                className="bg-medical h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500">{positiveCount}/{totalSymptoms}</span>
          </div>
          {lastUpdatedText && (
            <p className="text-xs text-gray-500 mt-1">{lastUpdatedText}</p>
          )}
        </div>
        
        {canEdit && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit size={14} />
                <span>Edit</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>Update Symptoms</SheetTitle>
              </SheetHeader>
              <UpdateSymptomsForm 
                initialSymptoms={symptoms} 
                onSubmit={(data) => {
                  onUpdateSymptoms(data.symptoms, data.notes);
                  setOpen(false);
                }}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          {column1.map(([key, value]) => (
            <SymptomItem 
              key={key} 
              name={symptomLabels[key]} 
              value={value} 
            />
          ))}
        </div>
        <div className="space-y-2">
          {column2.map(([key, value]) => (
            <SymptomItem 
              key={key} 
              name={symptomLabels[key]} 
              value={value} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface SymptomItemProps {
  name: string;
  value: boolean;
}

const SymptomItem: React.FC<SymptomItemProps> = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{name}</span>
      {value ? (
        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
          <Check size={14} className="text-red-500" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
          <X size={14} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

interface UpdateSymptomsFormProps {
  initialSymptoms: PatientSymptoms;
  onSubmit: (data: { symptoms: PatientSymptoms; notes: string }) => void;
}

interface FormValues {
  symptoms: PatientSymptoms;
  notes: string;
}

const UpdateSymptomsForm: React.FC<UpdateSymptomsFormProps> = ({ initialSymptoms, onSubmit }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      symptoms: { ...initialSymptoms },
      notes: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Symptoms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(symptomLabels).map(([key, label]) => (
              <FormField
                key={key}
                control={form.control}
                name={`symptoms.${key as keyof PatientSymptoms}`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">{label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Notes</h4>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Add any observations or notes about the symptoms..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default SymptomsSummary;
