import React from "react";

import TSDiscover from "@/pages/discover";
import TSFriend from "@/pages/friend";
import TSMine from "@/pages/mine";
import TSRecommend from "@/pages/discover/c-pages/recommend";
import TSAlbum from "@/pages/discover/c-pages/album";
import TSRanking from "@/pages/discover/c-pages/ranking";
import TSDjRadio from "@/pages/discover/c-pages/djradio";
import TSArtist from "@/pages/discover/c-pages/artist";
import TSSongs from "@/pages/discover/c-pages/songs";
import TSPlayer from "@/pages/player";
import { Redirect } from "react-router-dom";

const routes = [
	{
		path: "/",
		exact: true,
		render: () => <Redirect to="/discover" />
	},
	{
		path: "/discover",
		component: TSDiscover,
		routes: [
			{
				path: "/discover",
				exact: true,
				render: () => <Redirect to="/discover/recommend" />
			},
			{
				path: "/discover/recommend",
				component: TSRecommend
			},
			{
				path: "/discover/album",
				component: TSAlbum
			},
			{
				path: "/discover/ranking",
				component: TSRanking
			},
			{
				path: "/discover/djradio",
				component: TSDjRadio
			},
			{
				path: "/discover/artist",
				component: TSArtist
			},
			{
				path: "/discover/songs",
				component: TSSongs
			},
			{
				path: "/discover/player",
				component: TSPlayer
			}
		]
	},
	{
		path: "/friend",
		component: TSFriend
	},
	{
		path: "/mine",
		component: TSMine
	}
];

export default routes;
