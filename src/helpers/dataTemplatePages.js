import {
  DoorIcon,
  SettingIcon,
  LikeIcon,
  StatsIcon,
  RocketIcon,
  LoveIcon,
  DoneIcon,
  SettingLightIcon,
} from "../icons";
import { sharing } from "../sharing-method";
import { APP_IMG_SHARING_STORIES, APP_ID_DEFAULT } from "../constants";

export const dataTemplatePages = [
  {
    name: "/",
    icon: <LoveIcon />,
    header: "Привет!",
    title:
      "Наше приложение с помощью наших алгоритмов поможет Вам узнать вторую половинку",
    description:
      "* Наше приложение является развлекательным. Наши алгоритмы разрабатывались несколькими специалистами.",
    buttonName: "Ок",
    next: "setting",
  },
  {
    name: "setting",
    icon: <DoneIcon />,
    header: "Для начала Анализа нажмите на кнопку начать",
    title: "",
    description: "",
    buttonName: "Начать",
    next: "search",
  },
  // {
  //   name: "like",
  //   icon: <LikeIcon />,
  //   header: "Отлично",
  //   title: "Теперь я могу проверить твои данные",
  //   description: "",
  //   buttonName: "Начать анализ",
  //   next: "search",
  // },
  {
    name: "search",
    icon: <SettingLightIcon />,
    header: "Провожу анализ",
    title: "Ищу дату регистрации...",
    description: "",
    buttonName: "",
    next: "result",
  },
  {
    name: "result",
    icon: <LoveIcon className="pulse" />,
    header: "Анализ завершён",
    title: "",
    description: "",
    buttonName: "Узнать",
    next: "/result-panel",
  },
];
