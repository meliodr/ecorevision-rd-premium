import fitz
import os
import zipfile

pdfs_to_check = [
    "Prototipo/1716722800497.pdf",
    "Prototipo/Heuristic_Summary1-compressed.pdf",
    "Prototipo/Heuristic_Summary1_A4_compressed.pdf",
    "Prototipo/Mis Recursos Favoritos_Ing. Mario Luciano.pdf",
    "Prototipo/Semana de herramientas - Marzo 2024.pdf",
    "Prototipo/Semana de herramientas - Mayo 2024.pdf",
    "Prototipo/the-basics-of-ux-design.pdf"
]

for pdf in pdfs_to_check:
    try:
        doc = fitz.open(pdf)
        print(f"\n--- {pdf} ---")
        text = doc[0].get_text()[:500]
        print(text.replace('\n', ' '))
    except Exception as e:
        print(f"Error reading {pdf}: {e}")

zips_to_check = [
    "Prototipo/Jakob's10UsabilityHeuristics_AllPosters-20260629T120637Z-3-001.zip",
    "Proyecto_Fase1.zip",
    "Proyecto_Fase1_Completo.zip"
]

for z in zips_to_check:
    print(f"\n--- ZIP: {z} ---")
    try:
        with zipfile.ZipFile(z, 'r') as zip_ref:
            for info in zip_ref.infolist()[:10]:
                print(info.filename)
            if len(zip_ref.infolist()) > 10:
                print(f"... and {len(zip_ref.infolist()) - 10} more files")
    except Exception as e:
        print(f"Error reading {z}: {e}")
