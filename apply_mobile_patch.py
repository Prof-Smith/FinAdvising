from pathlib import Path
p=Path('index.html')
if not p.exists(): raise SystemExit('Place this script beside index.html, mobile.css, and mobile.js.')
s=p.read_text(encoding='utf-8')
if 'mobile.css' not in s: s=s.replace('</head>','<link rel="stylesheet" href="mobile.css">\n</head>')
if 'mobile.js' not in s: s=s.replace('</body>','<script src="mobile.js"></script>\n</body>')
p.write_text(s,encoding='utf-8')
print('Updated index.html for mobile assets.')
