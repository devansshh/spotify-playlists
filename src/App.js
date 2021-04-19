import React, { useState, useEffect } from "react";
import { Credentials } from "./Credentials";
import axios from "axios";
import RenderPlaylist from "./RenderPlaylist";
import RenderLocal from "./RenderLocal";
import Header from "./Header";

const App = () => {
  const spotify = Credentials();

  const [token, setToken] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [userPlaylist, setUserPlaylist] = useState([]);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      axios("https://api.spotify.com/v1/browse/featured-playlists", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((featuredResponse) => {
        setPlaylist(featuredResponse.data.playlists.items);
      });
    });
    const local = JSON.parse(localStorage.getItem("localPlaylist"));
    if (local) {
      setUserPlaylist(local);
    }
    localStorage.removeItem("localPlaylist");
  }, []);

  const addPlaylist = (item) => {
    let flag = 1;
    userPlaylist.map((pl) => {
      if (pl.id == item.id) {
        alert("Playlist already exists");
        flag = 0;
      }
    });
    if (flag == 1) {
      const list = [...userPlaylist, item];
      setUserPlaylist(list);
      localStorage.setItem("localPlaylist", JSON.stringify(list));
    }
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragStart = (e, item) => {
    console.log("DragStart item : ", item);
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const drop = (e) => {
    let item = JSON.parse(e.dataTransfer.getData("item"));
    console.log("Dropped item : ", item);
    addPlaylist(item);
  };
  const deletePlaylist = (id) => {
    const temp = userPlaylist.filter((pl) => {
      if (pl.id != id) {
        return pl;
      }
    });
    setUserPlaylist(temp);
    localStorage.setItem("localPlaylist", JSON.stringify(temp));
  };

  return (
    <div style={{ color: "#fff" }}>
      <Header />
      <div className="container row" style={{ margin: "auto" }}>
        <div className="col-sm-6">
          <h2 className="my-4" style={{ color: "#333" }}>
            Featured Playlists
          </h2>
          {playlist.map((item) => (
            <RenderPlaylist
              item={item}
              addPlaylist={addPlaylist}
              dragStart={dragStart}
            />
          ))}
        </div>
        <div
          className="col-sm-6"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => drop(e)}
        >
          <h2 className="my-4" style={{ color: "#333" }}>
            Local Playlists
          </h2>
          {userPlaylist.map((item) => (
            <RenderLocal item={item} deletePlaylist={deletePlaylist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
