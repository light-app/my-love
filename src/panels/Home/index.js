import React, { useState } from "react";
import { navigate } from "@reach/router";
import { Panel, PanelHeader, Button } from "@vkontakte/vkui";

import { TemplatePage } from "../../components/TemplatePage/index";
import "./Home.scss";
import { dataTemplatePages } from "../../helpers";
import { AdminPanel } from "../index";
import { BannedPage } from "../bannedPage/index";
import { bannedList } from "../../helpers/bannedList";
import { LoveIcon } from "../../icons";

const arrRain = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Home = ({
  id,
  go,
  snackbar,
  fetchedUser,
  setTemplatePage,
  templatePage,
  appID,
  openAlert,
  getButtonStats,
  getStats,
  getGroupId,
  getRandomImg,
  imgIndex,
  publishStories,
  gotToken,
}) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается

    return result;
  }

  const rainItems = (number) =>
    arrRain.map((item) => {
      return (
        <span
          style={{
            position: "absolute",
            left: `${item * 50}px`,
            top: `${getRandomInt(20)}px`,
            animation: `${getRandom(6, 10)}s rain linear infinite`,
            opacity: "0.6",
          }}
        >
          <LoveIcon key={item} className="rain-anim" />
        </span>
      );
    });

  return (
    <>
      <div className="rain-container">{rainItems(1000)}</div>

      {fetchedUser.id && bannedList.includes(fetchedUser.id) ? (
        <BannedPage />
      ) : (
        <div>
          <>
            {fetchedUser && (
              <>
                {[554966402, 616935572, 73606509].includes(fetchedUser.id) ? (
                  <Button
                    onClick={() => navigate("/admin-panel")}
                    className="admin-btn"
                  >
                    Админ панель
                  </Button>
                ) : (
                  ""
                )}
              </>
            )}
          </>

          {dataTemplatePages.map((item, index) => {
            if (item.name === templatePage) {
              return (
                <TemplatePage
                  key={index}
                  icon={item.icon}
                  header={item.header}
                  title={item.title}
                  description={item.description}
                  buttonName={item.buttonName}
                  next={item.next}
                  setTemplatePage={setTemplatePage}
                  fn={item.fn && item.fn}
                  name={item.name}
                  appID={appID}
                  getGroupId={getGroupId}
                  openAlert={openAlert}
                  fetchedUser={fetchedUser}
                  getRandomImg={getRandomImg}
                  imgIndex={imgIndex}
                  gotToken={gotToken}
                  publishStories={publishStories}
                />
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export { Home };
