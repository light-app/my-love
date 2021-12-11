import React, { useState, useEffect } from "react";
import { Router, Redirect, navigate } from "@reach/router";
import bridge from "@vkontakte/vk-bridge";
import { Snackbar, Avatar } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "antd/dist/antd.css";
import { Icon16Done } from "@vkontakte/icons";
import { Icon16Cancel } from "@vkontakte/icons";

import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import img5 from "./img/5.png";
import img6 from "./img/6.png";
import img7 from "./img/7.png";
import img8 from "./img/8.png";

import "./styles/reset.sass";
import "./styles/panels.sass";
import "./styles/img.sass";

//constants
import { APP_ID_DEFAULT } from "./constants";

import { getUserToken } from "./bridge-method";

import { Home, ResultPanel, AdminPanel, BannedPage } from "./panels";
import axios from "axios";
import { getRandomInt } from "@vkontakte/vkjs";
import { bannedList } from "./helpers/bannedList";

window.globalURLSharing = {
  url: 0,
};

const App = () => {
  const [activePanel, setActivePanel] = useState("result-panel");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState();
  const [IMGresult, setIMGresult] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [getPlatform, setGetPlatform] = useState("");
  const [gotToken, setGotToken] = useState(false);
  const [getGroupId, setGetGroupId] = useState({});
  const [getButtonStats, setGetButtonStats] = useState({});
  const [appID, setAppID] = useState(APP_ID_DEFAULT);
  const [templatePage, setTemplatePage] = useState("/");
  const [imgIndex, setImgIndex] = useState(null);

  const getStats = () => {
    axios
      .get("https://ods-studio.ru/app-statistics/get")
      .then(function (response) {
        console.log("getStats:", response.data);
        setGetGroupId(response.data.links);
        setGetButtonStats(response.data.stats);
        // setAppID(response.data.links.appID);
      })
      .catch(function (error) {
        console.log("getStats", error);
      });
  };

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (fetchedUser) {
  //     getUserToken(setUserToken, setGotToken, appID);
  //   }
  // }, [fetchedUser]);

  // получение группы с сервера
  useEffect(() => {
    getStats();
  }, [fetchedUser]);

  useEffect(() => {
    // Определение ОС
    bridge.send("VKWebAppGetClientVersion").then((result) => {
      setGetPlatform(result.platform);
    });
  }, []);

  function openAlert(text, backgroundColor = "green") {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        duration="1000"
        layout="horizontal"
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24} style={{ backgroundColor }}>
            {backgroundColor === "green" ? (
              <Icon16Done fill="#fff" width={14} height={14} />
            ) : (
              <Icon16Cancel fill="#fff" width={14} height={14} />
            )}
          </Avatar>
        }
      >
        {text}
      </Snackbar>
    );
  }

  function publishStories() {
    let albumID;

    bridge
      .send("VKWebAppCallAPIMethod", {
        method: "photos.createAlbum",
        params: {
          title: "Твоё лето",
          description: `Твоё лето https://vk.com/app${appID}`,
          v: 5.131,
          access_token: userToken,
        },
      })
      .then((r) => {
        console.log("photos.createAlbum r.response.id:", r.response.id);
        albumID = r.response.id;

        bridge
          .send("VKWebAppCallAPIMethod", {
            method: "photos.getUploadServer",
            params: {
              album_id: albumID,
              v: 5.131,
              access_token: userToken,
            },
          })
          .then(async (res) => {
            console.log("photos.getUploadServer res:", res);

            const img = [img1, img2, img3, img4, img5, img6, img7, img8][
              getRandomInt(0, 7)
            ];

            const blob = await fetch(img).then((x) => x.blob());
            const formData = new FormData();
            formData.append("file", blob, "image.png");
            formData.append("uploadUrl", res.response.upload_url);

            const proxy = "https://proxy.ods-studio.ru/cors";
            // const proxy = "https://proxy.ods-studio.ru";
            // https://top1bot.ru/vk-uploader/upload-photo

            // const { data: result } = await axios({
            //   method: "POST",
            //   url: "https://top1bot.ru/vk-uploader/upload-photo",
            //   data: formData,
            //   headers: { "Content-Type": "multipart/form-data" },
            // });

            // const result = await fetch(
            //   "https://top1bot.ru/vk-uploader/upload-photo",
            //   {
            //     method: "POST",
            //     mode: "no-cors",
            //     body: formData,
            //     // headers: { "Content-Type": "multipart/form-data" },
            //   }
            // );

            // const result = await fetch(
            //   "https://176.119.159.157:1467/upload-photo",
            //   {
            //     method: "POST",
            //     token: userToken,
            //     photoNumber: 1,
            //   }
            // );

            console.log("userToken", userToken);

            const result = await axios({
              method: "POST",
              url: "https://ods-studio.ru/my-summer/upload-photo",
              token: userToken,
              photoNumber: 1,
            });

            console.log("await axios", {
              result: result,
              userToken: userToken,
            });

            bridge
              .send("VKWebAppCallAPIMethod", {
                method: "photos.save",
                params: {
                  album_id: albumID,
                  v: 5.131,
                  access_token: userToken,
                  hash: result.hash,
                  photos_list: result.photos_list,
                  server: result.server,
                  caption: `Твоё лето https://vk.com/app${appID}`,
                },
              })
              .then((response) => {
                console.log("photos.save response:", response);
              })
              .catch((error) => {
                console.log("photos.save error:", error);
              });
          })
          .catch((err) => {
            console.log("photos.getUploadServer err:", err);
          });
      })

      .catch((er) => {
        console.log("photos.createAlbum err:", er);
      });
  }

  function getRandomImg(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается

    globalURLSharing.url = result;
    setIMGresult(<div className={`icon${result}`}></div>);
    setImgIndex(result);
  }

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  return (
    <Router>
      {fetchedUser && (
        <Home
          // path="/my-love"
          path="/"
          fetchedUser={fetchedUser}
          go={go}
          setIMGresult={setIMGresult}
          getRandomImg={getRandomImg}
          getPlatform={getPlatform}
          gotToken={gotToken}
          openAlert={openAlert}
          snackbar={snackbar}
          templatePage={templatePage}
          setTemplatePage={setTemplatePage}
          appID={appID}
          getButtonStats={getButtonStats}
          getStats={getStats}
          getGroupId={getGroupId}
          imgIndex={imgIndex}
          publishStories={publishStories}
        />
      )}

      <AdminPanel
        path="/admin-panel"
        fetchedUser={fetchedUser}
        go={go}
        openAlert={openAlert}
        snackbar={snackbar}
        getButtonStats={getButtonStats}
        getStats={getStats}
        getPlatform={getPlatform}
        getGroupId={getGroupId}
      />
      <ResultPanel
        path="/result-panel"
        IMGresult={IMGresult}
        getPlatform={getPlatform}
        imgIndex={imgIndex}
      />
    </Router>
  );
};

export default App;
