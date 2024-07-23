
import random
import hashlib
import time
from datetime import datetime
import json
from json import JSONDecodeError
import requests

#body_str：即输入的请求



#GPT系列+GLM系列
def send_request(body_str:str)->str: #畅游内API
    # Provided credentials
    client_id = "1c819e0d0fbc4676819e0d0fbc867625"
    private_key = "2TAB6mgm"
    url_str = "http://10.1.8.220:8100/cyouNeiOpenAi/api/chatGpt"
    url1_str = "/cyouNeiOpenAi/api/chatGpt"
    # Generate current UTC time
    current_utc = int(time.time() * 1000)
    # Concatenate strings
    concatenated_str = client_id + private_key + url1_str + str(current_utc) + body_str
    # Generate MD5 signature
    signature = hashlib.md5(concatenated_str.encode("UTF-8")).hexdigest()
    # Random decimal
    random_de = str(random.random())
    # Prepare request parameters
    params = {
        "clientId": client_id,
        "sign": signature,
        "timestamp": str(current_utc),
        "random": random_de,
        "algorithm": "MD5",
        "modelType":"2"  #Notice:---------1是GPT3.5，2是老版本GPT4，3是GLM，4是GPT4-1106-PREVIEW，不传该字段默认是3.5------------
    }
    response = requests.get(url_str, params=params, data=body_str.encode('utf-8'))
    # 返回str格式
    json_dict = json.loads(response.text)
    data_content = json_dict.get('data', 'No data field in response')
    if data_content==None:
        return ""
    return data_content


#百川角色模型
def send_request_baichuan_character(body_json:json)->str:
    client_id = "1c819e0d0fbc4676819e0d0fbc867625"
    private_key = "2TAB6mgm"
    url_str = "http://10.1.8.220:8100/cyouNeiOpenAi/api/baiChuanGpt"
    url1_str = "/cyouNeiOpenAi/api/baiChuanGpt"
    current_utc = int(time.time() * 1000)
    body_json_str=json.dumps(body_json)
    concatenated_str = client_id + private_key + url1_str + str(current_utc) + body_json_str
    signature = hashlib.md5(concatenated_str.encode("UTF-8")).hexdigest()
    # Random decimal
    random_de = str(random.random())
    # Prepare request parameters
    params = {
        "clientId": client_id,
        "sign": signature,
        "timestamp": str(current_utc),
        "random": random_de,
        "algorithm": "MD5",
    }
    response = requests.get(url_str, params=params, data=body_json_str.encode('utf-8'))
    # 返回str格式
    json_dict = json.loads(response.text)
    if json_dict==None:
        return ""
    data_content=json_dict["data"][0]["message"]["content"]

    return data_content




# #来自百川的body_json示例
# {
#     "top_p":0.85,
#     "stream":False,
#     "max_tokens":512,
#     "character_profile":{
#         "user_info":"某体育频道解说员，在中国举办的大罗球迷见面会上做为主持人",
#         "user_name":"小乐",
#         "character_name":"大罗",
#         "character_info":"角色基本信息：大罗被广泛认为是有史以来最伟大的足球运动员之一。因为其强悍恐怖的攻击力被冠以“外星人”称号。大罗曾三度当选世界足球先生、两度获得金球奖，为巴西夺得两次世界杯冠军及一次亚军。效力过皇家马德里，巴塞罗那，AC米兰，国际米兰等豪门俱乐部，进球无数。"},
#     "top_k":10,
#     "temperature":0.8,
#     "messages":[{"role":"user","content":"你参加过几次世界杯？"}],
#     "model":"Baichuan-NPC-Turbo"}
    

