import { Map } from "immutable";
import * as actionTypes from "./constants";
const defaultState = Map({
	currentSong: {},
	currentSongIndex: 0,
	playList: [
		{
			name: "Summer Boy",
			id: 1476422099,
			pst: 0,
			t: 0,
			ar: [
				{
					id: 12139151,
					name: "中国BOY",
					tns: [],
					alias: []
				},
				{
					id: 34202049,
					name: "花少北",
					tns: [],
					alias: []
				},
				{
					id: 36677939,
					name: "LexBurner",
					tns: [],
					alias: []
				},
				{
					id: 12623251,
					name: "老番茄",
					tns: [],
					alias: []
				},
				{
					id: 32913327,
					name: "某幻君",
					tns: [],
					alias: []
				}
			],
			alia: [],
			pop: 100,
			st: 0,
			rt: "",
			fee: 8,
			v: 3,
			crbt: null,
			cf: "",
			al: {
				id: 94946700,
				name: "Summer Boy",
				picUrl:
					"http://p1.music.126.net/rut8JwaDf8FxLpB7AhcqRg==/109951165293238241.jpg",
				tns: [],
				pic_str: "109951165293238241",
				pic: 109951165293238241
			},
			dt: 296128,
			h: {
				br: 320001,
				fid: 0,
				size: 11847405,
				vd: -47551
			},
			m: {
				br: 192001,
				fid: 0,
				size: 7108461,
				vd: -44976
			},
			l: {
				br: 128001,
				fid: 0,
				size: 4738989,
				vd: -43460
			},
			a: null,
			cd: "01",
			no: 1,
			rtUrl: null,
			ftype: 0,
			rtUrls: [],
			djId: 0,
			copyright: 0,
			s_id: 0,
			mark: 8192,
			originCoverType: 0,
			single: 0,
			noCopyrightRcmd: null,
			mv: 0,
			mst: 9,
			cp: 1418081,
			rtype: 0,
			rurl: null,
			publishTime: 0
		},
		{
			name: "他只是经过",
			id: 1443838552,
			pst: 0,
			t: 0,
			ar: [
				{
					id: 12631485,
					name: "h3R3",
					tns: [],
					alias: []
				},
				{
					id: 33900743,
					name: "Felix Bennett",
					tns: [],
					alias: []
				}
			],
			alia: [],
			pop: 100,
			st: 0,
			rt: "",
			fee: 8,
			v: 18,
			crbt: null,
			cf: "",
			al: {
				id: 89924258,
				name: "他只是经过",
				picUrl:
					"http://p1.music.126.net/mX6DKxPxdt2nInfNCIz9Fw==/109951165015483353.jpg",
				tns: [],
				pic_str: "109951165015483353",
				pic: 109951165015483353
			},
			dt: 215381,
			h: {
				br: 320000,
				fid: 0,
				size: 8617965,
				vd: -40055
			},
			m: {
				br: 192000,
				fid: 0,
				size: 5170797,
				vd: -37420
			},
			l: {
				br: 128000,
				fid: 0,
				size: 3447213,
				vd: -35762
			},
			a: null,
			cd: "01",
			no: 1,
			rtUrl: null,
			ftype: 0,
			rtUrls: [],
			djId: 0,
			copyright: 0,
			s_id: 0,
			mark: 0,
			originCoverType: 0,
			single: 0,
			noCopyrightRcmd: null,
			mv: 0,
			rtype: 0,
			rurl: null,
			mst: 9,
			cp: 0,
			publishTime: 0
		}
	],
	sequence: 0, // 0 循环 1 随机 2 单曲循环
	lyricList: [],
	currentLyricIndex: 0
});

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case actionTypes.CHANGE_CURRENT_SONG:
			return state.set("currentSong", action.currentSong);
		case actionTypes.CHANGE_PLAY_LIST:
			return state.set("playList", action.playList);
		case actionTypes.CHANGE_CURRENT_SONG_INDEX:
			return state.set("currentSongIndex", action.index);
		case actionTypes.CHANGE_SEQUENCE:
			return state.set("sequence", action.sequence);
		case actionTypes.CHANGE_LYRIC_LIST:
			return state.set("lyricList", action.lyricList);
		case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
			return state.set("currentLyricIndex", action.index);
		default:
			return state;
	}
}
