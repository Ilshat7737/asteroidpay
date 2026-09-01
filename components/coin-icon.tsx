// Icons sourced from spothq/cryptocurrency-icons (CC0-1.0, public domain):
// https://github.com/spothq/cryptocurrency-icons — stored locally at
// components/images/coins/*.svg.
import Image, { type StaticImageData } from "next/image";
import aave from "@/components/images/coins/aave.svg";
import ada from "@/components/images/coins/ada.svg";
import algo from "@/components/images/coins/algo.svg";
import atom from "@/components/images/coins/atom.svg";
import avax from "@/components/images/coins/avax.svg";
import bat from "@/components/images/coins/bat.svg";
import bch from "@/components/images/coins/bch.svg";
import bnb from "@/components/images/coins/bnb.svg";
import btc from "@/components/images/coins/btc.svg";
import comp from "@/components/images/coins/comp.svg";
import crv from "@/components/images/coins/crv.svg";
import dash from "@/components/images/coins/dash.svg";
import doge from "@/components/images/coins/doge.svg";
import dot from "@/components/images/coins/dot.svg";
import eos from "@/components/images/coins/eos.svg";
import etc from "@/components/images/coins/etc.svg";
import eth from "@/components/images/coins/eth.svg";
import fil from "@/components/images/coins/fil.svg";
import grt from "@/components/images/coins/grt.svg";
import icp from "@/components/images/coins/icp.svg";
import link from "@/components/images/coins/link.svg";
import ltc from "@/components/images/coins/ltc.svg";
import mana from "@/components/images/coins/mana.svg";
import matic from "@/components/images/coins/matic.svg";
import mkr from "@/components/images/coins/mkr.svg";
import neo from "@/components/images/coins/neo.svg";
import one from "@/components/images/coins/one.svg";
import qnt from "@/components/images/coins/qnt.svg";
import qtum from "@/components/images/coins/qtum.svg";
import ren from "@/components/images/coins/ren.svg";
import sand from "@/components/images/coins/sand.svg";
import snx from "@/components/images/coins/snx.svg";
import sol from "@/components/images/coins/sol.svg";
import storj from "@/components/images/coins/storj.svg";
import stx from "@/components/images/coins/stx.svg";
import sushi from "@/components/images/coins/sushi.svg";
import theta from "@/components/images/coins/theta.svg";
import trx from "@/components/images/coins/trx.svg";
import uni from "@/components/images/coins/uni.svg";
import usdc from "@/components/images/coins/usdc.svg";
import usdt from "@/components/images/coins/usdt.svg";
import vet from "@/components/images/coins/vet.svg";
import waves from "@/components/images/coins/waves.svg";
import xlm from "@/components/images/coins/xlm.svg";
import xmr from "@/components/images/coins/xmr.svg";
import xrp from "@/components/images/coins/xrp.svg";
import xtz from "@/components/images/coins/xtz.svg";
import yfi from "@/components/images/coins/yfi.svg";
import zec from "@/components/images/coins/zec.svg";
import zrx from "@/components/images/coins/zrx.svg";

const COIN_ICONS: Record<string, StaticImageData> = {
  AAVE: aave,
  ADA: ada,
  ALGO: algo,
  ATOM: atom,
  AVAX: avax,
  BAT: bat,
  BCH: bch,
  BNB: bnb,
  BTC: btc,
  COMP: comp,
  CRV: crv,
  DASH: dash,
  DOGE: doge,
  DOT: dot,
  EOS: eos,
  ETC: etc,
  ETH: eth,
  FIL: fil,
  GRT: grt,
  ICP: icp,
  LINK: link,
  LTC: ltc,
  MANA: mana,
  MATIC: matic,
  MKR: mkr,
  NEO: neo,
  ONE: one,
  QNT: qnt,
  QTUM: qtum,
  REN: ren,
  SAND: sand,
  SNX: snx,
  SOL: sol,
  STORJ: storj,
  STX: stx,
  SUSHI: sushi,
  THETA: theta,
  TRX: trx,
  UNI: uni,
  USDC: usdc,
  USDT: usdt,
  VET: vet,
  WAVES: waves,
  XLM: xlm,
  XMR: xmr,
  XRP: xrp,
  XTZ: xtz,
  YFI: yfi,
  ZEC: zec,
  ZRX: zrx,
};

export function CoinIcon({ ticker, className }: { ticker: string; className?: string }) {
  const src = COIN_ICONS[ticker.toUpperCase()];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      // Used inside an infinitely-scrolling marquee whose track is far wider
      // than the viewport — next/image's default lazy IntersectionObserver
      // never reliably fires for items sitting outside the viewport bounds,
      // so most icons would never load.
      loading="eager"
      className={`inline-block shrink-0 rounded-full ${className ?? ""}`}
    />
  );
}
