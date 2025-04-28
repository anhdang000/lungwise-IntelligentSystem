export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  dateAdded: string;
  symptoms: PatientSymptoms;
  diagnosis: {
    aiPrediction: boolean;
    doctorDiagnosis: boolean | null;
    confidence: number;
    date: string;
  };
  history: {
    date: string;
    notes: string;
    symptoms: Partial<PatientSymptoms>;
    diagnosis: boolean | null;
  }[];
}

export interface PatientSymptoms {
  smoking: boolean;
  yellowFingers: boolean;
  anxiety: boolean;
  peerPressure: boolean;
  chronicDisease: boolean;
  fatigue: boolean;
  allergy: boolean;
  wheezing: boolean;
  alcoholConsuming: boolean;
  coughing: boolean;
  shortnessOfBreath: boolean;
  swallowingDifficulty: boolean;
  chestPain: boolean;
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "Nguyễn Văn Minh",
    age: 56,
    gender: "M",
    dateAdded: "2023-10-15",
    symptoms: {
      smoking: true,
      yellowFingers: true,
      anxiety: true,
      peerPressure: false,
      chronicDisease: true,
      fatigue: true,
      allergy: false,
      wheezing: true,
      alcoholConsuming: true,
      coughing: true,
      shortnessOfBreath: true,
      swallowingDifficulty: false,
      chestPain: true
    },
    diagnosis: {
      aiPrediction: true,
      doctorDiagnosis: null,
      confidence: 0.89,
      date: "2023-10-16"
    },
    history: [
      {
        date: "2023-09-01",
        notes: "Patient reported occasional coughing, no other symptoms.",
        symptoms: {
          coughing: true
        },
        diagnosis: false
      },
      {
        date: "2023-09-20",
        notes: "Follow-up: Patient now experiencing shortness of breath and fatigue.",
        symptoms: {
          coughing: true,
          shortnessOfBreath: true,
          fatigue: true
        },
        diagnosis: false
      }
    ]
  },
  {
    id: "P002",
    name: "Trần Thị Hương",
    age: 42,
    gender: "F",
    dateAdded: "2023-10-10",
    symptoms: {
      smoking: false,
      yellowFingers: false,
      anxiety: true,
      peerPressure: false,
      chronicDisease: false,
      fatigue: true,
      allergy: true,
      wheezing: false,
      alcoholConsuming: false,
      coughing: true,
      shortnessOfBreath: false,
      swallowingDifficulty: false,
      chestPain: false
    },
    diagnosis: {
      aiPrediction: false,
      doctorDiagnosis: false,
      confidence: 0.95,
      date: "2023-10-11"
    },
    history: [
      {
        date: "2023-08-15",
        notes: "Initial visit for persistent cough.",
        symptoms: {
          coughing: true
        },
        diagnosis: false
      }
    ]
  },
  {
    id: "P003",
    name: "Lê Đức Tuấn",
    age: 68,
    gender: "M",
    dateAdded: "2023-10-05",
    symptoms: {
      smoking: true,
      yellowFingers: true,
      anxiety: false,
      peerPressure: false,
      chronicDisease: true,
      fatigue: true,
      allergy: false,
      wheezing: true,
      alcoholConsuming: false,
      coughing: true,
      shortnessOfBreath: true,
      swallowingDifficulty: true,
      chestPain: true
    },
    diagnosis: {
      aiPrediction: true,
      doctorDiagnosis: true,
      confidence: 0.92,
      date: "2023-10-06"
    },
    history: [
      {
        date: "2023-07-10",
        notes: "Patient complaining of chronic cough and fatigue.",
        symptoms: {
          coughing: true,
          fatigue: true
        },
        diagnosis: false
      },
      {
        date: "2023-08-20",
        notes: "Symptoms worsening, added chest pain and wheezing.",
        symptoms: {
          coughing: true,
          fatigue: true,
          chestPain: true,
          wheezing: true
        },
        diagnosis: false
      },
      {
        date: "2023-09-15",
        notes: "Shortness of breath developed, referred for detailed examination.",
        symptoms: {
          coughing: true,
          fatigue: true,
          chestPain: true,
          wheezing: true,
          shortnessOfBreath: true
        },
        diagnosis: null
      }
    ]
  },
  {
    id: "P004",
    name: "Phạm Thị Mai",
    age: 35,
    gender: "F",
    dateAdded: "2023-10-12",
    symptoms: {
      smoking: false,
      yellowFingers: false,
      anxiety: true,
      peerPressure: false,
      chronicDisease: false,
      fatigue: true,
      allergy: true,
      wheezing: true,
      alcoholConsuming: false,
      coughing: true,
      shortnessOfBreath: true,
      swallowingDifficulty: false,
      chestPain: false
    },
    diagnosis: {
      aiPrediction: false,
      doctorDiagnosis: null,
      confidence: 0.78,
      date: "2023-10-13"
    },
    history: [
      {
        date: "2023-09-05",
        notes: "Patient visited for seasonal allergies and wheezing.",
        symptoms: {
          allergy: true,
          wheezing: true
        },
        diagnosis: false
      }
    ]
  },
  {
    id: "P005",
    name: "Võ Quang Hùng",
    age: 51,
    gender: "M",
    dateAdded: "2023-10-08",
    symptoms: {
      smoking: true,
      yellowFingers: false,
      anxiety: false,
      peerPressure: false,
      chronicDisease: true,
      fatigue: true,
      allergy: false,
      wheezing: true,
      alcoholConsuming: true,
      coughing: true,
      shortnessOfBreath: true,
      swallowingDifficulty: false,
      chestPain: true
    },
    diagnosis: {
      aiPrediction: true,
      doctorDiagnosis: null,
      confidence: 0.86,
      date: "2023-10-09"
    },
    history: [
      {
        date: "2023-08-10",
        notes: "Patient reported chest discomfort and occasional wheezing.",
        symptoms: {
          wheezing: true,
          chestPain: true
        },
        diagnosis: false
      },
      {
        date: "2023-09-25",
        notes: "Developed persistent cough and shortness of breath.",
        symptoms: {
          wheezing: true,
          chestPain: true,
          coughing: true,
          shortnessOfBreath: true
        },
        diagnosis: null
      }
    ]
  },
  {
    id: "P006",
    name: "Đỗ Thị Lan",
    age: 44,
    gender: "F",
    dateAdded: "2023-10-03",
    symptoms: {
      smoking: false,
      yellowFingers: false,
      anxiety: true,
      peerPressure: false,
      chronicDisease: false,
      fatigue: true,
      allergy: false,
      wheezing: false,
      alcoholConsuming: false,
      coughing: true,
      shortnessOfBreath: false,
      swallowingDifficulty: false,
      chestPain: true
    },
    diagnosis: {
      aiPrediction: false,
      doctorDiagnosis: false,
      confidence: 0.93,
      date: "2023-10-04"
    },
    history: [
      {
        date: "2023-09-15",
        notes: "Initial visit for chest discomfort during exercise.",
        symptoms: {
          chestPain: true
        },
        diagnosis: false
      }
    ]
  }
];

export function getPatientById(id: string): Patient | undefined {
  return patients.find(patient => patient.id === id);
}

export const symptomLabels: Record<keyof PatientSymptoms, string> = {
  smoking: "Smoking",
  yellowFingers: "Yellow Fingers",
  anxiety: "Anxiety",
  peerPressure: "Peer Pressure",
  chronicDisease: "Chronic Disease",
  fatigue: "Fatigue",
  allergy: "Allergy",
  wheezing: "Wheezing",
  alcoholConsuming: "Alcohol Consumption",
  coughing: "Coughing",
  shortnessOfBreath: "Shortness of Breath",
  swallowingDifficulty: "Swallowing Difficulty",
  chestPain: "Chest Pain"
};
