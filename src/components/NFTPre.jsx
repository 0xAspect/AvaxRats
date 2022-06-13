import React, {useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { nftFactoryAddress, nfTradeAddress, preuriimg } from "../assets/addresses.js";

export default function NFTPre(props) {

  const [showMeta, setShowMeta] = useState(false);

  const handleMeta = async () => {
    setShowMeta(!showMeta);
  };
  const ratImg = preuriimg;
  const nftradeUrl = nfTradeAddress + nftFactoryAddress + "/" + props.id;
  console.log(props.id);
  const bold = {
    fontWeight: "bold",
  };

    console.log(ratImg);
  return (
    <div className="col-xs-6 col-md-4" >
      {ratImg && (
        <Card style={{ textAlign: "left" }} hover varient="dark">
          <Card.Img src={ratImg} />
          <Card.Body>
            <Card.Title  style={{ color: "black" }}>
              <h4>
                {" "}
                {"AVAX NIBBLER #" + props.id}{" "}
                <span style={{ textAlign: "right" }} onClick={handleMeta}>
                  <i class={showMeta === false ? "arrow up" : "arrow down"}></i>
                </span>
                <span style={{ textAlign: "right" }} >
              
                </span>
              </h4>{" "}
              <h5>
                Level 1 {" "}
              </h5>{" "}
              <h5>
                Trinkets gathered: SOON (/day){" "}
              </h5>
            </Card.Title>
            <>
            {showMeta && (
              <>
                <Table hover varient="dark" size="sm">
                  <tbody>
                    <tr>
                      <td>Rarity</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Background</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Fur</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Eyes</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Whiskers</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Ear</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Nose</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Tail</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>
                    <tr>
                      <td>Clothes</td>
                      <td colSpan={2} style={bold}>
                        ?
                      </td>
                    </tr>


                  </tbody>
                </Table>
                <Table>
                <tbody>
                    <tr>
                      <td>Ferocity</td>
                      <td>Cunning</td>
                      <td>Agility</td>
                    </tr>
                    <tr>
                      <td>?</td>
                      <td>?</td>
                      <td>?</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        {" "}
                        <a href={nftradeUrl}> view on NFTtrade</a>
                      </td>
                    </tr>
                    </tbody>
                </Table>
              </>
              )}
            </>

          </Card.Body>
        </Card>
      )}
    </div>
  );
}
