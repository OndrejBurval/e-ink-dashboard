#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os

# Add local lib directory to path
libdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import time
import logging
from PIL import Image
from waveshare_epd import epd2in13_V4

# Logging setup
logging.basicConfig(level=logging.DEBUG)

try:
    logging.info("Display output.bmp on e-paper")

    # Initialize e-paper
    epd = epd2in13_V4.EPD()
    epd.init()
    epd.Clear(0xFF)

    # Path setup
    picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../../public/images/')
    image_path = os.path.join(picdir, 'output.bmp')

    # Load and display image
    image = Image.open(image_path)
    epd.display(epd.getbuffer(image))
    time.sleep(5)

    # Optional: sleep mode to save power
    epd.sleep()

except IOError as e:
    logging.error(e)

except KeyboardInterrupt:
    logging.info("Interrupted by user")
    epd2in13_V4.epdconfig.module_exit(cleanup=True)
    exit()
