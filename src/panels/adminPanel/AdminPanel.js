import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { AdminPanelMain } from "/";
import { NAME_PROJECT, NAME_PROJECT_LOWER_CASE } from "../../constants";

const AdminPanel = ({
  openAlert,
  snackbar,
  getButtonStats,
  getPlatform,
  getGroupId,
}) => {
  const [settingGroupMailingId, setSettingGroupMailingId] = useState("");
  const [likeAddedGroupId, setLikeAddedGroupId] = useState("");
  const [searchManGroupMailingId, setSearchManGroupMailingId] = useState("");
  const [searchWomanGroupMailingId, setSearchWomanGroupMailingId] =
    useState("");
  const [resultWomanGroupSubId, setResultWomanGroupSubId] = useState("");
  const [resultManGroupSubId, setResultManGroupSubId] = useState("");
  const [appID, setAppID] = useState("");

  console.log("getGroupId", getGroupId);

  const typeLink = {
    setting: settingGroupMailingId,
    like: likeAddedGroupId,
    "search-man": searchManGroupMailingId,
    "search-woman": searchWomanGroupMailingId,
    "result-woman-sub": resultWomanGroupSubId,
    "result-man-sub": resultManGroupSubId,
    "app-id": appID,
  };

  const typeLinkKey = {
    setting: `links.${NAME_PROJECT}_msgSettingPage`,
    like: `links.${NAME_PROJECT}_subLikePage`,
    "search-man": `links.${NAME_PROJECT}_msgSearchPageMan`,
    "search-woman": `links.${NAME_PROJECT}_msgSearchPageWoman`,
    "result-man-sub": `links.${NAME_PROJECT}_subResultPageMan`,
    "result-woman-sub": `links.${NAME_PROJECT}_subResultPageWoman`,
    "app-id": `links${NAME_PROJECT}_.appID`,
  };

  function editLinkGroup(type) {
    axios
      .post("https://ods-studio.ru/app-statistics/edit", {
        key: typeLinkKey[type],
        value: typeLink[type],
      })
      .then(function (response) {
        if (response.data === "ok") {
          openAlert(
            type === "app-id"
              ? "Вы успешно изменили ссылку на приложение"
              : "Вы успешно изменили ссылку на группу"
          );
        } else {
          openAlert("Вы указали невалидную ссылку", "red");
        }
      })
      .catch(function (error) {});
  }

  function onChangeAction(e, type) {
    const value = e.target.value.trim();

    switch (type) {
      case "setting":
        setSettingGroupMailingId(value);
        break;
      case "like":
        setLikeAddedGroupId(value);
        break;
      case "search-man":
        setSearchManGroupMailingId(value);
        break;
      case "search-woman":
        setSearchWomanGroupMailingId(value);
        break;
      case "result-woman-sub":
        setResultWomanGroupSubId(value);
        break;
      case "result-man-sub":
        setResultManGroupSubId(value);
        break;
      case "app-id":
        setAppID(value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <AdminPanelMain
        onChangeAction={onChangeAction}
        editLinkGroup={editLinkGroup}
        getButtonStats={getButtonStats}
        getPlatform={getPlatform}
        getGroupId={getGroupId}
      />
      {snackbar}
    </div>
  );
};

export { AdminPanel };
