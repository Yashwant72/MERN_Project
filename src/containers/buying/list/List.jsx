import React from "react";
import ListItem from "../../../components/ListItem";
import buildingData from "../../../assets/dummyData/buildingData";
const List = () => {
  return (
    <div className="list-container">
      {/* List */}
      <div className="list">
        <table>
          <tr>
            <th>adfa sdf </th>
          </tr>
          <tr>
            {buildingData.map((item, index) => (
              <ListItem
                key={index}
                img={item.img}
                price={item.price}
                address={item.address}
                bed={item.bed}
                tub={item.tub}
                area={item.area}
              />
            ))}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default List;
