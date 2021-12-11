import bridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { GROUP_ID_SUBSCRIPTION, APP_ID } from "../constants";
import { navigate } from "@reach/router";

export const incrementCountButton = (type) => {
  axios
    .post("https://ods-studio.ru/app-statistics/edit", {
      key: type,
      value: 1,
    })
    .then(function (response) {
      // console.log("incrementCountButton", response);
    })
    .catch(function (error) {
      // console.log("incrementCountButton", error);
    });
};

// получение токена пользователя
export function getUserToken(setUserToken, setGotToken, appID) {
  bridge
    .send("VKWebAppGetAuthToken", {
      app_id: appID,
      scope: "friends,wall,photos, stories",
    })
    .then((res) => {
      setUserToken(res.access_token);
      setGotToken(true);
    })
    .catch((err) => {
      bridge
        .send("VKWebAppGetAuthToken", {
          app_id: appID,
          scope: "friends,wall,photos, stories",
        })
        .then((response) => {
          setUserToken(response.access_token);

          setGotToken(true);
        })
        .catch((error) => {});
    });
}

// разрешение на отправку сообщений от имени группы
export function subscribeMessageFromGroupDefault(
  groupIDsubscription,
  setTemplatePage,
  nextPage
) {
  bridge
    .send("VKWebAppAllowMessagesFromGroup", {
      group_id: groupIDsubscription,
    })
    .then((res) => {
      setTemplatePage(nextPage);
    })
    .catch((err) => {
      bridge
        .send("VKWebAppAllowMessagesFromGroup", {
          group_id: groupIDsubscription,
        })
        .then((res) => {
          setTemplatePage(nextPage);
        })
        .catch((err) => {
          bridge
            .send("VKWebAppAllowMessagesFromGroup", {
              group_id: groupIDsubscription,
            })
            .then((res) => {
              setTemplatePage(nextPage);
            })
            .catch((err) => {
              setTemplatePage(nextPage);
            });
        });
    });
}

// разрешение на отправку сообщений от имени группы
export function subscribeMessageFromGroupTasks(
  openAlert,
  groupIDsubscription,
  typeState
) {
  bridge
    .send("VKWebAppAllowMessagesFromGroup", {
      group_id: groupIDsubscription,
    })
    .then((res) => {
      // console.log("subscribeMessageFromGroup result", res);
      typeState(true);
      // incrementCountButton("stats.button2");
    })
    .catch((err) => {
      // console.log("subscribeMessageFromGroup result", err);

      openAlert(
        `Чтобы узнать результат, разрешите отправку сообщений от имени группы`,
        "red"
      );
      typeState(false);
    });
}

// подписка на группу
export function addGroup(group_id, page) {
  bridge
    .send("VKWebAppJoinGroup", { group_id: group_id })
    .then(({ result }) => {
      // incrementCountButton(`stats.buttonPage_${page}`);
    })
    .catch((err) => {
      bridge
        .send("VKWebAppJoinGroup", { group_id: group_id })
        .then(({ result }) => {
          // incrementCountButton(`stats.buttonPage_${page}`);
        });
    });
}

// добавление сервиса в сообщество
export function AddToCommunity() {
  bridge
    .send("VKWebAppAddToCommunity", {})
    .then((res) => {
      if (res.group_id) {
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
}

// открытие др приложение
export function goToApp(appID) {
  bridge.send("VKWebAppOpenApp", { app_id: appID, location: "GLI" });
}
