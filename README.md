# 🍽️ BiteBalance - מנתח תזונה חכם

אפליקציה לניתוח ארוחות ומתן המלצות תזונתיות מבוססות AI.

## 🚀 פריסה ל-Vercel (חינמי!)

### שלב 1: הכנה
1. צור חשבון ב-[Vercel](https://vercel.com) (חינמי)
2. התקן את Vercel CLI (אופציונלי):
   ```bash
   npm install -g vercel
   ```

### שלב 2: קבל מפתח API של Anthropic
1. גש ל-[Anthropic Console](https://console.anthropic.com/)
2. צור מפתח API חדש
3. שמור את המפתח - תצטרך אותו בשלב הבא

### שלב 3: פריסה

#### אופציה A: דרך הממשק (מומלץ למתחילים)
1. העלה את כל הקבצים ל-GitHub repository
2. גש ל-[Vercel](https://vercel.com)
3. לחץ על "Add New Project"
4. בחר את ה-repository שלך
5. בהגדרות Environment Variables הוסף:
   - **שם**: `ANTHROPIC_API_KEY`
   - **ערך**: המפתח שקיבלת מ-Anthropic
6. לחץ על "Deploy"

#### אופציה B: דרך CLI
1. פתח terminal בתיקיית הפרויקט
2. הרץ:
   ```bash
   vercel
   ```
3. עקוב אחר ההוראות
4. הוסף את המפתח:
   ```bash
   vercel env add ANTHROPIC_API_KEY
   ```
5. הדבק את המפתח של Anthropic
6. Deploy:
   ```bash
   vercel --prod
   ```

### שלב 4: זהו! 🎉
האפליקציה שלך עכשיו חיה באינטרנט!
Vercel ייתן לך כתובת URL כמו: `https://your-app-name.vercel.app`

## 📁 מבנה הקבצים

```
├── nutrition-analyzer.html    # האפליקציה הראשית
├── vercel.json                # הגדרות Vercel
└── api/
    ├── analyze.js            # ניתוח ארוחות
    ├── recognize.js          # זיהוי תמונות
    └── recipe.js             # יצירת מתכונים
```

## ⚙️ איך זה עובד?

1. **Frontend** (HTML) - מריץ בדפדפן של המשתמש
2. **Serverless Functions** (api/*.js) - רצות ב-Vercel
3. **Anthropic API** - מספק את ה-AI

המפתח נשמר בצורה מאובטחת ב-Vercel ולא נחשף למשתמשים!

## 💰 עלויות

- **Vercel**: חינמי לגמרי לפרויקטים אישיים
- **Anthropic API**: 
  - יש תקציב חינמי להתחלה
  - לאחר מכן: ~$3 לכל מיליון אסימונים
  - שימוש רגיל: כמה סנט ליום

## 🔒 אבטחה

- מפתח ה-API נשמר רק בשרת (Vercel)
- המשתמשים לא יכולים לראות או לגשת למפתח
- כל הקריאות ל-API עוברות דרך השרת שלך

## 🛠️ פתרון בעיות

**בעיה**: "API key not configured"
- **פתרון**: וודא שהוספת את `ANTHROPIC_API_KEY` ב-Environment Variables

**בעיה**: האפליקציה לא עובדת
- **פתרון**: בדוק ב-Vercel Logs (Dashboard → Your Project → Logs)

**בעיה**: שגיאה 429 (Too Many Requests)
- **פתרון**: המתן מעט - הגעת למגבלת ה-API

## 📞 תמיכה

- [Vercel Docs](https://vercel.com/docs)
- [Anthropic Docs](https://docs.anthropic.com)

---

**נוצר עם ❤️ בעזרת Claude**
