

from dotenv import dotenv_values
import ast
env = dotenv_values()

PROJECT_NAME = env.get('PROJECT_NAME').replace(' ', '-')

# APIs ################################################

# Azure
SPEECH_KEY = env.get('SPEECH_KEY')
SPEECH_REGION = env.get('SPEECH_REGION')
SPEECH_VOICE = env.get('SPEECH_VOICE')

# Openai
MAX_TOKENS = env.get('MAX_TOKENS')
MODEL = env.get('MODEL')
OPENAI_KEY = env.get('CHAT_KEY')

# Youtube
YOUTUBE_URL = env.get('YOUTUBE_URL')

# Images
IMG_URL = env.get('IMG_URL')

# Params ###############################################

# Image Params
OFFSET = env.get('OFFSET')
MULTIPLIERS = ast.literal_eval(env.get('CROP_MULTIPLIER'))

# Files ################################################

# Audio Filename
AUDIO_FILENAME = f'{PROJECT_NAME}.wav'

# Image Filename
IMAGE_FILENAME = f'{PROJECT_NAME}.png'

# Text Filename
TEXT_FILENAME = f'{PROJECT_NAME}.md'

# Folders ################################################

# Image Folders
IMAGE_FOLDER = 'image'

# Audio Folders
AUDIO_FOLDER = 'audio'
IMAGE_FOLDER_DOWNLOAD = 'image_download'
TMP_IMAGE_FOLDER_DOWNLOAD = 'image_download'
TMP_IMAGE_FOLDER = 'image'

# Script Folders
TRANSCRIPT_FOLDER = 'transcript'
TRANSLATED_FOLDER = 'translated'
TRANSLATED_PROCESSED_FOLDER = 'translated_processed_folder'

# Root Folders
APP = 'project'
TMP = 'tmp'
