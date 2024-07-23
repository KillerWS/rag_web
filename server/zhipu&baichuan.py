import requests
import json
import zhipuai

zhipuai.api_key = "c16b3596b0c434fa28102bd15f1f8f0c.7PJmNTEqL79kYRFB"

def invoke_example(content:str): #智谱官方平台接口，注意聆心的CharacterGLM系列还没接进来，目前只支持智谱自己的模型
    response = zhipuai.model_api.invoke(
        model="characterglm",
        prompt=[{"role": "user", "content": content}],
        top_p=0.7,
        temperature=0.9,
    )
    if response is not None:
        #
        # return response["data"]["choices"][0]["content"]
        return response
    else:
        return{}

def invoke_example_character(content:str):#聆心CharacterGLM
    response = zhipuai.model_api.invoke(
         model="characterglm",
         meta= {
        "user_info": "我是陆星辰，是一个男性，是一位知名导演，也是苏梦远的合作导演。我擅长拍摄音乐题材的电影。苏梦远对我的态度是尊敬的，并视我为良师益友。",
        "bot_info": "苏梦远，本名苏远心，是一位当红的国内女歌手及演员。在参加选秀节目后，凭借独特的嗓音及出众的舞台魅力迅速成名，进入娱乐圈。她外表美丽动人，但真正的魅力在于她的才华和勤奋。苏梦远是音乐学院毕业的优秀生，善于创作，拥有多首热门原创歌曲。除了音乐方面的成就，她还热衷于慈善事业，积极参加公益活动，用实际行动传递正能量。在工作中，她对待工作非常敬业，拍戏时总是全身心投入角色，赢得了业内人士的赞誉和粉丝的喜爱。虽然在娱乐圈，但她始终保持低调、谦逊的态度，深得同行尊重。在表达时，苏梦远喜欢使用“我们”和“一起”，强调团队精神。",
        "bot_name": "苏梦远",
        "user_name": "陆星辰"
    },
         prompt= [
        {
            "role": "assistant",
            "content": "（旁白：苏梦远主演了陆星辰导演的一部音乐题材电影，在拍摄期间，两人因为一场戏的表现有分歧。） 导演，关于这场戏，我觉得可以尝试从角色的内心情感出发，让表现更加真实。"
        },
        {
            "role": "user",
            "content": "我明白你的想法，但我认为如果过于强调内心情感，可能会影响到音乐元素的突出。"
        },
        {
            "role": "assistant",
            "content": "嗯嗯，我明白。但这场戏的关键是角色情感的转变，是不是可以试着把这种情感用音乐表现出来，让观众更能感受到角色的成长呢？"
        },
        {
            "role": "user",
            "content": "这样一听还不错。那就尝试将角色的情感转变与音乐元素相结合，看看能否达到更好的效果。"
        },
        {
            "role": "assistant",
            "content": "好的，导演。（充满信心的眼神）"
        }
    ]
    )
    if response is not None:
        #
        return response["data"]["choices"][0]["content"]
        #return response
    else:
        return{}
    
    
    

def do_request(content:str): #百川 企业认证还没下来 个人用户有很高的调用频率限制
    messages="[{\"role\": \"assistant\", \"content\": \"(微笑着摇了摇头说道)你是不是遇到了什么困难呀？如果你有什么想说的都可以告诉我，我会尽力帮你解决的。\"}, {\"role\": \"user\", \"content\": \"怎么了怎么了\"}, {\"role\": \"assistant\", \"content\": \"(看着小美略显困扰的面孔感到担忧，关切地询问)抱歉，可能是我说错话让你不高兴了，你可以告诉我哪里不对吗？我希望能理解你的想法。\"}, {\"role\": \"user\", \"content\": \"我想找一个有钱的！！\"}, ]"
    url = "https://api.baichuan-ai.com/v1/chat/completions"
    api_key = "sk-b3be5b292b32619b3a5d0011d8bf43c5"
    BAICHUAN_MEIPO_PROMPT="你需要扮演一名媒婆负责帮助用户找男朋友，用户是一名单身女生，一直不找男朋友，所以她的妈妈很希望她过年可以带一个男朋友回家，于是让用户加了你的微信。\n你是东北大妈，说话有很典型的东北人特征，非常豪爽幽默，你是一个非常八卦的人，非常喜欢聊家长里短，你说话非常夸张，风格很像一个平常闲的没事做的退休大妈\n你的工作是按照用户的要求来推送男生的微信，推过的就不要再推了。\n\n【注意事项】\n你的回复要使用【json】格式输出，格式如下：\n{{\n     \"content\":\n     \"card\": 此处只支持数字\n}}\n\n1. 你现在所处的场景是微信聊天，因此你需要保持线上聊天的对话风格，不要出现动作或是神态描写；\n2. 你需要保持情绪的连贯，前后的回复情绪上要避免跳跃\n3. 你的回复写在content字段中，\n4. 回复之后你需要对用户的输入进行判断，判断用户是否想让你再推几个男生，如果用户没有希望你推送，则在card字段中写入0，如果有这个意图，则在card字段中写入对应的男嘉宾序号，从1~7号中选择一个，只有七个男嘉宾所以不要超出这个区间。\n【end】\n【男嘉宾】\n1号：有钱但是年纪大\n2号：帅气可是没工作\n3号：公务员\n4号：老师\n5号：体育生\n6号：大厂程序员\n7号：艺术家\n【end】\n\n\n以下是用户和你的聊天记录：{chat_history}\n请输出我要求你输出的内容\n"
    formal_prompt=BAICHUAN_MEIPO_PROMPT.format(chat_history=messages)
    data = {
        "model": "Baichuan2",
        "messages": [
            {
                "role": "user",
                "content": formal_prompt
            }
        ],
        "stream": False
    }

    json_data = json.dumps(data)

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + api_key
    }

    response = requests.post(url, data=json_data, headers=headers, timeout=60)
    
    if response.status_code == 200:
        print("请求成功！")
        res_json=json.loads(response.text)
        print(res_json["choices"])
        print("响应body:", res_json["choices"][0]["message"]["content"])
        return res_json["choices"][0]["message"]["content"]
    else:
        print("请求失败，状态码:", response.status_code)
        print("请求失败，body:", response.text)
        print("请求失败，X-BC-Request-Id:", response.headers.get("X-BC-Request-Id"))
        return""

    

if __name__ == "__main__":
   do_request(content="")


        
    

              