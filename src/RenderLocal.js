import React from "react";

const RenderLocal = (props) => {
  const handleDelete = () => {
    props.deletePlaylist(props.item.id);
  };
  return (
    <div className="card my-2" style={{ backgroundColor: "#111" }}>
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
            className="btn btn-danger"
            onClick={handleDelete}
            style={{ borderRadius: "20px" }}
          >
            Remove from Playlists
          </a>
        </div>
      </div>
    </div>
  );
};

export default RenderLocal;
