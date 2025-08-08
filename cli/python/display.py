import sys
from PIL import Image

sys.path.append('./waveshare/lib/waveshare_epd')
from epd2in13_V4 import EPD  # Import the EPD class from the module

def display_bmp_on_epaper(bmp_path):
    epd = EPD()  # Use the imported EPD class
    epd.init()
    epd.Clear(0xFF)

    image = Image.open(bmp_path).convert('1')
    image = image.resize((epd.width, epd.height))
    epd.display(epd.getbuffer(image))
    epd.sleep()

if __name__ == "__main__":
    bmp_path = sys.argv[1]
    display_bmp_on_epaper(bmp_path)
    print('Image displayed')
    sys.stdout.flush()
