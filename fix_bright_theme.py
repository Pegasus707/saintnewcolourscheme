import re

with open('css/style.css', 'r') as f:
    css = f.read()

# Fix the accidental replace of the nav background
# It was `background: rgba(34, 45, 41, 0.85);` at line 75, we want it bright
css = re.sub(r'background:\s*rgba\(34,\s*45,\s*41,\s*0\.85\);', 'background: rgba(255, 255, 255, 0.95);', css)

# Make sure buttons have good contrast. 
# Look for background: var(--gold) and ensure text is white or dark.
# Actually, the user wants the palette strictly.
# Palette:
# #698F87 (Light Sage)
# #3E5F58 (Dark Sage)
# #222D29 (Charcoal)
# #345E6B (Muted Teal)
# #FFFFFF (White)

replacements = [
    (r'--black: #FFFFFF;', '--black: #FAFCFB;'), # Extremely light sage tint for bg
    (r'--deep: #F7FAF9;', '--deep: #FFFFFF;'),  # Pure white for cards/secondary
    (r'--navy: #EBF1F0;', '--navy: #F0F5F4;'),
    (r'--steel: #D6E4E2;', '--steel: #E6EFEF;'),
    (r'--gold: #3E5F58;', '--gold: #698F87;'), # Primary accent is light sage
    (r'--gold-light: #698F87;', '--gold-light: #345E6B;'),
    (r'--gold-pale: #345E6B;', '--gold-pale: #3E5F58;'),
    (r'--white: #222D29;', '--white: #222D29;'), # Text is charcoal
    (r'--gray: #698F87;', '--gray: #345E6B;'),
    (r'--muted: #345E6B;', '--muted: #3E5F58;'),
    
    # We need to make sure the hero background is bright.
    # The hero bg image (if any) or grid lines.
    # Grid lines were `linear-gradient(rgba(201, 168, 76, 0.04)...`
    # We replaced it with `rgba(62, 95, 88...`. This is fine.
]

for old, new in replacements:
    css = re.sub(old, new, css)

with open('css/style.css', 'w') as f:
    f.write(css)

print("Fix applied.")
