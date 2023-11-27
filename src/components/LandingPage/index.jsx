"use client";

import React, { useEffect } from "react";
import Header from "@components/LandingPage/Header/Header";
import Banner from "@components/LandingPage/Banner/Banner";
import Introduction from "@components/LandingPage/Introduction/Introduction";
import Service from "@components/LandingPage/Service/Service";
import FAQ from "@components/LandingPage/FAQ/FAQ";
import RBTL from "@components/LandingPage/read-btw-lines/RBTL";
import UnleashVision from "@components/LandingPage/unleash-vision/UnleashVision";
import dynamic from 'next/dynamic'

export default function LandingPage() {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, []);

    const DynamicTickers = dynamic(() => import('@components/LandingPage/Tickers/Tickers'));
    const DynamicIntroHeader = dynamic(() => import("@components/LandingPage/Intro/IntroHeader"))
    return (
    <>
      <Header />
      <div className="bg-slate-900">
        <Banner className="h-full" />
        <Introduction />
        <Service />
        <DynamicTickers/>
        <DynamicIntroHeader />
        <FAQ />
        <RBTL />
        <UnleashVision />
      </div>
    </>
    );
}

