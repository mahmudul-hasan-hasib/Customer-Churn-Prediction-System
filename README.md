# Customer Churn Prediction System

Full-stack ML app for predicting customer churn.

## Stack

Frontend : React (Vite) + TypeScript + Tailwind  
Backend  : Django + DRF  
ML       : Scikit-learn (.pkl)  
DB       : PostgreSQL / SQLite  

## Structure

frontend/  
backend/  
models/churn_model.pkl  

## Run

### Frontend

Run `npm i` to install the dependencies.  
Run `npm run dev` to start the development server.

### Backend

Run `python -m venv venv` to create virtual environment.  
Run `venv\Scripts\activate` (Windows).  
Run `pip install -r requirements.txt`.  
Run `python manage.py migrate`.  
Run `python manage.py runserver`.

## API

POST `/api/predict/`

```json
{
  "age": 30,
  "gender": "Male",
  "tenure": 12,
  "balance": 5000
}
```

```json
{
  "churn": true,
  "probability": 0.82
}
```

## Model

models/churn_model.pkl

## Retrain

CSV → train → save → replace model
