import React, { useEffect } from "react";
import "./style.scss";
import MainLayout from "../../layouts/main";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradesStart } from "../../redux/Trades/trades.actions";
import defaultImg from "../../assets/image-not-found.png";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const mapState = ({ trades }) => ({
  trades: trades.trades,
});

const InvidualTrade = (props) => {
  const { trades } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trades.length === 0) dispatch(fetchTradesStart({}));
  }, [trades.length]);

  return (
    <MainLayout title="Invidual Trade Journal">
      {trades.map((trade) => (
        <section className="trade mt-3" key={trade.id}>
          <ReactTooltip />
          <div className={"trade_img " + (trade.imgUrl ? "" : "flex-center")}>
            {trade.imgUrl ? (
              <a target="_blank" href={trade.imgUrl} rel="noreferrer">
                <img
                  src={trade.imgUrl}
                  alt={trade.id}
                  className={trade.imgUrl ? "" : "img-default"}
                />
              </a>
            ) : (
              <img src={defaultImg} alt={trade.id} className={"img-default"} />
            )}
          </div>
          <div className="trade_body">
            <h4 className="trade_header text-grey">{trade.symbol}</h4>
            <p className="trade_notes">{trade.notes}</p>
            <div className="trade_tags mt-2">
              {trade.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="trade_text mt-2">Entry Price: ${trade.entryPrice}</p>
            <p className="trade_text">Exit Price: ${trade.entryPrice}</p>
            <p className="trade_text">
              Date: {trade.date.toLocaleDateString()}
            </p>
            <p className="trade_text ">
              Pln:
              <span className={trade.net > 0 ? "text-green" : "text-red"}>
                ${trade.net}
              </span>
            </p>
            <div className="controls mt-2">
              <Link
                to={{ pathname: `/import/${trade.id}` }}
                className="icon-small"
                data-tip="Edit Trade"
              >
                <EditIcon className="icon-small icon-btn" />
              </Link>
            </div>
          </div>
        </section>
      ))}
    </MainLayout>
  );
};

export default InvidualTrade;
