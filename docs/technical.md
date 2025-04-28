**Project Overview:**

Design and develop a web application tailored for doctors to facilitate the early diagnosis of potential lung cancer symptoms. The design theme should feature a light blue color scheme to appeal to medical professionals.

**Core Features and Layout:**

1. **Main Screen:**

   - Display a list of patients as the landing page.
   - Consider incorporating additional elements (e.g., search, filters, or patient summaries) to enhance usability.
2. **Patient Dashboard:** When a doctor selects a patient from the list, present a dashboard that aggregates all relevant information into clearly defined sections:

   - **Patient Personal Information:** Basic details and demographics.
   - **Current Symptoms:** A summary of the patient's present symptoms.
   - **Current Diagnosis:**
     - Display the prediction results from an AI model for lung cancer risk.
     - Include the doctor’s own diagnosis for comparison.
   - **Patient Monitoring History:**
     - A chronological record of past diagnoses, symptom changes, and follow-up notes.

**Predictive Attributes for Lung Cancer Diagnosis:**

The application should incorporate the following patient attributes for lung cancer prediction:

1. **Gender:** M (male) / F (female)
2. **Age:** Numerical age of the patient
3. **Smoking:** Yes/No
4. **Yellow Fingers:** Yes/No
5. **Anxiety:** Yes/No
6. **Peer Pressure:** Yes/No
7. **Chronic Disease:** Yes/No
8. **Fatigue:** Yes/No
9. **Allergy:** Yes/No
10. **Wheezing:** Yes/No
11. **Alcohol Consumption:** Yes/No
12. **Coughing:** Yes/No
13. **Shortness of Breath:** Yes/No
14. **Swallowing Difficulty:** Yes/No
15. **Chest Pain:** Yes/No
16. **Lung Cancer Diagnosis:** Yes/No (for confirmation or historical data)

**Objective:**

The aim is to assist doctors in making informed, early-stage diagnostic decisions by integrating both AI-driven predictions and traditional clinical insights within a user-friendly, efficient interface.

**Technical Stack:**

1. **Frontend:**

   - TypeScript: For type-safe development
   - TailwindCSS: For styling and responsive design
   - React: For building user interface components
   - Supabase Client: For real-time database interactions
2. **Backend:**

   - FastAPI: Python-based backend framework for REST API development
   - Supabase: For database and authentication services
     - PostgreSQL: As the underlying database
     - Real-time subscriptions
     - Built-in authentication
     - Row Level Security (RLS) for data protection
3. **Database Schema:**
   The application will use Supabase (PostgreSQL) with the following main tables:

   - Users (doctors)
   - Patients
   - Diagnoses
   - Symptoms
   - Medical History
