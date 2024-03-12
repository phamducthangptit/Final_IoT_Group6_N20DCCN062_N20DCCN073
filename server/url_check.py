import tensorflow as tf
lowercase_letters = 'abcdefghijklmnopqrstuvwxyz'
uppercase_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
numbers = '0123456789'
other_characters = ',;.!?:"’/\\|_@#$%^&*~`+-=<>()[]{}'
max_len = 300
all_characters = lowercase_letters + uppercase_letters + numbers + other_characters
char_to_index = {char: index+1 for index, char in enumerate(all_characters)}
char_to_index['UNK'] = len(all_characters) + 1
def text_to_seq(text):
  url_indices = []
  for char in text:
    if char_to_index.get(char) != None:
      url_indices.append(char_to_index.get(char))
    else:
      url_indices.append(char_to_index.get('UNK'))
  return url_indices

def process_data(url):
    url = text_to_seq(url)
    url = tf.keras.preprocessing.sequence.pad_sequences([url], maxlen=max_len, padding="post")
    return url
def detection_url(url):
    url = process_data(url)
    model = tf.keras.models.load_model('model//model_url_20.h5')
    pred = model.predict(url)
    pred = pred[0]
    print(pred)
    if pred <= 0.5:
       return 0 # lành tính
    else:
       return 1 # độc hại
