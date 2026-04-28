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

## Frontend

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Backend

Run `python -m venv venv` to create virtual environment.

Run `venv\Scripts\activate` (Windows).

Run `pip install -r requirements.txt` to install dependencies.

Run `python manage.py migrate`.

Run `python manage.py runserver`.

## API

POST `/api/predict/`

Request:
```json
{
  "age": 30,
  "gender": "Male",
  "tenure": 12,
  "balance": 5000
}
```

Response:
```json
{
  "churn": true,
  "probability": 0.82
}
```

## Model

Model path: `models/churn_model.pkl`

Active model used for prediction.  
Fallback to local `.pkl` if no active model.

## Retrain

Upload CSV → train model → save `.pkl` → replace active model.

## Run

Frontend : http://localhost:5173  
Backend  : http://localhost:8000  

## Errors

`map is not a function` → API not returning array  

## Todo

- auth (JWT)  
- model versioning  
- docker  
- CI/CD  