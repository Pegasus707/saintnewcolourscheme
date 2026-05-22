import re

with open('css/style.css', 'r') as f:
    css = f.read()

# 1. Variables
css = re.sub(r'--black: #0a0a0a;', '--black: #FFFFFF;', css)
css = re.sub(r'--deep: #0f1219;', '--deep: #F7FAF9;', css)
css = re.sub(r'--navy: #111827;', '--navy: #F0F5F4;', css)
css = re.sub(r'--steel: #1e2d3d;', '--steel: #E6EFEF;', css)

css = re.sub(r'--gold: #c9a84c;', '--gold: #3E5F58;', css) # Primary buttons / Accents -> Dark Sage for contrast
css = re.sub(r'--gold-light: #e8c97a;', '--gold-light: #698F87;', css) # Hovers -> Light Sage
css = re.sub(r'--gold-pale: #f5e8c0;', '--gold-pale: #DCE7E5;', css) # Pale accents -> Pale Sage

css = re.sub(r'--white: #f8f6f0;', '--white: #222D29;', css) # Main Text -> Charcoal

css = re.sub(r'--gray: #8a9bb0;', '--gray: #698F87;', css)
css = re.sub(r'--muted: #4a5568;', '--muted: #345E6B;', css)

css = re.sub(r'--border: rgba\(201, 168, 76, 0.2\);', '--border: rgba(62, 95, 88, 0.2);', css) # 3E5F58
css = re.sub(r'--border-light: rgba\(255, 255, 255, 0.06\);', '--border-light: rgba(34, 45, 41, 0.1);', css) # 222D29

# 2. Hardcoded Nav Background
css = re.sub(r'background: rgba\(10, 10, 18, 0.85\);', 'background: rgba(255, 255, 255, 0.95);', css)

# 3. Hardcoded text opacities (was white text 248, 246, 240) -> (Charcoal 34, 45, 41)
css = re.sub(r'rgba\(248,\s*246,\s*240', 'rgba(34, 45, 41', css)

# 4. Hardcoded Gold opacities (201, 168, 76) -> (Dark Sage 62, 95, 88)
css = re.sub(r'rgba\(201,\s*168,\s*76', 'rgba(62, 95, 88', css)

# 5. Hardcoded White highlights in dark mode -> Charcoal lowlights in light mode (34, 45, 41)
css = re.sub(r'rgba\(255,\s*255,\s*255', 'rgba(34, 45, 41', css)

# 6. Hardcoded Gradients
css = re.sub(r'rgba\(30,\s*45,\s*61', 'rgba(230, 239, 239', css) # Steel gradient -> Light Teal gradient

# Replace hex gradients:
css = re.sub(r'#0a0a12', '#FFFFFF', css) # Darkest background -> White
css = re.sub(r'#0f1828', '#F7FAF9', css) # Dark blue -> Pale Sage
css = re.sub(r'#0a0f18', '#F0F5F4', css) # Darker blue -> Even Paler Sage
css = re.sub(r'#0f1219', '#F7FAF9', css)
css = re.sub(r'#1a2a1a', '#E6EFEF', css) # Dark green -> Light Teal

# 7. Specific element colors
css = re.sub(r'color: #000;', 'color: #FFFFFF;', css) # Button text on Dark Sage background -> White

with open('css/style.css', 'w') as f:
    f.write(css)

print("Bright Theme applied.")
