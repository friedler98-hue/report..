# Fault Report Mini App + Google Sheets

דף "אפליקציה" סטטי (GitHub Pages) שמדבר עם Google Sheets דרך Google Apps Script Web App.

## מה יש כאן
- `index.html` דף בית (בחירת מתחם)
- `site.html` תצוגת תקלות למתחם + כפתור "דיווח חדש"
- `new.html` טופס 3 שלבים כמו בדוגמה שלך
- `all.html` כל התקלות עם סינונים
- `app.js` קונפיג + פונקציות API
- `styles.css` עיצוב "אפליקציה"
- `apps_script_Code.gs` קוד השרת (Apps Script)

## 1) Google Sheet
צור Google Sheet עם Sheet בשם **Reports** ובשורה 1 כותרות:
`id,timestamp,site,area,type,item,desc,urgency,status,imageUrl`

## 2) Apps Script (API)
ב-Google Sheets:
Extensions → Apps Script  
הדבק את הקוד מהקובץ `apps_script_Code.gs` לתוך `Code.gs`

Deploy → New deployment → Web app  
Execute as: Me  
Who has access: לבחירתך

קבל URL שמסתיים ב-`/exec`

## 3) חיבור האפליקציה ל-API
פתח `app.js` והדבק את ה-URL בתוך:
`const API_URL = "..."`

## 4) GitHub Pages
העלה את כל הקבצים לריפו ציבורי בגיטהאב.
Settings → Pages → Deploy from a branch → main / root

הקישור שלך יהיה:
`https://USERNAME.github.io/REPO/`
