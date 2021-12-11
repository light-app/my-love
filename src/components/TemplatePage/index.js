import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { navigate } from "@reach/router";
import { Button } from "@vkontakte/vkui";
import "./TemplatePage.scss";

import { story } from "../../sharing-method";
import { nativeAds } from "../../ads";
import { addGroup, incrementCountButton } from "../../bridge-method";
import {
  GROUP_ID_MAILING_SETTING,
  GROUP_ID_SUBSCRIPTION_LIKE,
  MAN_GROUP_ID_MAILING_SEARCH,
  WOMAN_GROUP_ID_MAILING_SEARCH,
  APP_IMG_SHARING_STORIES,
  APP_ID_DEFAULT,
  NAME_PROJECT,
} from "../../constants";

const TemplatePage = ({
  icon,
  header,
  title,
  description,
  buttonName,
  setTemplatePage,
  name,
  next,
  fn,
  appID,
  getGroupId,
  openAlert,
  fetchedUser,
  getRandomImg,
  imgIndex,
  gotToken,
  publishStories,
}) => {
  const [editTitle, setEditTitle] = useState(title);

  function subscribeMessageFromGroupDefault(groupIDsubscription, type, next) {
    bridge
      .send("VKWebAppAllowMessagesFromGroup", {
        group_id: groupIDsubscription,
      })
      .then((res) => {
        console.log("subscribeMessageFromGroupDefault res", res);
        if (type === "search") {
          setTemplatePage(next);
        }
        // incrementCountButton(`stats.buttonPage_${type}`);
      })
      .catch((err) => {
        bridge
          .send("VKWebAppAllowMessagesFromGroup", {
            group_id: groupIDsubscription,
          })
          .then((res) => {
            if (type === "search") {
              setTemplatePage(next);
            }
            // incrementCountButton(`stats.buttonPage_${type}`);
          })
          .catch((err) => {
            bridge
              .send("VKWebAppAllowMessagesFromGroup", {
                group_id: groupIDsubscription,
              })
              .then((res) => {
                if (type === "search") {
                  setTemplatePage(next);
                }
                // incrementCountButton(`stats.buttonPage_${type}`);
              })
              .catch((err) => {
                if (type === "search") {
                  setTemplatePage(next);
                }
                console.log("subscribeMessageFromGroupDefault err", err);
              });
            console.log("subscribeMessageFromGroupDefault err", err);
          });
        console.log("subscribeMessageFromGroupDefault err", err);
      });
  }

  function addGroup(group_id, type, next) {
    bridge
      .send("VKWebAppJoinGroup", { group_id: group_id })
      .then(({ result }) => {
        // incrementCountButton(`stats.buttonPage_${type}`);
        if (type === "search") {
          setTemplatePage(next);
        }
      })
      .catch((err) => {
        bridge
          .send("VKWebAppJoinGroup", { group_id: group_id })
          .then(({ result }) => {
            // incrementCountButton(`stats.buttonPage_${type}`);
            if (type === "search") {
              setTemplatePage(next);
            }
          })
          .catch((err) => {
            if (type === "search") {
              setTemplatePage(next);
            }
          });
      });
  }

  useEffect(() => {
    switch (name) {
      case "setting":
        // nativeAds();
        subscribeMessageFromGroupDefault(
          getGroupId[`${NAME_PROJECT}_msgSettingPage`]
            ? getGroupId[`${NAME_PROJECT}_msgSettingPage`]
            : GROUP_ID_MAILING_SETTING,
          name,
          next
        );
        break;
      case "like":
        // nativeAds();
        addGroup(
          getGroupId[`${NAME_PROJECT}_subLikePage`]
            ? getGroupId[`${NAME_PROJECT}_subLikePage`]
            : GROUP_ID_SUBSCRIPTION_LIKE,
          name
        );
        break;
      case "search":
        setTimeout(() => {
          setEditTitle("Узнаём пол.");
        }, 500);
        setTimeout(() => {
          setEditTitle("Узнаём пол..");
        }, 1000);
        setTimeout(() => {
          setEditTitle("Узнаём пол...");
        }, 1500);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды.");
        }, 2500);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды..");
        }, 3500);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды...");
        }, 4500);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы...");
        }, 5000);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы...");
        }, 5500);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы...");
        }, 6000);
        setTimeout(() => {
          setEditTitle("Почти готово...");
        }, 6500);
        setTimeout(() => {
          setEditTitle("Почти готово...");
        }, 7000);
        setTimeout(() => {
          setEditTitle("Почти готово...");
        }, 7500);

        const groupIdMan = getGroupId[`${NAME_PROJECT}_msgSearchPageMan`]
          ? getGroupId[`${NAME_PROJECT}_msgSearchPageMan`]
          : MAN_GROUP_ID_MAILING_SEARCH;

        const groupIdWoman = getGroupId[`${NAME_PROJECT}_msgSearchPageWoman`]
          ? getGroupId[`${NAME_PROJECT}_msgSearchPageWoman`]
          : WOMAN_GROUP_ID_MAILING_SEARCH;

        if (fetchedUser?.sex === 2) {
          setTimeout(() => {
            subscribeMessageFromGroupDefault(groupIdMan, name, next);
          }, 5000);
        } else {
          setTimeout(() => {
            subscribeMessageFromGroupDefault(groupIdWoman, name, next);
          }, 5000);
        }

        break;
      case "result":
        // nativeAds();

        if (fetchedUser?.sex === 2) {
          getRandomImg(7, 11);
        } else {
          getRandomImg(0, 7);
        }

        const subMan = getGroupId[`${NAME_PROJECT}_subResultPageMan`]
          ? getGroupId[`${NAME_PROJECT}_subResultPageMan`]
          : MAN_GROUP_ID_MAILING_SEARCH;

        const subWoman = getGroupId[`${NAME_PROJECT}_subResultPageWoman`]
          ? getGroupId[`${NAME_PROJECT}_subResultPageWoman`]
          : WOMAN_GROUP_ID_MAILING_SEARCH;

        if (fetchedUser?.sex === 2) {
          addGroup(subMan, name, next);
        } else {
          addGroup(subWoman, name, next);
        }
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="container">
      <div className="container__icon">{icon}</div>
      <div className="container__main">
        <div className="header">{header}</div>
        <div className="title">{editTitle}</div>
        <div className="description">{description}</div>
      </div>

      <div className="buttons">
        {buttonName && (
          <Button
            onClick={() => {
              if (name === "result") {
                // gotToken && publishStories();
                navigate("/result-panel");
              } else {
                setTemplatePage(next);
              }
            }}
            className="buttons"
            stretched
          >
            <span>{buttonName}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export { TemplatePage };
