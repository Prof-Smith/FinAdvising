from pathlib import Path
p = Path('index.html')
if not p.exists():
    raise SystemExit('Place this script beside index.html and heatmap-progress-fix.js.')
s = p.read_text(encoding='utf-8')
tag = '<script src="heatmap-progress-fix.js"></script>'
if tag not in s:
    s = s.replace('</body>', f'{tag}\n</body>')
p.write_text(s, encoding='utf-8')
print('Updated index.html to load heatmap-progress-fix.js')
