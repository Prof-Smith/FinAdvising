# Finance and Economics Advising Portal

An interactive GitHub Pages advising tool for the **B.S. Finance** and **B.S. Economics/Finance** pathways.

## What the website does

### 1. Captures a student's academic position

The portal uses one three-state checklist for each modeled requirement:

- **Not taken**
- **In progress**
- **Completed**

Selections are stored in the browser. Students can search and filter the checklist by requirement group.

### 2. Applies pathway and curriculum rules

The site supports two pathways:

- B.S. Finance
- B.S. Economics/Finance

For both pathways, **GBA 334: Applied Decision Methods** and **ECO 311: Analytical Tools for Economists** are interchangeable. A student completes one of the two, not both.

The planner also represents prerequisite chains and Fall-only or Spring-only scheduling, including the progression through FIN 325, FIN 410, FIN 420, FIN 450, FIN 470, and FIN 498.

### 3. Generates three planning strategies

After academic-status selections are entered, the portal creates three alternatives:

- **Recommended:** prioritizes seasonal courses and prerequisite chains.
- **Balanced:** distributes major and flexible requirements more evenly.
- **Accelerated:** uses up to 18 eligible credits where possible.

Selecting a strategy updates the roadmap, projected finish, career visuals, and final report.

### 4. Builds a future-semester roadmap

The selected strategy produces a term-by-term sequence. Projected completion of one course can unlock a later course. The roadmap explains why courses were placed in each semester.

### 5. Connects courses to career clusters

The Course-to-Career Explorer links coursework to seven professional directions:

1. Investments and Wealth Management
2. Risk Management and Banking
3. Corporate Finance, Treasury, and FP&A
4. International Finance and Global Markets
5. Economics, Policy, and Applied Analysis
6. Financial Technology and Analytics
7. Insurance, Employee Benefits, and Advisory Services

Local and regional connections appear before national professional organizations. Suggested experiences help students translate coursework into portfolio projects, professional exposure, and internship preparation.

### 6. Provides three interactive Plotly visuals

#### Course constellation

Individual courses are positioned spatially according to shared career-cluster affiliations. Larger points connect to more clusters. Students can display all constellations or isolate one cluster. When one cluster is selected, only that cluster, its title, its region, and its aligned courses are rendered.

#### Coverage heatmap

The heatmap shows curricular coverage by career cluster and semester. The weighting is:

- Completed course: **1.00**
- In-progress course: **0.75**
- Course in the selected future plan: **0.50**
- Not planned: **0.00**

The **Current** column shows the percentage plus counts completed and in progress. Each future-semester cell shows:

- The projected coverage percentage
- The course or courses newly planned in that semester
- `No new planned course` when coverage does not change from a new course

Hovering over a cell displays completed courses, in-progress courses, all planned courses through that term, newly planned courses in that term, and all courses used as the cluster denominator.

#### Cluster-overlap heatmap

This matrix shows how many courses two career clusters share. Hovering over a cell lists the exact shared course codes.

### 7. Produces an advising plan report

The structured report includes:

- Pathway and planning assumptions
- Selected strategy
- Academic status
- Analytics-choice status
- Recommended semester sequence
- Career and industry connections
- Advisor-review items

The report can be copied, printed, or saved as a PDF from the browser.

## Important limitation

This website is a planning aid, not an official degree audit. Every recommendation should be checked against Program Evaluation, the current catalog, actual course availability, prerequisite grades, transfer work, substitutions, and an academic advisor.

## Deploy on GitHub Pages

1. Upload `index.html`, `README.md`, and `.nojekyll` to the repository root.
2. In **Settings > Pages**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder.
4. Save the settings.
5. Open the published Pages URL.

The Plotly visuals load through the Plotly content-delivery network and require an internet connection. The rest of the portal remains a static GitHub Pages site.

## Updating the site

The current build is contained in `index.html`. Replace that file in the repository and commit the change to `main`. If an older version remains visible, perform a hard refresh in the browser.
