import os
import ast
import os

from dotenv import dotenv_values
from PIL import Image, ImageOps

env = dotenv_values()

PROJECT_NAME = env.get('PROJECT_NAME').replace(' ', '-')
IMAGE_FOLDER = 'image'

# Params
IMG_URL = env.get('IMG_URL')
IMAGE_FILENAME = f'{PROJECT_NAME}.png'
OFFSET = env.get('OFFSET')
MULTIPLIERS = ast.literal_eval(env.get('CROP_MULTIPLIER'))

# Folders
APP = 'project'
TMP = 'tmp'
IMAGE_FOLDER = 'image'
IMAGE_FOLDER_DOWNLOAD = 'image'
TMP_IMAGE_FOLDER_DOWNLOAD = 'image_download'


def renameFile(filepath):
    os.rename(filepath, f'{filepath}.png')


image_folder = os.path.join(APP, PROJECT_NAME, 'img')

begin = 3
end = len(image_folder)

for _, folder in enumerate(range(begin, end), start=begin):
    folder_path = os.path.join(image_folder, str(folder))
    images = os.listdir(folder_path)
    for img in images:
        img_filepath = os.path.join(folder_path, img)
        renameFile(img_filepath)