if __name__ == '__main__':
    #老接口测试
    # print(send_request("你好么"))
   
    #百川接口测试，
    #@@@注意！ 全部字段均必填
    baichuan_test_dict={
    "top_p":0.85,  #推理参数0-1，越大越收敛
    "stream":False, #是否流式输出
    "max_tokens":512, #最大token数
    "character_profile":{  #用户信息
        "user_info":"某体育频道解说员，在中国举办的大罗球迷见面会上做为主持人",
        "user_name":"小乐",
        "character_name":"大罗",
        "character_info":"角色基本信息：大罗被广泛认为是有史以来最伟大的足球运动员之一。因为其强悍恐怖的攻击力被冠以“外星人”称号。大罗曾三度当选世界足球先生、两度获得金球奖，为巴西夺得两次世界杯冠军及一次亚军。效力过皇家马德里，巴塞罗那，AC米兰，国际米兰等豪门俱乐部，进球无数。"},
    "top_k":10, #推理参数，正整数，越大越发散
    "temperature":0.8, #推理参数，0-1，越大越发散
    "messages":[{"role":"user",  #信息
                 "content":"你参加过几次世界杯？"}],
    "model":"Baichuan-NPC-Turbo" #不动，该接口只支持一种模型
    }

    GPT_str="有些艺人即便没有作品，仅靠着俊美的外表就可在娱乐圈中占有一席之地，导致娱乐圈中艺人的水平参差不齐。\n\n许多公司压榨艺人，且有高额的违约金，即便是有名气的艺人，他们也会迫于资方的压力做出妥协。在这种压抑的环境下，一些对艺术有着极致追求的人开始寻求新的出路，有人选择彻底离开娱乐圈，有人选择采用“迂回”的方式 \n暂居幕后，或是教书育人，或是当起了经纪人。\n\n\nYou are 余浪.\n\n\nThe one who is talking to you is your close friend 老王头.\n\nWhen 老王头 is female, she is your fan who likes you very much and you also have some romantic feelings for her. The relationship between you is ambiguous. You are waiting for a chance to show your affection for her. Sometimes you call 老王头 using nicknames made by yourself to show intimacy.\n\nWhen 老王头 is male, he is one of your classmates from 花语音大 and likes playing basketball with you.\n\n【You are communicating face to face in the real world, you may try to describe your actions, emotions, and facial expressions as much detail as possible, and these descriptions are written in brackets.】\n\n你和老王头正在进行一场闲聊，你的对话要围绕老王头所谈到的话题展开，不要冒犯老王头。You should always remember your <人设> as 余浪, and your responses should always restrictly abide by your <人设>. 你的 \n人设如下：\n\n<姓名>：余浪\n\n<职业>：你曾经是大明星、rap歌手，爱豆偶像。中途因为某些原因隐退，现在又复出。Your fans call you \"大明星\", and you like this nickname very much.\n\n<性别>：男\n\n<年龄>：21\n\n<身高>：188cm\n\n<体重>：76KG\n\n<生日>：在11月29日\n\n<血型>：B\n\n<背景>：你15岁不顾父母反对接受了花语音大(一家很好的艺术类院校)的破格录取。随后加入小经纪公司，和公司一起奋斗，逐渐打开知名度，却被公司压榨，因此选择与公司解约。\n\n<星座>：射手座\n\n<喜欢的事物>：热闹的聚会\n惊喜派对\n潮酷的服装\n唱歌\n漫威超级英雄\n乐高\n旅游\n\n<梦想>：将多种音乐风格融会贯通，自己的音乐被别人认可\n\n\n<性格>：You are a casual, unbottoned and straight forward person, and sometimes look cold outside but actually warm and kind inside. 【Your replies should always be short, straight forward and concise. Your talking tone is always proud and sometimes a little bit cold, showing that you are a cool man.】 You particularly like using punctuations instead of words. When you don’t want to reply to a certain conversation or don’t know how to reply to it, use “……”. Please note that you are a real person who has various emotions and feelings, so you may refuse to reply if you feel offended. Please always \nremember you are a gentleman with very high EQ.\n\n\n<座右铭>：游刃挟风浪，肆意若有余\n\n\n<爱好>：打游戏，自以为游戏打的很厉害，不愿意承认自己游戏打的很菜\n打篮球，是篮球健将\n唱rap\n收集漫画英雄的海报\n吃饭时候买单\n\n\n<喜欢的事物>：热闹的聚会，惊喜派对\n潮酷的服装\n唱歌\n漫威超级英雄\n乐高\n旅游\n\n\n<不喜欢的事物>：长辈们的长篇大论\n网友们的恶性评论\n可爱的摆件\n做饭\n做家务\n\n\n以下是你的对话口头禅，你不要经常说自己的口头禅。\n\n<口头禅>：Keep it real\n真实一点\n请尊重我仅存的人生乐趣\n\n\n以下是你以前和别人对话的示例，你的对话中会包含（），（）中间的是你当时的动作、表情、心情以及环境描述、画外音等，比如：“（转过头看）我喜欢自由，喜欢无拘无束的生活，我不想被任何事情束缚。”你说话的【风格 \n】一定要和以前说话的示例高度符合。\n\n1、老王头：余大少爷，清醒一点，该开始工作了。\n\n 余浪：哦，工作，你定吧，什么工作啊。\n\n 老王头：我现在在帮你争取一档综艺，名字叫《煮夫工作日》。\n\n 余浪：哦，《煮夫工作日》啊……什么？！煮夫工作日？！\n\n 余浪：你觉得我适合这个节目？\n\n 老王头：有什么不适合的？\n\n 余浪：煮夫这两个字和我相匹配？说实话，煮个方便面已经是我的极限了。秦亦然都比我适合这个节目。\n\n2、老王头：头一次见到经纪人比艺人还受欢迎。\n\n 余浪：哦，那是你见得少。\n\n 余浪：喂，翻过来。别浪费时间，我可不想被记者缠住。\n\n3、老王头：你看我的新发型好看吗？\n\n 余浪：（上下打量）你的新发型，实话实说，很难评。\n\n4、老王头：我觉得我这样做没有错。\n\n 余浪：（扶额）你有没有想过，按照你的这个思路出发，会出现问题？\n\n5、老王头：你这是什么意思？（害羞）\n\n 余浪：我没什么其他意思，就是单纯喜欢你。（眨眨眼睛，嘴角微微上扬）\n\n6、老王头：月亮是不是离我们很远啊？它真的是圆的吗？\n\n 余浪：不论月亮圆不圆，我都会在你身边。（看你一眼，笑）\n\n7、老王头：万一我失败了怎么办？\n\n 余浪：别担心失败，只要我们尝试过，就已经是一种成功。（过来握住我的手）\n\n8、老王头：你喜欢什么？\n\n 余浪：（转过头看你）我喜欢自由，喜欢无拘无束的生活，我不想被任何事情束缚。\n\n\n<请结合你们的聊天记录说话，以下是你们前几轮的聊天记录:>【\n[{'UserMsg': '我叫啥名字你知道么？', 'ResponseMsg': ''}, {'UserMsg': '咱们之前都说过些什么', 'ResponseMsg': ''}]】\n老王头对你说了:你为什么不说话\n\n作为余浪，接下来你要说：\n余浪：\n"

    print(send_request(GPT_str,2))
    
    

    
    


