import fitz
import os
import re

pdfs = [
    "Fundamentos del diseño_ Heurísticas de UX (Parte 1).pdf",
    "Fundamentos del diseño_ Heurísticas de UX (Parte 2).pdf",
    "Leyes de UX.pdf",
    "Steve Krug - Don't Make Me Think - 3rd Edition (2013, Pearson Education).pdf",
    "Buenas prácticas_ Espaciados en UI.pdf",
    "Auditoría y Análisis UX.pdf",
    "TendenciasUXUI-2024.pdf",
    "Cómo llevar a cabo un benchmark.pdf",
    "card sorting.pdf"
]

for pdf in pdfs:
    try:
        doc = fitz.open(f"Prototipo/{pdf}")
        print(f"\n--- {pdf} ---")
        # Extract TOC
        toc = doc.get_toc()
        if toc:
            for item in toc[:15]: # Print first 15 items of TOC
                print(f"TOC: {item[1]}")
        else:
            # Extract first 3 pages of text if no TOC
            text = ""
            for i in range(min(3, len(doc))):
                text += doc[i].get_text()
            
            # Print first 500 characters
            print(text[:500].replace('\n', ' '))
    except Exception as e:
        print(f"Error reading {pdf}: {e}")
