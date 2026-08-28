# Finance Student Success Portal

A static, mobile-friendly GitHub Pages prototype for finance advising. It includes a completed-course checklist, basic prerequisite logic, eligibility suggestions, a critical finance sequence, degree-pathway notes, local browser saving, and a printable advising snapshot.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root.
3. Open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

## Preview locally

Because the site loads JSON, run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Update the curriculum

Edit `assets/data/courses.json`. Each record supports:

- `code`
- `title`
- `credits`
- `term`
- `year`
- `category`
- `prerequisites`
- optional `note`

Course codes in `prerequisites` must match another course's `code` exactly.

## Important limitation

This prototype is based on the supplied 2025-2026-and-forward advising checklist plus the correction that Risk Analysis is **FIN 470**. It is not an official degree audit. The source checklist contains catalog-year, transfer-student, prerequisite, Foundation/University Explorations, double-major, and 3+1 caveats that should be validated before production use.
