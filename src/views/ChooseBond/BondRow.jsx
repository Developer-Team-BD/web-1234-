import BondLogo from "../../components/BondLogo";
import { DisplayBondPrice, DisplayBondDiscount } from "../Bond/Bond";
import { Box, Button, Link, Paper, Typography, TableRow, TableCell, SvgIcon, Slide } from "@material-ui/core";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { NavLink } from "react-router-dom";
import "./choosebond.scss";
import { trim } from "../../helpers";
import { t, Trans } from "@lingui/macro";
import { Skeleton } from "@material-ui/lab";
import useBonds from "../../hooks/Bonds";
import { useSelector } from "react-redux";

export function BondDataCard({ bond }) {
  const networkId = useSelector(state => state.network.networkId);
  const { loading } = useBonds(networkId);
  const isBondLoading = !bond.bondPrice ?? true;
  
  return (
    <Slide direction="up" in={true}>
      <Paper id={`${bond.name}--bond`} className="bond-data-card ohm-card">
        <div className="bond-pair">
          <BondLogo bond={bond} />
          <div className="bond-name">
            <Typography>{bond.displayName}</Typography>
            {bond.isLP && (
              <div>
                <Link href={bond.lpUrl} target="_blank">
                  <Typography variant="body1">
                    <Trans>View Contract</Trans>
                    <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
                  </Typography>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="data-row">
          <Typography>
          <Trans>Daily Emission</Trans>
          </Typography>
          <Typography>
          {isBondLoading ? <Skeleton width="50px" /> : trim(bond.dailyEmission,0)}
          </Typography>
        </div>
        <div className="data-row">
          <Typography>
            <Trans>Price</Trans>
          </Typography>
          <Typography className="bond-price">
            <>{isBondLoading ? <Skeleton width="50px" /> : <DisplayBondPrice key={bond.name} bond={bond} />}</>
          </Typography>
        </div>


        <div className="data-row">
          <Typography>
            <Trans>Purchased</Trans>
          </Typography>
          <Typography>
            {isBondLoading ? (
              <Skeleton width="80px" />
            ) : (
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(bond.purchased)
            )}
          </Typography>
        </div>
        <Link component={NavLink} to={`/mints/${bond.name}`}>
          <Button variant="outlined" color="primary" fullWidth disabled={!bond.isBondable[networkId]}>
            <Typography variant="h5">
              {/* NOTE (appleseed): temporary for ONHOLD MIGRATION */}
              {/* {!bond.isBondable[networkId] ? t`Sold Out` : t`Bond ${bond.displayName}`} */}
              {bond.isLOLable[networkId] ? bond.LOLmessage : t`Bond ${bond.displayName}`}
            </Typography>
          </Button>
        </Link>
      </Paper>
    </Slide>
  );
}

export function BondTableData({ bond, setPopup, popup }) {
  const networkId = useSelector(state => state.network.networkId);
  // Use BondPrice as indicator of loading.
  const isBondLoading = !bond.bondPrice ?? true;
  // const isBondLoading = useSelector(state => !state.bonding[bond]?.bondPrice ?? true);

  return (
    <TableRow id={`${bond.name}--bond`}>
      <TableCell align='center'>
      <BondLogo bond={bond} />
      </TableCell>
      <TableCell align="center" className="bond-name-cell">
        <div className="bond-name">
          <Typography variant="body1">{bond.displayName}</Typography>
          {/* {bond.isLP && (
            <Link color="primary" href={bond.lpUrl} target="_blank">
              <Typography variant="body1">
                <Trans>Add Liquidity</Trans>
                <SvgIcon component={ArrowUp} htmlColor="#A3A3A3" />
              </Typography>
            </Link>
          )} */}
        </div>
      </TableCell>
      <TableCell align="center">
        {" "}
        {isBondLoading ? <Skeleton width="50px" /> :  trim(bond.dailyEmission,0)}
      </TableCell>
      <TableCell align="center">
        <Typography>
          <>{isBondLoading ? <Skeleton width="50px" /> : <DisplayBondPrice key={bond.name} bond={bond} />}</>
        </Typography>
      </TableCell>

      <TableCell align="center">
        {isBondLoading ? (
          <Skeleton />
        ) : (
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }).format(bond.purchased)
        )}
      </TableCell>
      <TableCell>
        {/* <Link className="bond-name-link" component={NavLink} to={`/mints/${bond.name}`}>
          
        </Link> */}
        <Button
            className="bond-name-button"
            variant="outlined"
            color="primary"
            disabled={!bond.isBondable[networkId]}
            style={{ width: "100%" }}
            onClick={()=>setPopup(!popup)}
          >
            {/* NOTE (appleseed): temporary for ONHOLD MIGRATION */}
            {/* <Typography variant="h6">{!bond.isBondable[networkId] ? t`Sold Out` : t`do_bond`}</Typography> */}
            <Typography className="bond-name-button-text" variant="h6">
              {/* {bond.isLOLable[networkId] ? bond.LOLmessage : t`do_bond`} */}
              Mint
            </Typography>
          </Button>
      </TableCell>
    </TableRow>
  );
}
