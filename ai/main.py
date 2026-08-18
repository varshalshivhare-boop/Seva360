import random
from typing import Optional, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Seva360 AI Microservice",
    description="Crowd density estimation, wait time prediction, and slot optimization API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WaitTimeRequest(BaseModel):
    slotTime: str = Field(default="09:00 - 10:00 AM")
    date: str = Field(default="2026-08-18")
    pax: int = Field(default=1)

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "service": "Seva360 AI Microservice",
        "engine": "FastAPI + ML Predictor v1.0"
    }

@app.post("/predict-wait-time")
def predict_wait_time(data: WaitTimeRequest):
    time_str = data.slotTime.lower()
    is_peak = "08:0" in time_str or "09:00" in time_str or "18:00" in time_str
    
    base_wait = 35 if is_peak else 15
    estimated_wait_mins = max(5, int(base_wait + (data.pax * 2)))
    
    crowd_level = "Low" if estimated_wait_mins < 20 else ("Moderate" if estimated_wait_mins < 40 else "High")

    return {
        "success": True,
        "slotTime": data.slotTime,
        "date": data.date,
        "pax": data.pax,
        "predictedWaitMins": estimated_wait_mins,
        "crowdLevel": crowd_level,
        "aiRecommendation": "Ideal slot! Queue is moving smoothly." if crowd_level == "Low" else "Moderate wait. Arrive 10 mins early."
    }

@app.get("/crowd-density")
def get_crowd_density():
    return [
        {"zoneId": "zone-1", "zoneName": "Main Entrance Gate", "occupancyPercentage": random.randint(35, 65), "densityLevel": "Moderate"},
        {"zoneId": "zone-2", "zoneName": "Holding Queue Complex", "occupancyPercentage": random.randint(20, 50), "densityLevel": "Low"},
        {"zoneId": "zone-3", "zoneName": "Garbhagriha (Sanctum Sanctorum)", "occupancyPercentage": random.randint(75, 92), "densityLevel": "High"},
        {"zoneId": "zone-4", "zoneName": "Annadanam (Prasadam Hall)", "occupancyPercentage": random.randint(40, 70), "densityLevel": "Moderate"}
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
