import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";

export default function HeadContent({text,inCoolMathGames}) {
  return (
          <Head>
      <title>
        { inCoolMathGames ? "WorldGuessr - Play it now at CoolmathGames.com" :
        text("tabTitle") }
        </title>
    <meta property="og:title" content={text("fullTitle")}/>

    <meta name="description"
    content={text("shortDescMeta")}
    />
    <meta property="og:description"
    content={text("fullDescMeta")}
    />

<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=no"/>
    <link rel="icon" type="image/x-icon" href="/icon.ico" />

{/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/> */}
<link href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap" rel="stylesheet"/>



{/* <script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script> */}


{/* data-adbreak-test="on" */}
{/*  */}
</Head>
  )
}
