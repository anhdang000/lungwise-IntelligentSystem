# Lung Cancer Early Diagnosis and Monitoring System

**Final Assignment Report**  
*Intelligent Systems Course*

**Author:** Dang Linh Anh (2370113)  
**Supervisor:** Dr. Tran Tuan Anh  
**Date:** April 28, 2025  

![University Logo](../report/Images/Logo%20BK.png)

*Faculty of Computer Science & Engineering*  
*Vietnam National University - Ho Chi Minh City University of Technology*

---

# Final Assignment Report

## Table of Contents

- 1. Introduction
- 2. Stakeholders and Benefits
- 3. Algorithm Theory
- 4. System Design
- 5. Dataset and Preprocessing
- 6. Evaluation Results
- 7. Conclusion
- 8. References

## 1. Introduction

The Lung Cancer Early Diagnosis and Monitoring application is a web-based tool designed to assist physicians in detecting early signs of lung cancer by integrating AI-driven risk predictions with traditional clinical evaluations. By consolidating patient data, symptom summaries, and diagnostic histories, the app enhances decision-making quality and streamlines follow-up monitoring.

## 2. Stakeholders and Benefits

- **Clinicians and Healthcare Staff:** Gain a decision-support tool that highlights high‑risk patients, improves diagnostic accuracy, and reduces time spent reviewing historical records.
- **Patients:** Benefit from earlier detection and personalized monitoring plans, leading to better treatment outcomes and more timely interventions.
- **Hospital and Clinic Administrators:** Access comprehensive reports and dashboards to oversee patient populations, allocate resources efficiently, and demonstrate compliance with quality standards.
- **Data Scientists and Developers:** Leverage a modular architecture and clear data pipelines to refine models, update features, and deploy new AI services seamlessly.
- **Regulatory Bodies and Insurers:** Obtain transparent audit trails and aggregated performance metrics to ensure data privacy, model validation, and cost‑effectiveness.

## 3. Algorithm Theory

XGBoost (eXtreme Gradient Boosting) is an optimized distributed gradient boosting library that implements machine learning algorithms under the Gradient Boosting framework. Key concepts include:

- **Gradient Boosting:** Sequentially builds decision trees by fitting new models to the residual errors of prior trees.
- **Regularization:** Incorporates L1 and L2 penalties to reduce overfitting and improve generalization.
- **Tree Pruning and Sparsity Awareness:** Employs clever heuristics to handle missing values and optimize split decisions.
  This combination delivers high predictive performance and scalability for structured tabular data.

## 4. System Design

- **Frontend:** Built with React and TypeScript, using Tailwind CSS for styling and a component library for cards, forms, and charts. The UI theme employs light blue hues to foster trust and readability in clinical settings.
- **Backend API:** Developed in FastAPI (Python) and deployed as Docker services. Exposes RESTful endpoints for patient CRUD operations, symptom updates, and AI prediction requests.
- **Database:** Utilizes PostgreSQL for relational storage of patient profiles, symptom logs, and monitoring events. Supabase real-time subscriptions push updates to the client.

## 5. Dataset and Preprocessing

- **Data Source:** Historical patient records including demographics, lifestyle factors, and clinical symptoms.
- **Features Collected:** Gender, Age, Smoking, Yellow Fingers, Anxiety, Peer Pressure, Chronic Disease, Fatigue, Allergy, Wheezing, Alcohol Consumption, Coughing, Shortness of Breath, Swallowing Difficulty, Chest Pain, and confirmed Lung Cancer Diagnosis.
- **Cleaning Steps:** Handle missing entries by imputation or exclusion, normalize categorical fields with one-hot encoding, and standardize continuous variables.
- **Feature Engineering:** Create binary flags for each symptom and aggregate risk factors into a composite score.
- **Train-Test Split:** Use an 80/20 stratified split to preserve the class distribution of positive diagnoses.

## 6. Evaluation Results

- **Accuracy:** 91.07% on the hold-out set
- **Precision:** Class 0 (No Cancer): 1.00, Class 1 (Cancer): 0.90
- **Recall:** Class 0 (No Cancer): 0.58, Class 1 (Cancer): 1.00
- **F1-Score:** Class 0 (No Cancer): 0.74, Class 1 (Cancer): 0.95
- **Macro Average:** Precision: 0.95, Recall: 0.79, F1-Score: 0.84
- **Weighted Average:** Precision: 0.92, Recall: 0.91, F1-Score: 0.90
- **Confusion Matrix:** True Positives: 44, False Positives: 5, False Negatives: 0, True Negatives: 7
- **Discussion:** The model demonstrates excellent performance in identifying positive cancer cases with a perfect recall of 1.00, meaning no cancer cases were missed. While there are a few false positives (5 cases), this trade-off is acceptable in medical screening where missing a cancer case would be more problematic than a false alarm.

## 7. Conclusion

This application provides an end‑to‑end solution for early lung cancer detection and patient monitoring. By combining XGBoost predictions with clinician input, it enhances diagnostic accuracy, streamlines workflows, and supports data‑driven decision making. Future work includes expanding the dataset, integrating imaging data, and continuous model refinement.

## 8. References

- Chen, T., & Guestrin, C. (2016). XGBoost: A scalable tree boosting system. Proceedings of the 22nd ACM SIGKDD.
- Pedregosa, F. et al. (2011). Scikit-learn: Machine Learning in Python. Journal of Machine Learning Research.
- FastAPI Documentation: https://fastapi.tiangolo.com/
- React Documentation: https://reactjs.org/
