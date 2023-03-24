import os
from bs4 import BeautifulSoup
import requests

# ask for URL
userget = input("Enter the URL: ")
requests.get(str(userget))

# get HTML content from URL and create BeautifulSoup object
url = requests.get(str(userget)).text
soup = BeautifulSoup(url, 'html.parser')

# find the title and tags in the HTML document
title = soup.title.string + " Page Url: " + userget
tags = []
for tag in soup.body.descendants:
    if tag.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', '#text', 'ul', 'ol']:
        tags.append(tag)

# ask user for filename to save the data
filename = input("Enter the filename to save the data: ")

# create the data folder if it doesn't exist
if not os.path.exists('data'):
    os.mkdir('data')

# open the file with the given filename in the data folder
filepath = os.path.join('data', filename)
with open(filepath, 'a', encoding='utf-8') as f:
    f.write(f"Title: {title}\n")
    for tag in tags:
        f.write(tag.text.strip() + '\n')