import React from "react";

const RenderPlaylist = (props) => {
  const handleAdd = () => {
    props.addPlaylist(props.item);
  };
  const dragStart = (e, item) => {
    props.dragStart(e, item);
  };
  return (
    <div
      className="card my-2"
      style={{ backgroundColor: "#111" }}
      draggable="true"
      onDragStart={(e) => dragStart(e, props.item)}
    >
      <div className="row">
        <img
          src={props.item.images[0].url}
          className="card-img col-sm-4"
          alt="image cover"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="card-body col-sm-8">
          <h5 className="card-title my-3">{props.item.name}</h5>
          <a
            className="btn"
            onClick={handleAdd}
            style={{
              borderRadius: "20px",
              backgroundColor: "#4c9c3d",
              color: "#fff",
            }}
          >
            Add to Playlists
          </a>
        </div>
      </div>
    </div>
  );
};

export default RenderPlaylist;
