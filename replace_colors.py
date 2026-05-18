import re

with open('css/style.css', 'r') as f:
    css = f.read()

# Make it a Bright Theme
replacements = [
    # Variables in :root (already partly replaced, but we will reset them)
    (r'--black: #1a221f;', '--black: #FFFFFF;'),
    (r'--deep: #222D29;', '--deep: #F7FAF9;'),
    (r'--navy: #3E5F58;', '--navy: #EBF1F0;'),
    (r'--steel: #345E6B;', '--steel: #D6E4E2;'),
    (r'--gold: #698F87;', '--gold: #3E5F58;'),
    (r'--gold-light: #8baea7;', '--gold-light: #698F87;'),
    (r'--gold-pale: #dce7e5;', '--gold-pale: #345E6B;'),
    (r'--white: #FFFFFF;', '--white: #222D29;'),
    (r'--gray: #a9bebb;', '--gray: #698F87;'),
    (r'--muted: #8baea7;', '--muted: #345E6B;'),
    (r'--border: rgba\(105, 143, 135, 0.2\);', '--border: rgba(62, 95, 88, 0.2);'),
    (r'--border-light: rgba\(255, 255, 255, 0.06\);', '--border-light: rgba(34, 45, 41, 0.1);'),

    # Hardcoded RBGA conversions
    # Gold (201, 168, 76) -> Dark Sage (62, 95, 88)
    (r'rgba\(201,\s*168,\s*76', 'rgba(62, 95, 88'),
    
    # White (248, 246, 240) -> Charcoal (34, 45, 41)
    (r'rgba\(248,\s*246,\s*240', 'rgba(34, 45, 41'),
    
    # Black (10, 10, 18) -> White (255, 255, 255)
    (r'rgba\(10,\s*10,\s*18', 'rgba(255, 255, 255'),
    
    # Pure White (255, 255, 255) -> Charcoal (34, 45, 41) for borders/hovers in dark mode -> light mode
    (r'rgba\(255,\s*255,\s*255', 'rgba(34, 45, 41'),
    
    # Specific color for gradients
    (r'rgba\(30,\s*45,\s*61', 'rgba(214, 228, 226'), # Was steel

    # Revert image filters since background is bright now
    (r'filter:\s*brightness\(0\)\s*invert\(1\);', '/* filter removed for bright theme */'),
]

for old, new in replacements:
    css = re.sub(old, new, css)

with open('css/style.css', 'w') as f:
    f.write(css)

print("Colors replaced.")
