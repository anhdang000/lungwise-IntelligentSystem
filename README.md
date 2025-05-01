# LungWise: Lung Cancer Early Diagnosis and Monitoring System

**Final Assignment Report**
*Intelligent Systems Course*

**Author:** Dang Linh Anh (2370113)
**Supervisor:** Dr. Tran Tuan Anh
**Date:** April 28, 2025

*Faculty of Computer Science & Engineering*
*Vietnam National University - Ho Chi Minh City University of Technology*

## Project Overview

LungWise is a web-based tool that helps doctors detect early signs of lung cancer by combining AI-driven risk predictions with traditional clinical assessments. The system gathers patient data, summarizes symptoms, tracks diagnostic history, and improves decision-making quality while streamlining future monitoring procedures.

## Project Structure

```
lungwise-IntelligentSystem/
├── backend/                 # Python FastAPI backend server
├── docs/                    # Documentation files
│   ├── report.md
│   └── technical.md
├── frontend/                # React/TypeScript frontend application
│   ├── public/              # Static assets
│   └── src/                 # Source code
│       ├── components/      # React components
│       │   ├── ui/          # Shadcn UI components
│       │   └── ...          # Application-specific components
│       ├── data/            # Mock data and data models
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility libraries
│       ├── pages/           # Page components
│       └── utils/           # Utility functions
├── model/                   # ML model development and training
│   ├── data/                # Dataset directory
│   │   └── lung_cancer.csv  # Lung cancer dataset
│   ├── lungwise-eda-model.ipynb  # Jupyter notebook for EDA and model development
│   ├── main.py              # Main model execution script
│   └── pyproject.toml       # Python project dependencies
└── report/                  # LaTeX report files
    ├── main.tex             # Main report document
    ├── refs.bib             # Bibliography
    └── Images/              # Report images and diagrams
```

## Dataset

The model uses a lung cancer dataset (`model/data/lung_cancer.csv`) with the following features:

| Feature               | Description                                       |
| --------------------- | ------------------------------------------------- |
| GENDER                | Patient gender (M/F)                              |
| AGE                   | Patient age                                       |
| SMOKING               | Smoking status (1: Non-smoker, 2: Smoker)         |
| YELLOW_FINGERS        | Presence of yellow fingers (1: No, 2: Yes)        |
| ANXIETY               | Presence of anxiety (1: No, 2: Yes)               |
| PEER_PRESSURE         | Presence of peer pressure (1: No, 2: Yes)         |
| CHRONIC DISEASE       | Presence of chronic disease (1: No, 2: Yes)       |
| FATIGUE               | Presence of fatigue (1: No, 2: Yes)               |
| ALLERGY               | Presence of allergies (1: No, 2: Yes)             |
| WHEEZING              | Presence of wheezing (1: No, 2: Yes)              |
| ALCOHOL CONSUMING     | Alcohol consumption (1: No, 2: Yes)               |
| COUGHING              | Presence of coughing (1: No, 2: Yes)              |
| SHORTNESS OF BREATH   | Presence of shortness of breath (1: No, 2: Yes)   |
| SWALLOWING DIFFICULTY | Presence of swallowing difficulty (1: No, 2: Yes) |
| CHEST PAIN            | Presence of chest pain (1: No, 2: Yes)            |
| LUNG_CANCER           | Target variable (YES/NO)                          |

## System Components

### Frontend

The frontend is built using:

- React with TypeScript
- Shadcn UI components for a consistent design
- Vite as the development and build tool

Key frontend components include:

- Patient Dashboard for viewing individual patient details
- Patient List for browsing all patients
- Diagnosis Panel for risk assessment
- Symptoms Summary for visualizing patient symptoms
- Monitoring History to track changes over time

### Backend

The backend is implemented using:

- FastAPI (Python) for RESTful API endpoints
- PostgreSQL database for data storage

### Machine Learning Model

The predictive model is developed using:

- XGBoost algorithm for classification
- Python data science stack (pandas, scikit-learn)
- Feature engineering based on clinical indicators
