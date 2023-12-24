import React from "react";

const TableData = () => {
  return (
    <div>
      <h4>Title</h4>
      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Content</th>
            <th>Languages</th>
            <th>Image</th>
            <th>Video</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((movie, idx) => {
            return (
              <tr key={movie.id}>
                <td>{idx + 1}</td>
                <td>{movie.name || "-"}</td>
                <td>{movie.content || "-"}</td>
                <td>{movie.languages || "-"}</td>
                <td>{movie.image_id || "-"}</td>
                <td>{movie.video_id || "-"}</td>
                <td>
                  <span>Edit</span>
                  <span style={{ marginLeft: "10px" }}>Delete</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
