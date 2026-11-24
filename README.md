# Reels and studying survey

Anonymous 10-question survey (form + dashboard + Excel import), built for Vercel.

## Pages
- `/`       the survey students fill in
- `/admin`  password-protected dashboard: live charts, Excel import, template, Excel export, reset

## Deploy on Vercel (about 5 minutes)
1. Put this folder in a GitHub repo (the folder itself is the project root).
2. On vercel.com choose Add New > Project, import the repo, keep the defaults, Deploy.
3. In the project open the Storage tab > Create > Blob. Name it anything, connect it to the project
   (all environments). Vercel adds the access token automatically. Public or private both work.
4. Project > Settings > Environment Variables: add `ADMIN_PASSWORD` with a password you choose.
5. Deployments > Redeploy (so the new variables apply).
6. Open `/api/health`; it should show `"problem": null`.
7. Test the form once, check `/admin`, then use "Delete all responses" to clear the test.

Data is stored in Vercel Blob only: one tiny file per response (the answers are in the file name).

## Excel import
Dashboard > Download template. One respondent per row, columns Q1 to Q10.
Fill with option numbers (1-4, or 1-5 for agree scales) or the exact option text (see the Codes sheet).
Invalid rows are listed and skipped; valid rows are imported after you confirm.

## Questionnaire
Edit `public/questions.js` to change wording. If you change the number of questions or options,
also update `MAX` in `api/_lib.js`.
