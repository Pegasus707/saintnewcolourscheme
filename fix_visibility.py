import re

with open('css/style.css', 'r') as f:
    css = f.read()

# 1. Fix low-opacity text colors (0.35 to 0.55 -> 0.8)
# Only target 'color: rgba(...)' to avoid affecting borders or backgrounds
css = re.sub(r'color:\s*rgba\(34,\s*45,\s*41,\s*0\.(35|4|45|5|55)\)', 'color: rgba(34, 45, 41, 0.85)', css)

# 2. Fix invisible 'var(--black)' and 'var(--deep)' text
css = re.sub(r'color:\s*var\(--black\)', 'color: var(--white)', css)
css = re.sub(r'color:\s*var\(--deep\)', 'color: var(--white)', css)

# 3. Ensure headings are solid (sometimes they use var(--white) but might have inherited opacity)
# Actually var(--white) is #222D29, which is solid.

with open('css/style.css', 'w') as f:
    f.write(css)

print("Visibility fixes applied to style.css.")
