from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Initialisation de l'API web
app = FastAPI(title="SkillLink Backend", description="API REST pour la plateforme SkillLink")

# =====================================================================
# BLOC BASE DE DONNÉES & INTÉGRATIONS
# =====================================================================

# TODO Firestore Database (Connexion et requêtes CRUD pour les profils, messages et services)

# TODO Paiement Stripe (Gestion des paiements côté serveur)

# TODO Paiement CinetPay (Alternative de paiement pour l'Afrique francophone)

# =====================================================================
# MODÈLES DE DONNÉES (Pydantic)
# =====================================================================

class LoginRequest(BaseModel):
    email: str
    password: str

class AiPromptRequest(BaseModel):
    role: str
    context: str
    query: str

class ServiceItem(BaseModel):
    id: str
    title: str
    provider_name: str
    price: int
    category: str

# =====================================================================
# ROUTES D'AUTHENTIFICATION
# =====================================================================

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    """
    Point d'entrée pour la connexion utilisateur.
    Délègue l'authentification réelle à Firebase.
    """
    # Verify mock logic. Replace with true verification.
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Emails et mots de passe requis")
        
    return {
        "status": "success",
        "token": "mocked_jwt_token_12345",
        "user_info": {
            "email": req.email,
            "role": "client" if "client" in req.email else "entrepreneur"
        }
    }

# =====================================================================
# ROUTES MARKETPLACE & RECHERCHE
# =====================================================================

@app.get("/api/services", response_model=List[ServiceItem])
async def search_services(category: Optional[str] = None, max_price: Optional[int] = None):
    """
    Cherche et filtre les prestations disponibles sur la plateforme.
    """
    mock_db = [
        {"id": "1", "title": "Création de site E-commerce", "provider_name": "Alice Studio", "price": 1200, "category": "dev"},
        {"id": "2", "title": "Logo & Identité Visuelle", "provider_name": "Bob Design", "price": 400, "category": "design"},
    ]
    
    # Fake filtering
    results = mock_db
    if category:
        results = [s for s in results if s["category"] == category]
    if max_price:
        results = [s for s in results if s["price"] <= max_price]
        
    return results

# =====================================================================
# ROUTES ASSISTANT IA (OPENAI)
# =====================================================================

@app.post("/api/ai/assistant")
async def ask_ai_assistant(req: AiPromptRequest):
    """
    Utilise OpenAI pour assister les clients et les entrepreneurs.
    Client -> Création de cahier des charges
    Entrepreneur -> Optimisation de bio / fixation de prix
    """
    
    # TODO OpenAI API (Appels API pour l'assistant IA de rédaction et de recommandation)
    
    if req.role == "client":
        mock_response = "Voici une esquisse de cahier des charges pour votre projet : 1. Objectifs 2. Fonctionnalités..."
    else:
        mock_response = "Pour rendre votre service plus attractif, voici une bio optimisée et une suggestion tarifaire..."
        
    return {
        "status": "success",
        "suggestion": mock_response
    }

# =====================================================================
# EXÉCUTION SERVEUR (DEV LOCALE)
# =====================================================================
if __name__ == "__main__":
    # Permet de lancer le backend indépendamment lors des tests en local : python main.py
    uvicorn.run(app, host="0.0.0.0", port=8000)
