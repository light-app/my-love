import axios from "axios";

export const APP_ID_TARGET = 7812418; // ILLUMINATE
export const APP_ID_DEFAULT = 8024075;
// Страница с шестеренкой № 2 (рассылка Енотик https://vk.com/club207160114)
export const GROUP_ID_MAILING_SETTING = 207160114;
// Страница с лайком № 3 (подписка Абсурд https://vk.com/polniiabsurd)
export const GROUP_ID_SUBSCRIPTION_LIKE = 187253745;
// Страница с лайком № 4
// (рассылка мужчины ждем ссылку)
export const MAN_GROUP_ID_MAILING_SEARCH = 207652951;
// (рассылка женщины ждем ссылку)
export const WOMAN_GROUP_ID_MAILING_SEARCH = 207652629;

export const USER_ID = Number(
  new URLSearchParams(document.location.search).get("vk_user_id")
);
export const NAME_PROJECT = "my-love";
export const NAME_PROJECT_LOWER_CASE = "my-love";
export const APP_IMG_SHARING_STORIES = [
  "https://sun9-53.userapi.com/impg/WGQsQEygFhigylYulDyBWX7-iWhz6GVwuUvEgQ/EZol3uJfZZI.jpg?size=607x1080&quality=96&sign=0af159026ff72257d2e3d0b10bd6a188&type=album",
  "https://sun9-70.userapi.com/impg/mf5XrTolm-0sAUXJ7bA28BO2b3HWmSYfJS8qtA/qNQgSgLNQnQ.jpg?size=607x1080&quality=96&sign=571767e5a0c2e2196c848701503ea537&type=album",
  "https://sun9-84.userapi.com/impg/kGuboJsPgduLuTxpb8qfG_mKBPef_cgmvQmDjQ/fUsU_sYyoYY.jpg?size=607x1080&quality=96&sign=dee9fa0c09558193769e2efe8f9f30a5&type=album",
  "https://sun9-33.userapi.com/impg/I4kOOVZUSwr6ADAoZlt-rIzeG4tZUoDVYZiT9Q/qxIE4zPwFOs.jpg?size=607x1080&quality=96&sign=06853361ade8b04b36c901f08760a717&type=album",
  "https://sun9-68.userapi.com/impg/PUYkzg8tTDtRUMQ950msGwCsIGRl6YnMjVxbAQ/a_YZcTQFmAA.jpg?size=607x1080&quality=96&sign=893148bad036016df9208ec2603e12f6&type=album",
  "https://sun9-77.userapi.com/impg/69uiI51PRgPTK0BJ38vt2AsAJZJoVJdFAdHfAg/rQEH33Tzjhg.jpg?size=607x1080&quality=96&sign=bd22db48786cafba1ae13a433700344d&type=album",
  "https://sun9-68.userapi.com/impg/ACqBp3mBW1VpPTHumlVs4OOoBy1rjp3YL1f0TA/u4CvXO6MBO4.jpg?size=607x1080&quality=96&sign=d112062796576a6e72255c4c26d09d0a&type=album",
  "https://sun9-33.userapi.com/impg/k70e0Jp6OFktR8WiWm8cr4bQVVCxRmdJH72uYA/o8H1aR_c758.jpg?size=607x1080&quality=96&sign=ec62c255914040039ee8b7e4a2b8fa3c&type=album",
  "https://sun9-75.userapi.com/impg/Hu1eFxSKRakHeCqPH1HDOHGrwWXrWmKssmGH0g/U9RwvOUvsw4.jpg?size=607x1080&quality=96&sign=3cd8353043220e404267812d7226e4aa&type=album",
  "https://sun9-13.userapi.com/impg/E5JuoHTDcbwh9dXgXzbXKL7xukAa3Hn64NLolQ/VaV7bumPJFs.jpg?size=607x1080&quality=96&sign=16a8ffd47ca83c017111dcf940b42329&type=album",
];

export const APP_ILLUMINATE = 7812418;
export const APP_STATISTICS = 7949046; // Твоё лето
export const APP_REMEMBER_SUMMER = 8014181; // Наше лето
export const APP_STATS_APP = 7974197; // Моё лето
export const APP_SQUID_GAME = 7969986; // Игра в кальмара
