# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from transformers import pipeline

# app = FastAPI(title="News Analyzer API")

# # --- CORS setup ---
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],        # allow all origins for testing
#     allow_credentials=True,
#     allow_methods=["*"],        # allow POST, GET, OPTIONS
#     allow_headers=["*"],        # allow headers like Content-Type
# )

# # Zero-shot classifier for fake/real news
# # classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
# classifier = pipeline("text-classification", model="mrm8488/bert-tiny-finetuned-fake-news-detection")
# class AnalyzeRequest(BaseModel):
#     text: str

# class AnalyzeResponse(BaseModel):
#     summary: str
#     fakeNewsScore: float
#     isRealNews: bool
#     confidence: float
#     highlightedWords: list[str]

# SUSPICIOUS_WORDS = ["breaking", "huge", "massive", "incredible", "shocking", "exclusive"]

# @app.post("/api/analyze", response_model=AnalyzeResponse)
# async def analyze_news(request: AnalyzeRequest):
#     text = request.text.strip()
#     if not text:
#         raise HTTPException(status_code=400, detail="Text is empty")

#     # --- Generate summary ---
#     sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]
#     summary = ". ".join(sentences[:2]) + ("." if sentences else "")

#     # --- Zero-shot classification ---
#     try:
#         result = classifier(text, candidate_labels=["real", "fake"])
#         label_scores = dict(zip(result["labels"], result["scores"]))
#         is_real = label_scores.get("real", 0) > label_scores.get("fake", 0)
#         confidence = round(label_scores["real"] * 100 if is_real else label_scores["fake"] * 100, 2)
#         fake_news_score = 100 - confidence if is_real else confidence
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

#     # --- Highlight suspicious words ---
#     words = text.lower().split()
#     highlighted = [w for w in words if any(sw in w for sw in SUSPICIOUS_WORDS)]
#     highlighted = list(dict.fromkeys(highlighted))  # remove duplicates

#     return AnalyzeResponse(
#         summary=summary,
#         fakeNewsScore=fake_news_score,
#         isRealNews=is_real,
#         confidence=confidence,
#         highlightedWords=highlighted
#     )

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="News Analyzer API")

# Load fake news detection model
try:
    classifier = pipeline(
        "text-classification", 
        model="mrm8488/bert-tiny-finetuned-fake-news-detection"
    )
except Exception as e:
    raise RuntimeError(f"Error loading model: {str(e)}")

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    summary: str
    fakeNewsScore: float
    isRealNews: bool
    confidence: float
    highlightedWords: list[str]

SUSPICIOUS_WORDS = ["breaking", "huge", "massive", "incredible", "shocking", "exclusive"]

@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze_news(request: AnalyzeRequest):
    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text is empty")

    # --- Generate summary ---
    sentences = [s.strip() for s in text.replace("\n", " ").split(".") if s.strip()]
    summary = ". ".join(sentences[:2]) + ("." if sentences else "")

    try:
        result = classifier(text)[0]  # e.g., {'label': 'FAKE', 'score': 0.92}
        label = result["label"].lower()
        score = result["score"] * 100

        is_real = label == "real"
        confidence = round(score, 2)
        fake_news_score = 100 - confidence if is_real else confidence

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

    # --- Highlight suspicious words ---
    words = text.lower().split()
    highlighted = [w for w in words if any(sw in w for sw in SUSPICIOUS_WORDS)]
    highlighted = list(dict.fromkeys(highlighted))

    return AnalyzeResponse(
        summary=summary,
        fakeNewsScore=fake_news_score,
        isRealNews=is_real,
        confidence=confidence,
        highlightedWords=highlighted
    )
