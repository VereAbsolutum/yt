from dotenv import dotenv_values
import nltk
import os
import requests
from bs4 import BeautifulSoup
import azure.cognitiveservices.speech as speechsdk

from PIL import Image


def get_file(folder, filename=None, extension=None):
    ext = '.{}'.format(extension) if extension else ''
    f_name = '{}'.format(filename) if filename else ''
    filepath = os.path.join(folder, '{}{}'.format(f_name, ext))

    try:
        with open(filepath, encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f'Error: Problem with the file. {e}')
        return None


def textWrap(texto, width):
    # Tokenizar o texto em palavras
    tokens = nltk.word_tokenize(texto)

    # Inicializar variáveis
    segmentos = []
    segmento_atual = []
    total_tokens = 0

    # Iterar sobre os tokens
    for token in tokens:
        # Adicionar o token ao segmento atual
        segmento_atual.append(token)
        total_tokens += 1

        # Verificar se o número total de tokens no segmento atual excede o limite
        if total_tokens >= width:
            # Adicionar o segmento atual à lista de segmentos
            segmentos.append(' '.join(segmento_atual))

            # Reinicializar o segmento atual e o contador de tokens
            segmento_atual = []
            total_tokens = 0

    # Adicionar o último segmento à lista de segmentos, se não estiver vazio
    if segmento_atual:
        segmentos.append(' '.join(segmento_atual))

    return segmentos


def download_images_from_url(url, folder, filename, cap):
    html = requests.get(f'{url}{cap}')
    print(f'{url}{cap}')
    soup = BeautifulSoup(html.content, 'html.parser')
    nodes = soup.select('.reading-content img')
    links = [node['src'] for node in nodes if 'src' in node.attrs]

    cap_dir = os.path.join(folder, str(cap))
    if not os.path.isdir(cap_dir):
        os.makedirs(cap_dir)

    for counter, link in enumerate(links):
        cap_formated = f'{cap:04}'
        counter_formated = f'{counter:04}'
        name = os.path.join(
            cap_dir, f'{cap_formated}-{counter_formated}-{filename}')

        img_response = requests.get(link)

        if img_response.status_code == 200:
            with open(name, 'wb') as img_file:
                img_file.write(img_response.content)
            print(f"Imagem {counter_formated} baixada e salva como {name}")
        else:
            print(
                f"Erro ao baixar a imagem {counter_formated} do link {link}: Status Code {img_response.status_code}")


def combine_images_vertically_from_folder(images, filename):
    combined_image = Image.open(images[0])
    combined_width, combined_height = combined_image.size

    total_height = combined_height
    for image_path in images[1:]:
        image = Image.open(image_path)
        total_height += image.height

    combined_image = Image.new('RGB', (combined_width, total_height))

    y_offset = 0
    for image_path in images:
        image = Image.open(image_path)
        combined_image.paste(image, (0, y_offset))
        y_offset += image.height

    combined_image.save(fp=filename, format='PNG')


def text_to_speech_and_save(subscription_key, service_region, voice_name, filename, text):
    speech_config = speechsdk.SpeechConfig(
        subscription=subscription_key, region=service_region)
    speech_config.speech_synthesis_voice_name = voice_name

    audio_config = speechsdk.audio.AudioOutputConfig(filename=filename)
    speech_synthesizer = speechsdk.SpeechSynthesizer(
        speech_config=speech_config, audio_config=audio_config)

    speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(text))
    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        print("Speech synthesis canceled: {}".format(
            cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(
                    cancellation_details.error_details))
                print("Did you set the speech resource key and region values?")


env = dotenv_values()

PROJECT_NAME = env.get('PROJECT_NAME').replace(' ', '-')


class Remove:
    @staticmethod
    def _remove_files_from_folder(folder_path):
        """Método estático privado para remover todos os arquivos de uma pasta especificada."""
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)
            else:
                print(
                    f"Failed to delete {file_path}. It is not a file or link.")

    @staticmethod
    def remove_images():
        """Remove todos os arquivos da pasta 'tmp/projeto/image'."""
        Remove._remove_files_from_folder(f'tmp/{PROJECT_NAME}/image')

    @staticmethod
    def remove_downloads(index=None):

        if not index:
            print('Error, no index given')

        """Remove todos os arquivos da pasta 'tmp/projeto/image_download'."""
        Remove._remove_files_from_folder(
            f'tmp/{PROJECT_NAME}/image_download/{index}')
