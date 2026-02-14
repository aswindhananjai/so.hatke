# So Hatke - Asset Management Guide

## 📁 Folder Structure

```
so.hatke/
├── assets/
│   ├── denim/          # Denim jacket images (by brand & color)
│   └── graphics/       # Design element images (transparent PNGs)
├── data/
│   ├── denim-canvas.csv    # Brand options
│   ├── denim-colors.csv    # Color options
│   └── graphics.csv        # Design graphics
└── logo.png            # So Hatke logo
```

---

## 🎨 Adding Denim Canvas Images

### Location
Place denim jacket images in: `assets/denim/`

### Naming Convention
Format: `{brand}-{color}.jpg`

Examples:
- `levis-light.jpg` (Levi's Light Wash)
- `levis-dark.jpg` (Levi's Dark Wash)
- `levis-black.jpg` (Levi's Black)
- `levis-ombre.jpg` (Levi's Custom Ombre)
- `zara-light.jpg`
- `hm-black.jpg`
- `thrifted-dark.jpg`

### Image Specifications
- **Format**: JPG or PNG
- **Recommended Size**: 800x800px (1:1 aspect ratio)
- **Background**: Transparent or white
- **View**: Front view of jacket, centered
- **Quality**: High resolution for zoom

### CSV Management: `data/denim-canvas.csv`

To add a new brand:
```csv
id,brand,price,image_filename
newbrand,New Brand Name,2999,newbrand.jpg
```

**Fields:**
- `id`: Unique identifier (lowercase, no spaces)
- `brand`: Display name
- `price`: Base price in INR (numbers only)
- `image_filename`: Base filename (will be combined with color)

---

## 🌈 Adding Denim Colors

### CSV Management: `data/denim-colors.csv`

To add a new color:
```csv
id,color_name,color_code,image_filename
navy,Navy Blue,#001F3F,navy.jpg
```

**Fields:**
- `id`: Unique identifier (lowercase, no spaces)
- `color_name`: Display name
- `color_code`: Hex color code or "gradient"
- `image_filename`: Suffix for jacket images

**Note**: For each brand-color combination, you need an image file:
- Example: If you add "navy" color, you need `levis-navy.jpg`, `zara-navy.jpg`, etc.

---

## 🎨 Adding Design Graphics

### Location
Place graphic images in: `assets/graphics/`

### Image Specifications
- **Format**: PNG with transparency
- **Recommended Size**: 400x400px to 600x600px
- **Background**: Transparent
- **Style**: High contrast, bold colors
- **Quality**: Vector-based or high-res raster

### Naming Convention
Use descriptive names matching the CSV:
- `ace-of-spades.png`
- `lightning-mcqueen.png`
- `karan-aujla.png`
- `sunflowers.png`

### CSV Management: `data/graphics.csv`

To add a new graphic:
```csv
id,name,price,icon,image_filename
skull,Skull Design,900,💀,skull.png
```

**Fields:**
- `id`: Unique identifier (lowercase, no spaces)
- `name`: Display name
- `price`: Additional cost in INR (numbers only)
- `icon`: Emoji for preview (optional, can use same as image)
- `image_filename`: PNG filename in `assets/graphics/`

---

## 🖼️ Logo

### Location
`logo.png` in root directory

### Specifications
- **Format**: PNG with transparency
- **Recommended Size**: 500x200px (or similar wide format)
- **Background**: Transparent
- **Usage**: Will be displayed in header

---

## 🔄 How It Works

The website automatically:
1. Loads CSV files on page load
2. Generates brand cards from `denim-canvas.csv`
3. Generates color options from `denim-colors.csv`
4. Generates graphics vault from `graphics.csv`
5. Combines brand + color to load correct jacket image
6. Overlays selected graphics on preview

---

## ✨ Quick Start

1. **Add your logo**: Replace `logo.png`
2. **Add denim images**: Place in `assets/denim/` following naming convention
3. **Add graphics**: Place in `assets/graphics/` as transparent PNGs
4. **Update CSVs**: Add/edit rows in CSV files as needed
5. **Refresh browser**: Changes appear automatically!

---

## 📝 Example Workflow

### Adding a New Graphic "Rose"

1. Create/obtain transparent PNG of rose design
2. Save as `assets/graphics/rose.png` (400x400px, transparent)
3. Open `data/graphics.csv`
4. Add new row:
   ```csv
   rose,Rose Design,700,🌹,rose.png
   ```
5. Save and refresh website
6. "Rose Design" now appears in graphics vault!

### Adding a New Brand "Uniqlo"

1. Photograph/obtain images of Uniqlo jackets in all 4 colors
2. Save as:
   - `assets/denim/uniqlo-light.jpg`
   - `assets/denim/uniqlo-dark.jpg`
   - `assets/denim/uniqlo-black.jpg`
   - `assets/denim/uniqlo-ombre.jpg`
3. Open `data/denim-canvas.csv`
4. Add new row:
   ```csv
   uniqlo,Uniqlo,1799,uniqlo.jpg
   ```
5. Save and refresh website
6. "Uniqlo" now appears as brand option!

---

## 🎯 Tips

- Keep image file sizes reasonable (< 500KB each) for fast loading
- Use consistent lighting/angles for denim jacket photos
- Graphics should be bold and visible on dark backgrounds
- Test on mobile after adding new assets
- Backup CSV files before making bulk changes

---

**Need help?** Check the code in `script.js` for the CSV loading logic.
