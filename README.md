# 1. Search Agent
**POST /search**
```
    {
        "text": "Tell me the weather in Ha Noi"
    }
```
text is whatever you want to ask

# 2. File Agent
Use to write down the content you want into the indicated file. If file doens't exits, agent will create it.
**POST /file**
```
    {
        "text": "write the content 'hello word' into test.txt"
    }
```