import re

with open('css/style.css', 'r') as f:
    css = f.read()

replacements = [
    # Replace DM Sans and Syne with Helvetica
    (r"font-family:\s*'DM Sans',\s*sans-serif;", "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"),
    (r"font-family:\s*'Syne',\s*sans-serif;", "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"),
    
    # Replace Cormorant Garamond with Instrument Serif
    (r"font-family:\s*'Cormorant Garamond',\s*serif;", "font-family: 'Instrument Serif', serif;"),
    
    # Update default body font
    (r"font-family:\s*system-ui,\s*-apple-system,\s*sans-serif;", "font-family: 'Instrument Serif', serif;"),
]

for old, new in replacements:
    css = re.sub(old, new, css)

with open('css/style.css', 'w') as f:
    f.write(css)

print("Typography updated in style.css.")
