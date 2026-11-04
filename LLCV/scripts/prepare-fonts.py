"""Prepare local fonts for this deck. Requires fonttools and brotli.

MiSans outlines are preserved, with only a WOFF2 container conversion.
Noto Serif SC is subset under the SIL Open Font License.
"""

from pathlib import Path
import os
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

sys.stdout.reconfigure(encoding='utf-8')
project = Path(__file__).resolve().parents[1]
output = project / 'public' / 'fonts'
output.mkdir(parents=True, exist_ok=True)
local_fonts = Path(os.environ['LOCALAPPDATA']) / 'Microsoft/Windows/Fonts'

for source, target in [
    ('MiSans-Regular.ttf', 'misans-regular.woff2'),
    ('MiSans-Semibold.ttf', 'misans-semibold.woff2'),
]:
    font = TTFont(local_fonts / source)
    font.flavor = 'woff2'
    font.save(output / target)
    print(f'{target}: {(output / target).stat().st_size:,} bytes')

text_parts = []
for pattern in ['*.md', '*.ts', 'components/*.vue']:
    text_parts.extend(p.read_text(encoding='utf-8') for p in project.glob(pattern))
characters = ''.join(text_parts)
font = TTFont(Path(os.environ['WINDIR']) / 'Fonts/NotoSerifSC-VF.ttf')
options = subset.Options()
options.flavor = 'woff2'
options.name_IDs = ['*']
options.name_legacy = True
options.name_languages = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
font.flavor = 'woff2'
font.save(output / 'noto-serif-sc-subset.woff2')
print(f'noto-serif-sc-subset.woff2: {(output / "noto-serif-sc-subset.woff2").stat().st_size:,} bytes')
