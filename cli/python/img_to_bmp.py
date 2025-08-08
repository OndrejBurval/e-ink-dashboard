import sys
from PIL import Image, ImageEnhance, ImageFilter

screen_width = 250
screen_height = 122

def png_to_eink_bmp(png_path, bmp_path):
    img = Image.open(png_path).convert('L')
    img = img.filter(ImageFilter.SHARPEN)

    # Contrast and brightness: fine-tune as needed
    img = ImageEnhance.Contrast(img).enhance(1.3)
    img = ImageEnhance.Brightness(img).enhance(1.05)

    # Resize with high-quality Lanczos filtering
    img = img.resize((screen_width, screen_height), resample=Image.LANCZOS)

    # Custom threshold for text/graphics-heavy images; increase if output is too dark
    threshold = 80
    img = img.point(lambda x: 255 if x > threshold else 0, '1')

    img.save(bmp_path, format='BMP', dpi=(200,200))

if __name__ == "__main__":
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    png_to_eink_bmp(input_path, output_path)
    print("Conversion complete")
    sys.stdout.flush()
