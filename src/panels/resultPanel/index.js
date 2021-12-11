import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import cn from "classnames";
import "./ResultPanel.scss";

import { APP_ID_TARGET } from "../../constants";
import { nativeAds } from "../../ads";
import { addGroup, incrementCountButton } from "../../bridge-method";
import { story } from "../../sharing-method";
import {
  APP_IMG_SHARING_STORIES,
  APP_ILLUMINATE,
  APP_STATISTICS,
  APP_REMEMBER_SUMMER,
  APP_STATS_APP,
  APP_SQUID_GAME,
} from "../../constants";

const ResultPanel = ({
  id,
  go,
  IMGresult,
  getPlatform,
  openAlert,
  snackbar,
  fetchedUser,
  getGroupId,
  appID,
  imgIndex,
}) => {
  useEffect(() => {
    setTimeout(() => {
      // nativeAds();
    }, 3000);
  }, []);

  const openNewApp = (appId) => {
    bridge
      .send("VKWebAppOpenApp", { app_id: appId, location: "new-app" })
      .then((res) => {
        // incrementCountButton("stats.buttonPage_result");
      })
      .catch((err) => {});
  };

  return (
    <div
      className={cn({
        "result-panel": true,
        web: getPlatform === "web",
      })}
    >
      {/* <div className="img">{IMGresult}</div> */}

      <Button
        className="buttons"
        onClick={() => story(APP_IMG_SHARING_STORIES[imgIndex])}
      >
        Посмотреть результат
      </Button>
      <Button
        className="buttons"
        onClick={() => openNewApp(APP_REMEMBER_SUMMER)}
      >
        Узнай как провёл лето в статистике
      </Button>
      <Button
        className="buttons small-text"
        onClick={() => openNewApp(APP_SQUID_GAME)}
      >
        Пройди тест на знание сериала "Игра в кальмара"
      </Button>
      <Button
        className="buttons small-text"
        onClick={() => openNewApp(APP_ILLUMINATE)}
      >
        Узнай дату смерти, свадьбы, секса
      </Button>
    </div>
  );
};

export { ResultPanel };
